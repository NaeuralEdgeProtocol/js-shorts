import { makeConfig } from '../common/configure.js';
import {
    Naeural,
    NAEURAL_CLIENT_BOOTED,
    NAEURAL_ENGINE_REGISTERED,
    NAEURAL_RECEIVED_HEARTBEAT_FROM_ADDRESS,
    NaeuralBC
} from '@naeural/jsclient';
import {readPemFile} from '../common/load.identity.js';

const nodeToFollow = '0xai_Amfnbt3N-qg2-qGtywZIPQBTVlAnoADVRmSAsdDhlQ-6';
const config = makeConfig([]);

const naeuralClient = new Naeural(config);
naeuralClient.loadIdentity(NaeuralBC.loadFromPem(readPemFile('naeural.pem')));
naeuralClient.boot();

setTimeout(() => {
    naeuralClient.registerEdgeNode(nodeToFollow);
}, 10000);

naeuralClient.on(NAEURAL_ENGINE_REGISTERED, (data) => {
    console.log(data);
});

naeuralClient.on(NAEURAL_CLIENT_BOOTED, (data) => {
    console.log('BOOTED: ', data);
});

naeuralClient.on(NAEURAL_RECEIVED_HEARTBEAT_FROM_ADDRESS, (data) => {
    console.log('ON HB RECEIVED', data);
});
