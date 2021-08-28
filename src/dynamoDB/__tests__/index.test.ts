import DynamoDB_Message from '..'

describe('message dynammodb 的测试', () => {
  it('scan 成功', async () => {
    const items = await DynamoDB_Message.scan();
    console.log(items?.length)
    expect(items?.length).toBeGreaterThan(0);
  });

  it('update / create 成功', async () => {
    const result = await DynamoDB_Message.addOrUpdateMessage("test");
    console.log(result)
  });

  it('get one message by id  成功', async () => {
    const messageId = '123213'
    const result = await DynamoDB_Message.getOneMessageById(messageId);
    expect(result?.message_id).not.toBeUndefined();
    expect(result?.message_id).toEqual(messageId);
  });

  it("delete 成功", async () => {
    await DynamoDB_Message.addOrUpdateMessage("这是一个简单的测试", '9900')
    const foundItem = DynamoDB_Message.getOneMessageById('9900')
    expect(foundItem).not.toBeUndefined();
    await DynamoDB_Message.deleteMessageById('9900')
    const deleteItem = await DynamoDB_Message.deleteMessageById('9900')
    expect(deleteItem).toEqual({})


  })
})