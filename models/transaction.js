const { sequelize } = require('../config/database');

const TransactionModel = {

  async getTransactionPaginantion(id, limit, offset) {
    const query = `
        SELECT 
            invoice_number, type, description,
            total_amount, created_at
        FROM transaction
        WHERE user_id = :user_id
        ORDER BY id DESC
        LIMIT :limit OFFSET :offset;
    `;

    try {
        const result = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements:{
                user_id: id,
                limit: parseInt(limit, 10),
                offset: parseInt(offset, 10),
            }, 
        });
        return result;
      } catch (error) {
        console.error('Error getting user:', error);
        throw error;
      }
  },

  async insertTransaction(transaction_data, tx) {
    const query = `
        INSERT INTO transaction 
            ( 
                user_id, service_type_id, invoice_number,
                type, description, total_amount,
                created_at, updated_at
            )
        VALUES 
            (
                $1, $2, $3,
                $4, $5, $6,
                NOW(), NOW()
            )
        RETURNING id, created_at;
    `;

    try {
        const [result] = await sequelize.query(query, {
          bind: [
            transaction_data.user_id,
            transaction_data.service_type_id,
            transaction_data.invoice_number,
            transaction_data.type,
            transaction_data.description,
            transaction_data.total_amount
          ], 
          type: sequelize.QueryTypes.INSERT,
          transaction: tx
        });
        return result;
      } catch (error) {
        console.error('Error inserting transaction:', error);
        throw error;
      }
  },

  async countTransactionByDate(date) {
    const query = `
        SELECT 
            count(id)
        FROM transaction
        WHERE DATE(created_at) =  $1;
    `;

    try {
        const [result] = await sequelize.query(query, {
          bind: [
              date
          ], 
          type: sequelize.QueryTypes.SELECT,
        });
        return result;
      } catch (error) {
        console.error('Error getting transaction:', error);
        throw error;
      }
  },



};

module.exports = TransactionModel;
