import { makeConfig } from '../common/configure.js';
import {HEARTBEATS_STREAM, Naeural, NaeuralBC} from '@naeural/jsclient';
import {readPemFile} from '../common/load.identity.js';


const config = makeConfig(['0xai_Amfnbt3N-qg2-qGtywZIPQBTVlAnoADVRmSAsdDhlQ-6']);

const naeuralClient = new Naeural(config);
naeuralClient.loadIdentity(NaeuralBC.loadFromPem(readPemFile('naeural.pem')));
naeuralClient.boot();

console.log('MY ADDRESS: ', naeuralClient.getBlockChainAddress());

naeuralClient.getStream(HEARTBEATS_STREAM).subscribe((message) => {
    const nodeName = message.data.DATA.node.EE_ID;

    console.log(`Got heartbeat from ${nodeName}`);
});

