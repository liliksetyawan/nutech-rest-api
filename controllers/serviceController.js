const Service = require("../models/service");
const cnst = require("../const");
const {successResponse, errorResponse} = require("../util/responseHandler")

module.exports = {

  async getAllService(req, res) {
    
    try {
        let service = await Service.getAllService();

        return successResponse(res, cnst.messageSuccess, service)
    } catch (error) {
        return errorResponse(res, error.original.message, 110, null)
    }
  },
};