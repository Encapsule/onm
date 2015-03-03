RISP = require('../lib/core/risp/risp');

count = 0;
keepOnTrucking = true


while (keepOnTrucking) {

    var irut = RISP.generate( { format: 'irut' } ).result.value;

    if ((count % 1000000) === 0) {
        console.log(count + " " + irut + " ... still looking");
    }

    if (irut.indexOf('onm') === 0) {
        keepOnTrucking = false;
    }

    count++

}

console.log("'" + irut + "' # <= FOUND IRUT beginning in 'onm' in " + count + " attempts.");

