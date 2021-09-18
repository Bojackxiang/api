import mysql from 'mysql'
import UserRDS from '../aws/RDS'
import Result from '../models/Result';

const runQuery = (query: string, resultHandler: any) => {
  return new Promise((resolve, reject) => {
    if (!query) {
      reject(new Error('Query is empty'));
    };

    const pool = UserRDS.getPool;
    if (!pool) {
      reject("Not found pool, please check code")
    }

    pool.getConnection((err: any, connection: mysql.PoolConnection) => {
      if (err) {
        reject('Get Connection Error');
      } else {
        connection.query(query, async (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(await resultHandler(result))
          }
        })
      }
      connection.release();
    })
  })
}

export default runQuery