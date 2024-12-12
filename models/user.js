const { sequelize } = require('../config/database');

const UserModel = {

  async insertUser(user_data) {
    const query = `
      INSERT INTO "users" 
        (
            first_name, last_name, email, 
            password, profile_image, created_at, 
            updated_at
        )
      VALUES 
        (
            $1, $2, $3,
            $4, $5, NOW(), 
            NOW()
        )
      RETURNING id;
    `;

    try {
      const [result] = await sequelize.query(query, {
        bind: [
            user_data.first_name, user_data.last_name, user_data.email,
            user_data.password, user_data.profile_image
        ], 
        type: sequelize.QueryTypes.INSERT,
      });
      return result; // Return the inserted user's data
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  },

  async findUserByEmail(email) {
    const query = `
        SELECT 
            id, first_name, last_name, 
            email, password, profile_image, 
            created_at, updated_at
        FROM "users" 
        WHERE email = $1;
    `;

    try {
      const [result] = await sequelize.query(query, {
        bind: [email], 
        type: sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  async updateUser(user_data) {
    const query = `
        UPDATE "users" SET  
            first_name = $1, last_name = $2, updated_at = NOW()
        WHERE email = $3
        RETURNING 
            id, first_name, last_name, 
            email, profile_image;
    `;

    try {
      const [result] = await sequelize.query(query, {
        bind: [
            user_data.first_name, 
            user_data.last_name, 
            user_data.email
        ], 
        type: sequelize.QueryTypes.UPDATE,
      });
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async updateUserImage(user_data) {
    const query = `
        UPDATE "users" SET  
            profile_image = $1, updated_at = NOW()
        WHERE id = $2
        RETURNING 
            id, first_name, last_name, 
            email, profile_image;
    `;

    try {
      const [result] = await sequelize.query(query, {
        bind: [
            user_data.profile_image, 
            user_data.id,
        ], 
        type: sequelize.QueryTypes.UPDATE,
      });
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
};

module.exports = UserModel;
