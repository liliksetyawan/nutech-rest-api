const { sequelize } = require('../config/database');

const BalanceModel = {

  async getBalanceByUserID(id) {
    const query = `
        SELECT 
            amount
        FROM balance
        WHERE user_id = $1;
    `;

    try {
        const [result] = await sequelize.query(query, {
          bind: [
              id
          ], 
          type: sequelize.QueryTypes.SELECT,
        });
        return result;
      } catch (error) {
        console.error('Error getting user:', error);
        throw error;
      }
  },

  async insertBalance(user_id, amount, transaction) {
    const query = `
        INSERT INTO balance 
            ( 
                user_id, amount, created_at,
                updated_at
            )
        VALUES 
            (
                $1, $2, NOW(),
                NOW()
            );
    `;

    try {
        const [result] = await sequelize.query(query, {
          bind: [
              user_id,
              amount
          ], 
          type: sequelize.QueryTypes.INSERT,
          transaction : transaction
        });
        return result;
      } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
      }
  },

  async updateBalance(user_id, amount, is_increase, tx) {
    let sign = "-"
    if (is_increase) {
        sign = "+"
    }

    const query = `
        UPDATE balance 
            SET amount = amount ${sign} $1 
            WHERE user_id = $2
            RETURNING amount;
    `;

    try {
        const [result] = await sequelize.query(query, {
          bind: [
              amount,
              user_id
          ], 
          type: sequelize.QueryTypes.UPDATE,
          transaction: tx
        });
        return result;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
  },



};

module.exports = BalanceModel;
