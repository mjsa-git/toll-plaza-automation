const db = require('../datasource/datasource');
const transactionModel = require('../models/transaction');
const { getVehicle } = require('./vehicle.service');
const { get, find, isArray } = require('lodash');
const { TRIP_TYPES } = require('../constants/trip.type');

/*
*  Returns estimate for the given Vehicle No
*/
module.exports.transactionEstimate = async (vehicleNo) => {

    const vehicle = await getVehicle(vehicleNo);

    if (!vehicle) throw Error("No Registered Vehicle found !")

    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);
    const returnTransaction = await transactionModel.findOne({ vehicleNo: vehicleNo, tripType: TRIP_TYPES.RETURN, dateTime: { $gte: start, $lt: end } });

    const estimateResponse = {
        vehicleNo,
        model: vehicle['model'],
    }
    if (returnTransaction) {
        estimateResponse.transactionAction = "PASS";
        estimateResponse.amount = 0;

    } else {
        estimateResponse.transactionAction = "COLLECT";
        estimateResponse.charges = vehicle['category']['charges']
    }

    return estimateResponse;
}

/*
*  Adds a new transaction
*/
module.exports.addTransaction = async (transactionInput) => {

    /* Validate data */
    if (!transactionInput.amount) transactionInput.amount = 0;
    if (!transactionInput.tripType) transactionInput.tripType = TRIP_TYPES.ONE_WAY;

    const vehicle = await getVehicle(transactionInput.vehicleNo);
    const vehicleCharges = get(vehicle, 'category.charges')
    const vehicleCharge = isArray(vehicleCharges) && find(vehicleCharges, { tripType: transactionInput.tripType })

    if (!vehicle || !vehicleCharges || !vehicleCharge) {
        throw Error("Mismatch with vechicle details")
    }

    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    const returnTransaction = await transactionModel.findOne({ vehicleNo: transactionInput.vehicleNo, tripType: TRIP_TYPES.RETURN, dateTime: { $gte: start, $lt: end } });

    const amountTobeCollected = returnTransaction ? 0 : vehicleCharge.price;

    if (amountTobeCollected != transactionInput.amount) {
        throw Error("Mismatch with amount collected")
    }

    const transactionData = {
        vehicleNo: transactionInput.vehicleNo,
        vehicleCategory: vehicle.categoryKey,
        tripType: returnTransaction ? "PASS" : transactionInput.tripType,
        amount: transactionInput.amount,
        dateTime: new Date()
    }

    return await transactionModel.create(transactionData)

}

/*
*  Returns recent 10 transactions
*/
module.exports.getTransactions = async () => {

    return await transactionModel.find({}, { _id: 0 }).sort({ dateTime: -1 }).limit(10)

}
