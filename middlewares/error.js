import ErrorHandler from "utils/errorHandler";

export default (err, req, res, next) => {
    err.statusCode = err.status || 500;
    let error;

    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.path}`;
        error = new ErrorHandler(400, message);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: error || err,
        message: err.message
    })
}