import { makeConfig } from '../common/configure.js';
import {
    Naeural, NAEURAL_SUPERVISOR_PAYLOAD,
    NaeuralBC
} from '@naeural/jsclient';
import {readPemFile} from '../common/load.identity.js';

const config = makeConfig([]);

const naeuralClient = new Naeural(config);
naeuralClient.loadIdentity(NaeuralBC.loadFromPem(readPemFile('naeural.pem')));
naeuralClient.boot();

naeuralClient.on(NAEURAL_SUPERVISOR_PAYLOAD, (err, data, context) => {
    const network = Object.keys(data.CURRENT_NETWORK).map((nodeName) => {
        return {
            node: nodeName,
            address: data.CURRENT_NETWORK[nodeName].address,
            uptime: data.CURRENT_NETWORK[nodeName].uptime,
        }
    });

    console.log(network);
});

