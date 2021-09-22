import SessionToken from '../SessionToken';

describe('dynamodb 测试', () => {

  it('可以创建 user token', async () => {
    try {
      await SessionToken.createSessionToken('alex', 'test session token')
    } catch (error) {
      console.log(error)
    }

  });

  it('查看用户session token ', async () => {
    try {
      await SessionToken.getUserTokenByUsernameAndToken('alex', 'test session token')
    } catch (error) {
      console.log(error)
    }
  });

  it('delete dynamodb session token', async () => {
    try {
      await SessionToken.deleteSessionTokenByUsernameAndToken('alex', 'test session token')
    } catch (error) {
      console.log(error)
    }

  });

})