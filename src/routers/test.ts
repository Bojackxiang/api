import express, {Request, response, Response} from 'express';
import JSONResult from '../common/JsonResult';
const testRouter = express.Router();
/**
 * 这个 function 主要是为了测试一些新的功能
 * 
 */ 
 testRouter.get('/general-error', (req: Request, res: Response) => {
    const response = JSONResult.error()
    res.json(response)
 })

 testRouter.get('/auth-error', (req: Request, res: Response) => {
   const response = JSONResult.authError()
   res.json(response)
})

testRouter.get('/not-found-error', (req: Request, res: Response) => {
   const response = JSONResult.notFoundError()
   res.json(response)
})

testRouter.get('/general-error', (req: Request, res: Response) => {
   const response = JSONResult.error()
   res.json(response)
})

testRouter.get('/ok', (req: Request, res: Response) => {
   const response = JSONResult.ok()
   res.json(response)
})

 export default testRouter;
