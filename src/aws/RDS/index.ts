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
          connection.destroy();
        }
        this.pool =  mysql.createPool(DB_CONFIG);
      } catch (error) {
        console.error('aws rds connection error', error)
      }

    })()

  }

  async rdsConnection() {
    try {
      const connection = mysql.createConnection(DB_CONFIG);

      await connection.connect();
      return connection;
    } catch (error) {
      console.error(error)
      return null;
    }

  }
}

export default new UserRDS();