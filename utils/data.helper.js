
const generateSuccessResponse = (res, message="", statusCode, data={}) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
    success: true,
  });
}

const generateErrorResponse = (res, message="", statusCode, data={}) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
    success: false,
    });
}

module.exports = { 
    generateSuccessResponse,
    generateErrorResponse,
};
