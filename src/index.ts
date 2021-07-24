import express from 'express'
import { loginRouter } from './routers'

const app  = express()

app.use(loginRouter);

app.listen(3001, () => {
  console.log('🚀 API IS RUNNING ON 3001...');
})