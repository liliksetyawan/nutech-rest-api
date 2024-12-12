"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create users table
    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      profile_image: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Create balance table
    await queryInterface.createTable("balance", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "users", key: "id" }, onDelete: "CASCADE" },
      amount: { type: Sequelize.DOUBLE },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Create service table
    await queryInterface.createTable("service", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      code: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      tarif: { type: Sequelize.DOUBLE },
      icon: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Create banner table
    await queryInterface.createTable("banner", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Create transaction table
    await queryInterface.createTable("transaction", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "users", key: "id" }, onDelete: "CASCADE" },
      service_type_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: "service", key: "id" }, onDelete: "CASCADE" },
      invoice_number: { type: Sequelize.STRING },
      type: { type: Sequelize.STRING },
      total_amount: { type: Sequelize.DOUBLE },
      description: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Insert bulk data into banner table
    await queryInterface.bulkInsert("banner", [
      { name: "Banner 1", image: "https://nutech-integrasi.app/dummy.jpg", description: "Lerem Ipsum Dolor sit amet", created_at: new Date(), updated_at: new Date() },
      { name: "Banner 2", image: "https://nutech-integrasi.app/dummy.jpg", description: "Lerem Ipsum Dolor sit amet", created_at: new Date(), updated_at: new Date() },
      { name: "Banner 3", image: "https://nutech-integrasi.app/dummy.jpg", description: "Lerem Ipsum Dolor sit amet", created_at: new Date(), updated_at: new Date() },
      { name: "Banner 4", image: "https://nutech-integrasi.app/dummy.jpg", description: "Lerem Ipsum Dolor sit amet", created_at: new Date(), updated_at: new Date() },
      { name: "Banner 5", image: "https://nutech-integrasi.app/dummy.jpg", description: "Lerem Ipsum Dolor sit amet", created_at: new Date(), updated_at: new Date() },
      { name: "Banner 6", image: "https://nutech-integrasi.app/dummy.jpg", description: "Lerem Ipsum Dolor sit amet", created_at: new Date(), updated_at: new Date() }
    ]);

    // Insert bulk data into service table
    await queryInterface.bulkInsert("service", [
      { code: "PAJAK", name: "Pajak PBB", tarif: 40000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "PLN", name: "Listrik", tarif: 10000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "PDAM", name: "PDAM Berlangganan", tarif: 40000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "PULSA", name: "Pulsa", tarif: 40000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "PGN", name: "PGN Berlangganan", tarif: 50000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "MUSIK", name: "Musik Berlangganan", tarif: 50000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "TV", name: "TV Berlangganan", tarif: 50000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "PAKET_DATA", name: "Paket Data", tarif: 50000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "VOUCHER_GAME", name: "Voucher Game", tarif: 100000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "VOUCHER_MAKANAN", name: "Voucher Makanan", tarif: 100000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "QURBAN", name: "Qurban", tarif: 200000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
      { code: "ZAKAT", name: "Zakat", tarif: 300000, icon: "https://nutech-integrasi.app/dummy.jpg", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("banner", null, {});
    await queryInterface.bulkDelete("service", null, {});
    await queryInterface.dropTable("transaction");
    await queryInterface.dropTable("banner");
    await queryInterface.dropTable("service");
    await queryInterface.dropTable("balance");
    await queryInterface.dropTable("users");
  },
};
