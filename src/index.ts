import express from 'express'
import { loginRouter, healthCheck, messageRouter, testRouter } from './routers'
import bodyParser from 'body-parser';
import cors from "cors";
import defender from './middlewares/defender';
import RDS from './aws/RDS';

const app = express()
app.use(bodyParser.json())
app.use(cors())

// -----------------
// 保护网站不被恶意访问 
// -----------------
app.use((req: express.Request,
  res: express.Response,
  next: express.NextFunction) => defender(req, res, next
  )
)

// -----------------
// router 部分
// -----------------
app.use('/api', messageRouter);
app.use('/api', loginRouter);
app.use('/api', healthCheck)
app.use('/api', testRouter)


// -----------------
// 退出程序
// -----------------
process.on('SIGINT', function () {
  const pool = RDS.getPool;
  if (pool) {
    pool.end()
  } else {
    console.log('没有连接可以关闭')
  }
  process.exit()
});


app.listen(3001, () => {
  console.log('🚀 API IS RUNNING ON 3001...');
})