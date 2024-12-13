const {validationResponse} = require("../util/responseHandler");
const cnst = require("../const");

exports.validateUser = (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
  
  
    if (!first_name || first_name.trim().length < 1 || typeof first_name !== "string") {
        return validationResponse(res, "First name tidak boleh kosong", cnst.codeErrorData, null);
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return validationResponse(res, "Parameter email tidak sesuai", cnst.codeErrorData, null);
    }
  
    if (!password || password.length < 6) {
        return validationResponse(res, "Password minimal enam karakter", cnst.codeErrorData, null);
    }
  
    // Proceed to the next middleware or controller
    next();
  };