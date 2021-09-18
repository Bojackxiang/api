import Response from '../response-buiulder'
describe("response generator", () => {
  it('response should be generated Successfully', () => {
    const response = Response.buildResponse();
    console.log(response.code)
    console.log(response.message)
    console.log(response.code)
    console.log(response.success)
  })
})