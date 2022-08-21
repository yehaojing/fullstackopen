const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.code === 11000) {
        return response.status(400).json({ error: `username '${error.keyValue.username}' already exists ` })
    }
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else {
        return response.status(401).json( { error: 'invalid/missing token'})
    }

    next()
}

const userExtractor = (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    } else {
        request.user = decodedToken
    }

    next()
}


module.exports = {
    tokenExtractor,
    userExtractor,
    errorHandler
}