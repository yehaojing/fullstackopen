const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.code === 11000) {
        return response.status(400).json({ error: `username '${error.keyValue.username}' already exists ` })
    }
}
  
module.exports = {
    errorHandler
}