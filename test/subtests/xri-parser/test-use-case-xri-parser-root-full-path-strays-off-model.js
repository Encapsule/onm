 // test-use-case-xri-parser-root-full-path-strays-off-model.

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Full valid path that's not in the address space evaluated relative to store container.",
    validConfig: false,
    xri: 'addressBook.contacts.OFFTHETRACKS',
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: onm.Model.createPathAddress failed: getPathIdFromPath fail: Path \'addressBook.contacts.OFFTHETRACKS\' is not in the \'addressBook\' model\'s address space.'
    }
});



