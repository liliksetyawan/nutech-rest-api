const cnst = require("../const");

module.exports = {
    successResponse(res, message, data) {
      return res.status(200).json({
        status: 0,
        message: message,
        data : data,
      });
    },
  
    errorResponse(res, message, status, data) {
      return res.status(500).json({
        status: status,
        message: message,
        data: data,
      });
    },

    unauthorizesResponse(res, data) {
        return res.status(401).json({
          status: 108,
          message : cnst.messageErrorToken,
          data: data,
        });
    },

    validationResponse(res, message, status, data) {
        return res.status(400).json({
          status: status,
          message: message,
          data: data,
        });
      },
  
  };
  