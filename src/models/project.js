'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Define associations here
    }

    static async findOneById(id) {
      return this.findByPk(id);
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nodeJs: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      nextJs: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      reactJs: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      typeScript: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      uploadImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'tb_projects',
    }
  );
  return Project;
};