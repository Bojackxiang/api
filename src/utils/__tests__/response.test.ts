import Response from '../response-builder'
describe("response generator", () => {
  it('response should be generated Successfully', () => {
    const response = Response.buildResponse();
    console.debug(response.code)
    console.debug(response.message)
    console.debug(response.code)
    console.debug(response.success)
  })
})