const mongoose = require('mongoose');
const { TRIP_TYPES } = require('../constants/trip.type');

/**
 * Category schema
 */
const categorySchema = new mongoose.Schema({
    categoryKey: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    charges: [{
        tripType:{ type: String, enum : [TRIP_TYPES.ONE_WAY,TRIP_TYPES.RETURN], required: true},
        price: Number
    }]
});

module.exports = mongoose.model('category', categorySchema);