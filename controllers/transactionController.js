const Balance = require("../models/balance");
const Service = require("../models/service");
const Transaction = require("../models/transaction");
const UtilTime = require("../util/time")
const UtilInvoice = require("../util/invoiceNumber")
const {successResponse, errorResponse, validationResponse} = require("../util/responseHandler")
const { sequelize } = require('../config/database');
const cnst = require("../const");

module.exports = {

  async getBalance(req, res) {
    let user = req.user;
    try {
        let balance = await Balance.getBalanceByUserID(user.id);

        if ( !balance ) {
            return successResponse(res, cnst.messageSuccess, {balance : 0})
        }

        return successResponse(res, cnst.messageSuccess, {balance : balance.amount})
    } catch (error) {
        return errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },

  async topUp(req, res) {
    let user = req.user;
    let {top_up_amount} = req.body;
    const tx = await sequelize.transaction();
    try {
        let balance = await Balance.getBalanceByUserID(user.id);

        let count = await Transaction.countTransactionByDate(UtilTime.getDateFormated())

        await Transaction.insertTransaction(
            {
                user_id: user.id,
                service_type_id: null,
                invoice_number: UtilInvoice.generateInvoiceNumber(Number(count.count) + 1),
                type: "TOPUP", 
                description: "",
                total_amount: top_up_amount
            },
            tx
        )


        if ( !balance ) {
            await Balance.insertBalance(user.id, top_up_amount, tx)

            await tx.commit()

            return successResponse(res, cnst.messageSuccess, {balance : top_up_amount})
        } else {
            balance = await Balance.updateBalance(user.id, top_up_amount, true, tx)

            await tx.commit()

            return successResponse(res, cnst.messageSuccess, {balance : balance[0].amount})
        }
        
    } catch (error) {
        await tx.rollback()
        return errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },

  async transaction(req, res) {
    let user = req.user;
    const {service_code} = req.body;
    const tx = await sequelize.transaction()
    try {
        let balance = await Balance.getBalanceByUserID(user.id);

        if ( !balance ) {
            return validationResponse(res, "Anda belum memiliki saldo", cnst.codeErrorData, null)
        }


        let service = await Service.getServiceByCode(service_code)

        if ( !service ) {
            return validationResponse(res, "Service ataus Layanan tidak ditemukan", cnst.codeErrorData, null)
        }

        if ( balance.amount < service[0].service_tarif) {
            return validationResponse(res, "Saldo anda tidak cukup", cnst.codeErrorData, null)
        }

        const date = UtilTime.getDateFormated()

        let count = await Transaction.countTransactionByDate(date)
        
        const invoice_number = UtilInvoice.generateInvoiceNumber(Number(count.count) + 1)


        const transaction_data = {
            user_id : user.id,
            service_type_id : service[0].id,
            invoice_number : invoice_number,
            description: "",
            type: "PAYMENT",
            total_amount: service[0].service_tarif
        }

        let transactionResult = await Transaction.insertTransaction(transaction_data, tx)

        await Balance.updateBalance(user.id, service[0].service_tarif, false, tx)

        await tx.commit()

        return successResponse(res, cnst.messageSuccess, {
            invoice_number : invoice_number,
            service_code : service[0].service_code,
            service_name : service[0].service_name,
            transaction_type : transaction_data.type,
            total_amount : service[0].service_tarif,
            created_on : transactionResult[0].created_at
        })

        
    } catch (error) {
        await tx.rollback()
        return errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },

  async getTransactionPaginate(req, res) {
    let user = req.user;
    let { limit, offset } = req.query;
    try {
        let transactionsData = await Transaction.getTransactionPaginantion(user.id, limit, offset);

        let data = {
            offset : offset,
            limit: limit,
            records : []
        }

        if ( !transactionsData ) {
            return successResponse(res, cnst.messageSuccess, data)
        }

        data.records = transactionsData

        return successResponse(res, cnst.messageSuccess, data)
    } catch (error) {
        return errorResponse(res, error.original.message, cnst.codeErrorData, null)
    }
  },
};