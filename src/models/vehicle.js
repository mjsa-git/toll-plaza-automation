const mongoose = require('mongoose');

/**
 * Vehicle schema
 */
const vehicleSchema = new mongoose.Schema({
    vehicleNo: { type: String, required: true, unique:true },
    categoryKey: { type: String, required: true },
    model: { type: String }
});

module.exports = mongoose.model('vehicle', vehicleSchema);