const { sequelize } = require('../config/database');

const ServiceModel = {

  async getAllService() {
    const query = `
        SELECT 
            code AS service_code, 
            name AS service_name, 
            tarif AS service_tarif,
            icon AS service_icon 
        FROM service;
    `;

    try {
      const [result] = await sequelize.query(query);
      return result;
    } catch (error) {
      console.error('Error getting service:', error);
      throw error;
    }
  },

  async getServiceByCode(code) {
    const query = `
        SELECT 
            id,
            code AS service_code, 
            name AS service_name, 
            tarif AS service_tarif,
            icon AS service_icon 
        FROM service WHERE code = $1;
    `;

    try {
      const [result] = await sequelize.query(query, {
        bind : [
            code
        ]
      });
      return result;
    } catch (error) {
      console.error('Error getting service:', error);
      throw error;
    }
  },

};

module.exports = ServiceModel;
