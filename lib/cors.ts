import type { ApiRequest, ApiResponse, ApiMethod, ApiEndpoint } from './types'

type ApiCors = (endpointFunction:ApiEndpoint, methods:ApiMethod[]) => ApiEndpoint

const allowCors:ApiCors = (endpointFunction:ApiEndpoint, methods:ApiMethod[]) => (async (req:ApiRequest, res:ApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', methods.join(','))
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  return await endpointFunction(req, res)
})

export default allowCors