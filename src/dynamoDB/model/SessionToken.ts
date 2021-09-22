import AWS from 'aws-sdk'
import awsConfig from '../../config/aws.config'
import Result from '../../models/Result';
import { DocumentClient, Key } from 'aws-sdk/clients/dynamodb';
import generateUUID from '../../utils/uuid-generator';

AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey
});

const dbClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'user_session'

interface SessionToken {
  username: string;
  userToken: string;
}

export interface ISessionToken {
  username: string;
  userToken: string;
}

class SessionToken implements ISessionToken {
  username: string;
  userToken: string;


  constructor(username: string = '',
    userToken: string = '',) {
    this.username = username;
    this.userToken = userToken;
  }

  // 创建 创建 user token
  static async createSessionToken(username: string, userToken: string) {

    try {
      // 生成 生成 user session token
      const params = {
        TableName: tableName,
        Item: {
          session_id: generateUUID(),
          username,
          userToken,
          createdAt: new Date().toISOString(),
        }
      };
      await dbClient.put(params).promise()

    } catch (error: any) {
      console.log(error)
      return Result.failure(error.message)
    }
  }

   // check if the user name is already in the dynamodb 
   static async checkExisting(username: string) {
    try {
      const params: DocumentClient.ScanInput = {
        TableName: tableName,
        FilterExpression: `#username = :username`,
        ExpressionAttributeNames: {
          '#username': 'username',
        },
        ExpressionAttributeValues: {
          ":username": username,
        }
      }

      const result = await dbClient.scan(params).promise();
      if (result.Items && result.Items?.length > 0) {
        return result.Items[0]
      } else {
        return {}
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // 查找某个用户的 session
  static async getUserTokenByUsernameAndToken(username: string,
    sessionToken: string) {
    try {
      const params: DocumentClient.ScanInput = {
        TableName: tableName,
        FilterExpression: `#username = :username and #sessionToken = :sessionToken`,
        ExpressionAttributeNames: {
          '#username': 'username',
          '#sessionToken': 'userToken' // dynamodb col name
        },
        ExpressionAttributeValues: {
          ":username": username,
          ":sessionToken": sessionToken,
        }
      }

      const result = await dbClient.scan(params).promise();
      if (result.Items && result.Items?.length > 0) {
        return result.Items[0]
      } else {
        return {}
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // 删除某一个 数据
  static async deleteSessionTokenByUsernameAndToken(username: string,
    sessionToken: string) {
    try {
      const sessionItem = await SessionToken.getUserTokenByUsernameAndToken(username, sessionToken)
      if (sessionItem.session_id) {
        const params: DocumentClient.DeleteItemInput = {
          TableName: tableName,
          Key: {
            session_id: sessionItem.session_id,
          }
        }
        return await dbClient.delete(params).promise();
      } else {
        return {}
      }


    } catch (error: any) {
      console.log(error)
      throw new Error(error.message);
    }
  }




}

export default SessionToken