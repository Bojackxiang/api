import User from '../User';
import UserRDS from '../../../aws/RDS'

describe('用户操作', () => {
  it('创建用户', async () => {
    try {
      const user = new User(
        'admin2',
        '111111',
        'admin2@admin.com',
        "13777777772",
        19,
        'unknown'
      );
      const createResult = await User.createUser(user);
      console.debug({createResult})
    } catch (error) {
      console.debug(error)
    }finally{
      console.debug('结束了')
      const pool = UserRDS.getPool;
      pool.end(); // end 这边就能
    }

  })

  it('用户登录', async () => {
    const user = {
      username: 'admin',
      email: 'admin@admin.com',
      password: '111111',
    }

    try {
      const result = await User.verifyUserInfo(user)
      console.debug({ result })
    } catch (error) {
      console.error(error)
    } finally {
      const pool = UserRDS.getPool;
      pool.end(); // end 这边就能
    }
  })
})