var request = require('supertest')
var should = require('should')
var app = require('../src/index')
const { find } = require('lodash')
const { TRIP_TYPES } = require('../src/constants/trip.type')

describe('Transactions', function () {

    describe('Get Transaction Estimate for valid Vehicle No', function () {
        it('should return an estimate', function (done) {
            request(app)
                .get('/api/transactions/estimate/TN45AK2125')
                .expect(200)
                .end((err, res) => {
                    res.body.vehicleNo.should.eql('TN45AK2125')
                    res.body.charges.should.be.instanceof(Array)
                    done()
                })
        })
    })

    describe('Get error response for Invalid Vehicle Number', function () {
        it('should return an error', function (done) {
            request(app)
                .get('/api/transactions/estimate/TN45AK21')
                .expect(500)
                .end((err, res) => {
                    should.exist(res.body.error)
                    done()
                })
        })
    })

    describe('Get single pass issued', function () {
        it('should return an valid pass', function (done) {
            request(app)
                .get('/api/transactions/estimate/TN58AK2332')
                .expect(200)
                .end((err, res) => {
                    const estimate = res.body;
                    const tripSelected = find(res.body.charges, { tripType: TRIP_TYPES.ONE_WAY });
                    const transactionData = {
                        vehicleNo: estimate.vehicleNo
                    }

                    if (estimate.transactionAction == "COLLECT" && tripSelected) {
                        transactionData.amount = tripSelected.price
                        transactionData.tripType = tripSelected.tripType
                    }

                    request(app)
                        .post('/api/transactions/collect')
                        .send(transactionData)
                        .expect(200)
                        .end((postErr, postRes) => {
                            should.exist(postRes.body.vehicleNo)
                            should.exist(postRes.body.amount)
                            should.exist(postRes.body.dateTime)

                            done()
                        })
                })
        })
    })

    describe('Get Return pass issued', function () {
        it('should return an valid return pass', function (done) {
            request(app)
                .get('/api/transactions/estimate/TN12SM0025')
                .expect(200)
                .end((err, res) => {
                    const estimate = res.body;
                    const tripSelected = find(res.body.charges, { tripType: TRIP_TYPES.RETURN });
                    const transactionData = {
                        vehicleNo: estimate.vehicleNo
                    }

                    if (estimate.transactionAction == "COLLECT" && tripSelected) {
                        transactionData.amount = tripSelected.price
                        transactionData.tripType = tripSelected.tripType
                    }

                    request(app)
                        .post('/api/transactions/collect')
                        .send(transactionData)
                        .expect(200)
                        .end((postErr, postRes) => {
                            should.exist(postRes.body.vehicleNo)
                            should.exist(postRes.body.amount)
                            should.exist(postRes.body.dateTime)

                            done()
                        })
                })
        })

        it('should return an 0 amount pass', function (done) {
            request(app)
                .get('/api/transactions/estimate/TN12SM0025')
                .expect(200)
                .end((err, res) => {
                    res.body.vehicleNo.should.eql('TN12SM0025')
                    res.body.amount.should.be.eql(0)
                    done()
                })
        })

    })

    describe('Get recent transactions', function () {
        it('should return list of transactions', function (done) {
            request(app)
                .get('/api/transactions/recents')
                .expect(200)
                .end((err, res) => {
                    const transactions = res.body;
                    transactions.should.be.instanceof(Array);
                    transactions.forEach(transaction => {
                        transaction.should.be.instanceof(Object)
                        should.exist(transaction.vehicleNo)
                        should.exist(transaction.amount)
                        should.exist(transaction.dateTime)

                    });
                    done();
                })
        })
    })

})