import express from 'express'
import { loginRouter, healthCheck, messageRouter } from './routers'
import bodyParser from 'body-parser';
import cors from "cors";

const app  = express()
app.use(bodyParser.json())
app.use(cors())

// firebaseClient.testWrite()
// firebaseClient.testReadDataById('123')

app.use('/api', messageRouter);
app.use('/api', loginRouter);
app.use('/api', healthCheck)

app.listen(3001, () => {
  console.log('🚀 API IS RUNNING ON 3001...');
})