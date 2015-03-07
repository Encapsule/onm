RISP = require('../lib/risp');

var count = 32;
while (count-- > 0) {
    var rispResponse = RISP.generate({ format: 'irut' });
    if (rispResponse.error) {
        console.warn(rispResponse.error);
    } else {
        console.log("'" + JSON.stringify(rispResponse.result) + "'");
    }
}



