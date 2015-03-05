// requires-dependencies.js
//
// modules in this directory require this module and leverage its
// exports to get at dependencies. this allows us to move this directory
// and break only this file.
//

module.exports = {
    onm: require('../../../../index'),
    dataModelDeclaration: require('../../../fixture/named-object-resolve-test-data-model'),
    testComponentResolverUseCase: require('./test-core-component-resolver')
};
