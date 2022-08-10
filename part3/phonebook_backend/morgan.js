const morgan = require('morgan')

morgan.token('request_body', function(req) {
    if ((req.method) === 'POST') {
        return JSON.stringify(req.body)
    }
    else {
        return ''
    }
})

module.exports = morgan(':method :url :status :res[content-length] - :response-time ms :request_body')