import * as axios from 'axios';
import * as fs from 'fs';
import * as util from 'util';

export default class TTSClient {
    constructor(key) {
        this.key = key;
        this.voices = undefined;
        this.startedBuild = false;
    }

    buildVoicesDict = () => {
        return new Promise(async (res, rej) => {
            const dict = await axios
                .get(
                    `https://texttospeech.googleapis.com/v1/voices?key=${
                        this.key
                    }`
                )
                .then(res => {
                    this.startedBuild = true;
                    const voices = res.data.voices;
                    const dict = {};
                    voices.forEach(voice => {
                        if (voice.name.includes('Wavenet')) {
                            const langCode = voice.languageCodes[0];
                            const name = voice.name;
                            const gender = voice.ssmlGender.charAt(0);
                            console.log(voice);
                            if (dict.hasOwnProperty(langCode)) {
                                dict[langCode].push(`${name} (${gender})`);
                            } else {
                                dict[langCode] = [`${name} (${gender})`];
                            }
                            // console.log(voice);
                        }
                    });
                    // this.voices = dict;
                    return dict;
                })
                .catch(err => {
                    console.log(err);
                    return undefined;
                });
            dict ? res(dict) : rej('See previous error');
        });
    };

    makeRequest = (text, lang, voice) => {
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
                        languageCode: `${lang}`,
                        // ssmlGender: 'MALE',
                        name: `${name}`
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
