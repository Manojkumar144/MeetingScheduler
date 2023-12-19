// slotsBooking.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const SlotsTable = require('./slotsTable'); 

const SlotsBooking = sequelize.define('slots_booking', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    meetingUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: SlotsTable,
            key: 'id'
        }
    },
});

// Establishing the foreign key relationship
SlotsBooking.belongsTo(SlotsTable, { foreignKey: 'slotId' });

module.exports = SlotsBooking;
