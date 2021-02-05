module.exports = (err, req, res, next) => {
  let statusCode = 500
  let errorCode = "UNKNOWN_ERROR"
  let message = "Internal server error"

  switch (true) {
    case (err.name === "SequelizeValidationError"):
      statusCode = 400
      errorCode = "VALIDATION_ERROR"
      message = err.errors.map(el => el.message)
      break;
    
    case (err.name === "SequelizeUniqueConstraintError"):
      statusCode = 400
      errorCode = "INVALID_EMAIL"
      message = err.errors.map(el => el.message)
      break;

      case (err.name === "customError"):
        statusCode = 400
        errorCode = "INVALID_DATA"
        message = err.message
        break;

      case (err.name === "Not Authenticate"):
        statusCode = 400
        errorCode = "USER_NOT_AUTHENTICATED"
        message = err.message
        break;
    default:
      break;
  }

  res.status(statusCode).json({
    error: errorCode, message: message
  })
}