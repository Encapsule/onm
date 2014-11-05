// test-data-store.js
//
// shared test fixture routines leveraged by onm mocha tests
//

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;

var onm = require('../../onm.js');

var LUID = 1;

var modelDeclaration = module.exports.modelDeclaration = {
    semanticBindings: {
        keyPropertyName: 'key',

        setUniqueKey: function(data_, keyValue_) {
            data_[modelDeclaration.semanticBindings.keyPropertyName] = (keyValue_ != null) && keyValue_ || ("" + LUID++);
        },
        getUniqueKey: function(data_) {
            return data_[modelDeclaration.semanticBindings.keyPropertyName];
        }
    },
    jsonTag: "addressBook",
    namespaceProperties: {
        userImmutable: {
            key: {
                defaultValue: ''
            }
        }
    },
    subNamespaces: [
        {
            namespaceType: "child",
            jsonTag: "properties",
            namespaceProperties: {
                userMutable: {
                    name: {
                        defaultValue: ""
                    },
                    description: {
                        defaultValue: ""
                    }
                }
            },
            subNamespaces: [
                {
                    namespaceType: "child",
                    jsonTag: "subproperties",
                    subNamespaces: [
                        {
                            namespaceType: "extensionPoint",
                            jsonTag: "collection",
                            componentArchetype: {
                                namespaceType: "component",
                                jsonTag: "someObject",
                                namespaceProperties: {
                                    userImmutable: {
                                        key: {
                                            defaultValue: ''
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }, // properties
        {
            namespaceType: "extensionPoint",
            jsonTag: "contacts",
            componentArchetype: {
                namespaceType: "component",
                jsonTag: "contact",
                namespaceProperties: {
                    userImmutable: {
                        key: {
                            defaultValue: ''
                        }
                    },
                    userMutable: {
                        firstName: {
                            defaultValue: ''
                        },
                        lastName: {
                            defaultValue: ''
                        }
                    }
                },
                subNamespaces: [
                    {
                        namespaceType: "extensionPoint",
                        jsonTag: "emails",
                        componentArchetype: {
                            namespaceType: "component",
                            jsonTag: "email",
                            namespaceProperties: {
                                userImmutable: {
                                    key: {
                                        defaultValue: ''
                                    }
                                }
                            }
                        }
                    },
                    {
                        namespaceType: "extensionPoint",
                        jsonTag: "addresses",
                        componentArchetype: {
                            namespaceType: "component",
                            jsonTag: "address",
                            namespaceProperties: {
                                userImmutable: {
                                    key: {
                                        defaultValue: ''
                                    }
                                }
                            },
                            subNamespaces: [
                                {
                                    namespaceType: "extensionPoint",
                                    jsonTag: "notes",
                                    componentArchetype: {
                                        namespaceType: "component",
                                        jsonTag: "note",
                                        namespaceProperties: {
                                            userImmutable: {
                                                key: {
                                                    defaultValue: ''
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        namespaceType: "extensionPoint",
                        jsonTag: "phoneNumbers",
                        componentArchetype: {
                            namespaceType: "component",
                            jsonTag: "phoneNumber",
                            namespaceProperties: {
                                userImmutable: {
                                    key: {
                                        defaultValue: ''
                                    }
                                },
                                userMutable: {
                                    areaCode: {
                                        defaultValue: ''
                                    },
                                    number: {
                                        defaultValue: ''
                                    }
                                }
                            },
                            subNamespaces: [
                                {
                                    namespaceType: "child",
                                    jsonTag: "notes",
                                    namespaceProperties: {
                                        userMutable: {
                                            text: {
                                                defaultValue: ''
                                            }
                                        }
                                    }
                                }
                            ]
                                
                        }
                    }
                ]
            } // contact
        } // contacts
    ]
};

var createModel = module.exports.createModel = function() {
    try {
        var model = new onm.Model(modelDeclaration);
        return model;
    } catch (exception_) {
        throw new Error("onm test data fixture failure in 'createModel': " + exception_.message);
    }
};

var createStore = module.exports.createStore = function() {
    try {
        var store = new onm.Store(createModel());
        return store;
    } catch (exception_) {
        throw new Error("onm test data fixture failure in 'createStore': " + exception_.message);
    }
};

var resetLuid = module.exports.resetLuid = function() {
    LUID = 1;
};


