const {validationResponse} = require("../util/responseHandler");
const cnst = require("../const");

const validateTopup = (req, res, next) => {
    const { top_up_amount } = req.body;
  
  
    if (!top_up_amount || top_up_amount < 0 ) {
        return validationResponse(res, cnst.messageErrorAmount, cnst.codeErrorData, null);
    }
  
  
    // Proceed to the next middleware or controller
    next();
  };

  module.exports = {validateTopup}