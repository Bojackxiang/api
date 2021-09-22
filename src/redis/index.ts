import REDIS_CONFIG from '../config/redis.config'
import redis from 'redis';

class RedisClient {
  constructor() {
    (async () => {
      try {
        await this.initConnection()  
        return;
      } catch (error) {
        console.log(error);
        return;
      }
      
    })()
  }

  async initConnection() {
    const { local, production, staging } = REDIS_CONFIG;
    console.log(staging.host, staging.port);
    const client = redis.createClient(staging.port, 'redis-sandbox-2.rdftdy.0001.apse2.cache.amazonaws.com');

    const result = await this.createRedisClient(client);
    if (result) {
      client.set("key", "value", redis.print);
      client.get("key", redis.print);
    }
  }

  createRedisClient(client: redis.RedisClient) {
    return new Promise((resolve, reject) => {
      client.on("error", function (error) {
        if (error) {
          console.log('redis 出错了')
          console.log(error)
          reject(false)
        } else {
          console.log('redis 正常运行了')
          resolve(true)
        }

      });
    })
  }


}



export default new RedisClient();