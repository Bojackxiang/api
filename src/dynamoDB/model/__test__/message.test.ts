import DynamoDBMessage from '../Message';

describe('message model 能够正常在 DynamoDB 中创建信息', () => {  
  it('message 应该能正常穿件', async () => {

    const createResult = await DynamoDBMessage.createMessage('example name',
      'message example',
      'example phone',
      'example email',);
      expect(typeof createResult).toEqual('string')
  })

  it('能够成功 获取 首页的所有message', async () => {
    const firstPageMessage = await DynamoDBMessage.listMessage(10);
    console.log(firstPageMessage)
    expect(Array.isArray(firstPageMessage)).toBe(true)
  })

  it('当输入第一个 id 的时候，应该从下一个 id 开始找', async () => {
    // 现成功获取第一个 message 的 id
    const firstTenMessage = await DynamoDBMessage.listMessage(10);
    const firstMessage = firstTenMessage ? firstTenMessage[0] : null;
    const secondMessage = firstTenMessage ? firstTenMessage[1] : null;
    
    const firstMessageId = firstMessage?.message_id
    const secondMessageId = secondMessage?.message_id;
    // 确保 database 中至少有两个数据
    expect(firstMessageId).not.toBeNull();
    expect(secondMessageId).not.toBeNull();
    
    // 尝试获取出第一个 message 之后的 10 个message
    const result = await DynamoDBMessage.listMessage(10, firstMessageId);
    const exceptionFirstMessage = result ? result[0] : null;
    expect(exceptionFirstMessage).toEqual(secondMessage)
    

    
  })

  it('能够 通过 id 正常更新 message', () => {
    
  });
})