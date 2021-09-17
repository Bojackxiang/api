import mysql from 'mysql'
import aws_config from '../../config/aws.config'

const DB_CONFIG = {
  host: aws_config.host,
  user: aws_config.user,
  password: aws_config.password,
  port: aws_config.port,
}

class UserRDS {

  // private pool: mysql.Pool | null = null;
  private pool: any = null;

  get getPool() {
    return this.pool;
  }

  constructor() {
    (async () => {
      try {
        const connection: mysql.Connection | null = await this.rdsConnection()
        if (connection) {
          console.log('connection 正常建立，现在开始销毁')
          connection.destroy();
        }
        this.pool =  mysql.createPool(DB_CONFIG);
      } catch (error) {
        console.log('aws rds 连接失败', error)
      }

    })()

  }

  async rdsConnection() {
    try {
      const connection = mysql.createConnection(DB_CONFIG);

      await connection.connect();
      return connection;
    } catch (error) {
      console.log('出错了')
      console.log(error)
      return null;
    }

  }
}

export default new UserRDS();