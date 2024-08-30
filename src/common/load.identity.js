import fs from 'fs';
import {fileURLToPath} from 'url';
import * as path from 'path';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readPemFile = (fileName) => {
    try {
        return fs.readFileSync(path.join(__dirname, '../../', fileName), 'utf8');
    } catch (err) {
        console.log(err);

        return null;
    }
}
