import * as dotenv from 'dotenv';
import * as naeural from '@naeural/jsclient';

dotenv.config();

export const makeConfig = (fleet, initiator = 'js-sdk', stateManager = naeural.REDIS_STATE_MANAGER) => {
    return  {
        initiator: initiator,
        mqttOptions: {
            url: `${process.env.MQTT_PROTOCOL}://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD,
        },
        blockchain: {
            debug: false,
            key: '',
            encrypt: false,
            secure: true,
        },
        stateManager: stateManager,
        redis: {
            host: 'localhost',
        },
        threads: {
            heartbeats: 1,
            notifications: 1,
            payloads: 1,
        },
        fleet: fleet,
        loglevel: 'info',
    };
};
