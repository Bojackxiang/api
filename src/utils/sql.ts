import mysql from 'mysql'
import UserRDS from '../aws/RDS'
import Result from '../models/IResult';

const runQuery = (query: string, resultHandler: any) => {
  return new Promise((resolve, reject) => {
    if (!query) {
      reject(new Error('Query is empty'));
    };
    
    const pool = UserRDS.getPool;
    if (!pool) {
      reject("没有找到数据库的 pool, 请检查代码")
    }

    pool.getConnection((err: any, connection: mysql.PoolConnection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(query, async (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log('result', result)
            resolve(await resultHandler(result))
          }
        })
      }
      connection.release();
    })
  })
}

export default runQuery