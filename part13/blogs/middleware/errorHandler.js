const errorHandler = (error, request, response, next) => {
    if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        response.status(400).json({ error: messages })
    } else if (error.name === 'BlogNotFound') {
        response.status(404).json({ error: error.message })
    }

    next(error);
};

module.exports = { errorHandler };