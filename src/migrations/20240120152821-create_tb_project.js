'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_project', {
      id: {
        type: Sequelize.SERIAL,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('tb_project');
  },
};