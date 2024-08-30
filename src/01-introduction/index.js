import { makeConfig } from '../common/configure.js';
import {HEARTBEATS_STREAM, Naeural} from '@naeural/jsclient';


const config = makeConfig(['0xai_Amfnbt3N-qg2-qGtywZIPQBTVlAnoADVRmSAsdDhlQ-6']);

const naeuralClient = new Naeural(config);
naeuralClient.boot();

naeuralClient.getStream(HEARTBEATS_STREAM).subscribe((message) => {
    const nodeName = message.data.DATA.node.EE_ID;

    console.log(`Got heartbeat from ${nodeName}`);
});

