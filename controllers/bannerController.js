const Banner = require("../models/banner");
const cnst = require("../const");
const {successResponse, errorResponse} = require("../util/responseHandler")

module.exports = {

  async getAllBanner(req, res) {
    
    try {
        let banner = await Banner.getAllBanner();

        return successResponse(res, cnst.messageSuccess, banner)
    } catch (error) {
        return errorResponse(res, error.original.message, 110, null)
    }
  },
};