module.exports = {
    onm: require('../../../index'),
    assert: require('chai').assert,
    withData: require('leche').withData,
    uuid: require('node-uuid'),
    testData: require('../../fixture/address-book-data-model')
}