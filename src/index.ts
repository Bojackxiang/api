import express from 'express'
import { loginRouter } from './routers'
import firebaseClient from './firebase'

const app  = express()

// firebaseClient.testWrite()
firebaseClient.testReadDataById('123')

app.use(loginRouter);

app.listen(3001, () => {
  console.log('🚀 API IS RUNNING ON 3001...');
})