(function(global) {
    "use strict;"

    var Const = {};
    Const.messageSuccessRegistration = "Registrasi berhasil silahkan login";
    Const.messageSuccessLogin = "Login Sukses";
    Const.messageSuccess = "Sukses"
    Const.messageSuccessUpdateProfileImage = "Update Profile Image berhasil";
    Const.messageSuccessGetBalance = "Get Balance Berhasil";
    Const.messageSuccessTransactional = "Transaksi berhasil";
    Const.messageSuccessGetHistory = "Get History Berhasil"

    Const.messageErrorToken = "Token tidak tidak valid atau kadaluwarsa";
    Const.messageErrorFormatImage = "Format Image tidak sesuai";
    Const.messageErrorParameterEmail = "Paramter email tidak sesuai format";
    Const.messageErrorUsernamePassword = "Username atau password salah";
    Const.messageErrorServiceNotFound = "Service ataus Layanan tidak ditemukan";
    Const.messageSuccessTopUp = "Top Up Balance berhasil";
    Const.messageErrorAmount = "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0";

    Const.codeSuccess = 0;
    Const.codeErrorData = 102;
    Const.codeErrorToken = 108;

    
    module.exports = Const;

})((this || 0).self || global);
