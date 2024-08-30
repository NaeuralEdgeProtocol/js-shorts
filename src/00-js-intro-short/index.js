import {makeConfig} from '../common/configure.js';
import {
    HEARTBEATS_STREAM,
    Naeural,
    NAEURAL_RECEIVED_HEARTBEAT_FROM_ADDRESS,
    NAEURAL_SUPERVISOR_PAYLOAD,
    NaeuralBC
} from '@naeural/jsclient';
import {readPemFile} from '../common/load.identity.js';

const node = '0xai_AvtHjJeFqsuIJ1_oVCERB0lE53VA5qVROS8lMV42gBfP';
const config = makeConfig([node]);

const naeuralClient = new Naeural(config);
naeuralClient.loadIdentity(NaeuralBC.loadFromPem(readPemFile('naeural.pem')));
naeuralClient.boot();

naeuralClient.on(NAEURAL_SUPERVISOR_PAYLOAD, (err, data, context) => {
    if (!!data.CURRENT_NETWORK) {
        const network = Object.keys(data.CURRENT_NETWORK).map(
            (nodeName) => {
                return {
                    name: nodeName,
                    address: data.CURRENT_NETWORK[nodeName].address,
                    uptime: data.CURRENT_NETWORK[nodeName].uptime,
                }
            }
        );

        console.log(network);
    }
});

naeuralClient.on(NAEURAL_RECEIVED_HEARTBEAT_FROM_ADDRESS, (data) => {
    console.log('Got Heartbeat from: ', data);
});

naeuralClient.getStream(HEARTBEATS_STREAM).subscribe((message) => {
    const node = message.data.DATA.node.EE_ID;

    console.log(`Info plucked from the heartbeat information: ${node}`);
});
