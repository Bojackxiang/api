import User from '../User';
import UserRDS from '../../../aws/RDS'

describe('用户操作', () => {
  it('创建用户', async () => {
    const user = new User(
      'admin',
      '111111',
      'admin@admin.com',
      "13777777777",
      19,
      'unknown'
    );
    await User.createUser(user);
    const pool = UserRDS.getPool;
    pool.end(); // end 这边就能
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