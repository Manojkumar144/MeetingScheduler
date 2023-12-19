const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const SlotsTable = sequelize.define('slots_table', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    slotsAvailable: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    meetingUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  module.exports = SlotsTable;