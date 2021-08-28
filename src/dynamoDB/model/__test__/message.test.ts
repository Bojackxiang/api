import DynamoDBMessage from '../Message';

describe('message model 能够正常在 DynamoDB 中创建信息', () => {  
  it('message 应该能正常穿件', async () => {

    const createResult = await DynamoDBMessage.createMessage('example name',
      'message example',
      'example phone',
      'example email',);
      expect(typeof createResult).toEqual('string')
  })

})