// test-use-case-xri-parser-root-good-paths.js

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Path relative to root namespace: 'contacts'",
    validConfig: true,
    model: testDataModel,
    xri: 'contacts',
    addressBase: rootAddress,
    expectedResults: {
        uri: 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts',
        lri: 'onm-lri:585db532280f349b37bf31f654d58c10:5'
    }
});

xriParserUseCase({
    testName: "Path relative to root namespace: 'properties'",
    validConfig: true,
    model: testDataModel,
    xri: 'properties',
    addressBase: rootAddress,
    expectedResults: {
        uri: 'onm-uri:431c97059a0240f9312f1b8854d58bfa:properties',
        lri: 'onm-lri:585db532280f349b37bf31f654d58c10:1'
    }
});

xriParserUseCase({
    testName: "Path relative to root namespace: 'properties.subproperties'",
    validConfig: true,
    model: testDataModel,
    xri: 'properties.subproperties',
    addressBase: rootAddress,
    expectedResults: {
        uri: 'onm-uri:431c97059a0240f9312f1b8854d58bfa:properties.subproperties',
        lri: 'onm-lri:585db532280f349b37bf31f654d58c10:2'
    }
});

xriParserUseCase({
    testName: "Path relative to root namespace: 'contacts.contact'",
    validConfig: true,
    model: testDataModel,
    xri: 'contacts.contact',
    addressBase: rootAddress,
    expectedResults: {
        uri: 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.-',
        lri: 'onm-lri:585db532280f349b37bf31f654d58c10:5.-'
    }
});

xriParserUseCase({
    testName: "Path relative to root namespace: 'contacts.+",
    validConfig: true,
    model: testDataModel,
    xri: 'contacts.+',
    addressBase: rootAddress,
    expectedResults: {
        uri: 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.-',
        lri: 'onm-lri:585db532280f349b37bf31f654d58c10:5.-'
    }
});

xriParserUseCase({
    testName: "Path relative to root namespace: 'contacts.4c2da644-5e47-445e-9480-16c2a0827e51",
    validConfig: true,
    model: testDataModel,
    xri: 'contacts.4c2da644-5e47-445e-9480-16c2a0827e51',
    addressBase: rootAddress,
    expectedResults: {
        uri: 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.4c2da644-5e47-445e-9480-16c2a0827e51',
        lri: 'onm-lri:585db532280f349b37bf31f654d58c10:5.4c2da644-5e47-445e-9480-16c2a0827e51'
    }
});


xriParserUseCase({
    testName: "Path relative to root namespace: 'contacts.4c2da644-5e47-445e-9480-16c2a0827e51.addresses.+.notes.note'",
    validConfig: true,
    model: testDataModel,
    xri: 'contacts.4c2da644-5e47-445e-9480-16c2a0827e51.addresses.+.notes.note',
    addressBase: rootAddress,
    expectedResults: {
        uri: '',
        lri: '',
        error: ''
    }
});




