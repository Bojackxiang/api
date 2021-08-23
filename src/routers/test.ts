import express, {Request, response, Response} from 'express';
import JSONResult from '../common/JsonResult';
const testRouter = express.Router();
/**
 * 这个 function 主要是为了测试一些新的功能
 * 
 */ 
 testRouter.get('/test', (req: Request, res: Response) => {
   console.log('---');
    const response = JSONResult.error()
    res.json(response)
 })

 export default testRouter;
