const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {successResponse, errorResponse, validationResponse} = require("../util/responseHandler");
const cnst = require("../const");


module.exports = {
  async register(req, res) {
    const { first_name, last_name, email, password, profile_image } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        first_name: first_name, 
        last_name: last_name, 
        email: email, 
        password :hashedPassword, 
        profile_image: profile_image === undefined ? "" : profile_image
      }
      const user = await User.insertUser(userData);
      successResponse(res, cnst.messageSuccessRegistration, null)
    } catch (error) {
      errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findUserByEmail( email );
      if (!user) {
        return validationResponse(res, "User tidak ditemukan", 104, null)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return validationResponse(res, "Username atau password salah", 103, null)
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "12h" });
      return successResponse(res, cnst.messageSuccessLogin, {token : token})
    } catch (error) {
        return errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },

  async profileUser(req, res) {
    let user = req.user;
    try {
        user = await User.findUserByEmail( user.email );

        return successResponse(res, cnst.messageSuccess, {
            email : user.email,
            first_name : user.first_name,
            last_name : user.last_name,
            profile_image : user.profile_image
        })
    } catch (error) {
        return errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },

  async updateUser(req, res) {
    let user = req.user;
    try {
        const { first_name, last_name } = req.body;
        const user_data = {
            first_name : first_name,
            last_name : last_name, 
            email : user.email
        }
        user = await User.updateUser( user_data );

        return successResponse(res, cnst.messageSuccessUpdateProfileImage, {
            email : user[0].email,
            first_name : user[0].first_name,
            last_name : user[0].last_name,
            profile_image : user[0].profile_image
        })
    } catch (error) {
        return errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },

  async updateImage(req, res) {
    let user = req.user;
    let file = req.file;
    try {
      
        const user_data = {
            profile_image : file.originalname,
            id : user.id, 
        }
        user = await User.updateUserImage( user_data );

        return successResponse(res, cnst.messageSuccessUpdateProfileImage, {
            email : user[0].email,
            first_name : user[0].first_name,
            last_name : user[0].last_name,
            profile_image : user[0].profile_image
        })
    } catch (error) {
        return errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },
};