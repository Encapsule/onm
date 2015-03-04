# test-use-case-cids-setCID-class1-coffee
#
# This module is compiled to JavaScript at build time and tested as JavaScript


dirRequires = require './dir-requires'
CIDS = dirRequires.CIDS

chai = require 'chai'
assert = chai.assert


# TEST CLASS 2
# Demonstrates simple CIDS prototcol for identifying a newly-constructed
# CoffeeScript 'class' instance with a CID given @ (aka this), and CNAME.


class TestClass2
    constructor: (in_) ->
        cidsResponse = CIDS.setCID { ref: @, cname: 'RAS' }
        console.log JSON.stringify cidsResponse

module.exports = TestClass2
