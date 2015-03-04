RISP = require('../lib/core/risp/risp');

var count = 32;
while (count-- > 0) {
    var irut = RISP.generate( { format: 'irut' } ).result.value;
    console.log("'" + irut + "'");
}



