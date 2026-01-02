'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // PostgreSQL ENUM update
    await queryInterface.sequelize.query(`
      ALTER TYPE enum_users_role ADD VALUE IF NOT EXISTS 'PRO';
    `);

    await queryInterface.sequelize.query(`
      ALTER TYPE enum_users_role ADD VALUE IF NOT EXISTS 'PRO_PLUS';
    `);
  },

  async down(queryInterface, Sequelize) {
    // ⚠️ ENUM values CANNOT be removed safely in Postgres
    // So down migration is intentionally left empty
  },
};
