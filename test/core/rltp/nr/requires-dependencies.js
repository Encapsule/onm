// requires-dependencies.js
//
// modules in this directory require this module and leverage its
// exports to get at dependencies. this allows us to move this directory
// and break only this file.
//

module.exports = {
    onm:                            require('../../../../index'),
    namedObjectResolver:            require('../../../../lib/rltp-named-object-resolver'),
    namedObjectContext:             require('../../../../lib/rltp-named-object-context'),
    testData:                       require('../../../fixture/address-book-data-model'),
    namedObjectTestDataModel:       require('../../../fixture/named-object-resolve-test-data-model'),
};
