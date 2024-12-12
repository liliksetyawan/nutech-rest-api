const { sequelize } = require('../config/database');

const BannerModel = {

  async getAllBanner() {
    const query = `
        SELECT 
            name, image, description 
        FROM banner;
    `;

    try {
      const [result] = await sequelize.query(query);
      return result;
    } catch (error) {
      console.error('Error getting banner:', error);
      throw error;
    }
  },

};

module.exports = BannerModel;
