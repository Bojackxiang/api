import express, { Request, Response, NextFunction } from 'express'
import downloadPDF from '../service/file-download';

const healthCheckRouter = express.Router();

healthCheckRouter.get('/file', async (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const file: ArrayBuffer = await downloadPDF();

    res.setHeader('Content-Length', Buffer.byteLength(file)); // depends on the buffer size returned by the service
    res.setHeader('Content-Type', 'application/pdf'); // send the content type to the client
    res.setHeader('Content-Disposition', `attachment; filename.pdf`); // the name should depends on the request
    res.send(file)

  } catch (err) {
    next(err);
  }
})

export default healthCheckRouter