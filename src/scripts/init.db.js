require('dotenv').config();
const db = require('../datasource/datasource');
const Vehicle = require('../models/vehicle');
const Category = require('../models/category');
const transaction = require('../models/transaction');

/* Add Category data */
Category.insertMany([
    { categoryKey: "CAR", categoryName: "Car/Jeep", charges: [{ tripType: "ONE_WAY", price: 100 }, { tripType: "RETURN", price: 200 }] },
    { categoryKey: "BUS", categoryName: "Bus", charges: [{ tripType: "ONE_WAY", price: 100 }, { tripType: "RETURN", price: 200 }] }
])
    .then(() => console.log("Category Loaded!"))
    .catch(() => console.log("Error Loading Category"))

/* Add Vehicle data */
Vehicle.insertMany([
    { vehicleNo: "TN47AK5423", categoryKey: "CAR", model: "Hyundai i10 nios" },
    { vehicleNo: "TN45AK2125", categoryKey: "CAR", model: "Honda Jazz 2019" },
    { vehicleNo: "TN12SM0025", categoryKey: "BUS", model: "Ashok Leyland B4E SpaceBus" },
    { vehicleNo: "TN58AK2332", categoryKey: "CAR", model: "Tesla X" },
])
    .then(() => console.log("Vehicles loaded!"))
    .catch(() => console.log("Error loading Vehicles"))

// transaction.insertMany([
//     { vehicleNo: "TN47AK5423", vehicleCategory: "CAR", tripType:"RETURN", amount: 200, dateTime: new Date() },

// ])
// .then(() => console.log("Transaction Loaded"))

