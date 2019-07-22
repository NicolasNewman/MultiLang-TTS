import * as axios from 'axios';
import * as fs from 'fs';
import * as util from 'util';

export default class TTSClient {
    constructor(key) {
        this.key = key;
    }

    setLang(lang) {
        console.log('Set lang!');
        this.lang = lang;
        console.log(this);
    }

    setName(name) {
        this.name = name;
    }

    makeRequest = text => {
        console.log(this);
        axios
            .post(
                `https://texttospeech.googleapis.com/v1/text:synthesize?key=${
                    this.key
                }`,
                {
                    input: {
                        text: `${text}`
                    },
                    voice: {
                        languageCode: `${this.lang}`,
                        ssmlGender: 'MALE',
                        name: `${this.name}`
                    },
                    audioConfig: {
                        audioEncoding: 'MP3'
                    }
                }
            )
            .then(res => {
                const writeFile = util.promisify(fs.writeFile);
                writeFile('output.mp3', res.data.audioContent, 'base64');
            })
            .catch(err => {
                console.log(err);
            });
    };
}
