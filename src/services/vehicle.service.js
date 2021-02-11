const VehicleModel = require('../models/vehicle');

module.exports.getVehicle = (vehicleNo) => {
    return VehicleModel.aggregate([
        {
            $match: {
                "vehicleNo": vehicleNo
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryKey',
                foreignField: 'categoryKey',
                as: 'category'
            }
        },
        {
            $unwind: {
                path: "$category"

            }
        }
    ]).then(rs => rs[0])
}