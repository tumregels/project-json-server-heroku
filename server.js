// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

var basicAuth = require('express-basic-auth')
 
server.use(basicAuth({
    users: { 'admin': 'secret1' },
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse,
}))

function getUnauthorizedResponse(req) {
    return req.auth ?
        {'Unauthorized':('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')} : 
        {'Unauthorized':'No credentials provided'}
}

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})