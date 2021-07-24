import express from 'express'
import { loginRouter, healthCheck } from './routers'
import cors from "cors";

const app  = express()
app.use(cors())

// firebaseClient.testWrite()
// firebaseClient.testReadDataById('123')

app.use(loginRouter);
app.use(healthCheck)

app.listen(3001, () => {
  console.log('🚀 API IS RUNNING ON 3001...');
})