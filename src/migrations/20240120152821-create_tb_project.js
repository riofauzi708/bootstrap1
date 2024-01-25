'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_projects', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_users',
          key: 'id'
        }
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nodeJs: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      nextJs: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      reactJs: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      typeScript: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      uploadImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_projects');
  },
};