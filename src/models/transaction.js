const mongoose = require('mongoose');
const { TRIP_TYPES } = require('../constants/trip.type');

/**
 * Transaction schema
 */
const transactionSchema = new mongoose.Schema({
    vehicleNo: { type: String, required: true },
    vehicleCategory: { type: String, required: true },
    tripType: { type: String, enum : [TRIP_TYPES.ONE_WAY,TRIP_TYPES.RETURN,TRIP_TYPES.PASS], required: true },
    amount: { type: Number, required: true },
    dateTime: { type: Date, required: true } 
});

module.exports = mongoose.model('transaction', transactionSchema);