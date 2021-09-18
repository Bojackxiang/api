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
      console.log({createResult})
    } catch (error) {
      console.log('出错了')
      console.log(error)
    }finally{
      console.log('结束了')
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
      console.log({ result })
    } catch (error) {
      console.log(error)
    } finally {
      const pool = UserRDS.getPool;
      pool.end(); // end 这边就能
    }
  })
})