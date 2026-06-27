function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    const status = err.status || 500;
    const message = err.message || 'Something went wrong on the server';

    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
}

module.exports = errorHandler;