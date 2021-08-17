import express from 'express'
import { loginRouter, healthCheck, messageRouter } from './routers'
import bodyParser from 'body-parser';
import cors from "cors";
import defender from './middlewares/defender';

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


app.use('/api', messageRouter);
app.use('/api', loginRouter);
app.use('/api', healthCheck)


app.listen(3001, () => {
  console.log('🚀 API IS RUNNING ON 3001...');
})