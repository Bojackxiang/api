import express from 'express'
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const headers = req.headers;
    const { secret } = headers
    if (!secret || secret !== 'secret') {
      throw new Error('Not allowed')
    }
    console.debug(headers.host)
    // TODO: 每次有访问都能查看当问地址
    // TODO: 如果不是我喜欢的，我可以屏蔽
    next()
  } catch (error) {
    res.send('"No Auth"')
    throw new Error('error')
  }

}