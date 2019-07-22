import * as axios from 'axios';
import * as fs from 'fs';
import * as util from 'util';

export default class TTSClient {
    constructor(key) {
        this.key = key;
        this.voices = undefined;
        this.startedBuild = false;
    }

    setLang(lang) {
        console.log('Set lang!');
        this.lang = lang;
        console.log(this);
    }

    setName(name) {
        this.name = name;
    }

    buildVoicesDict = async () => {
        const dict = await axios
            .get(
                `https://texttospeech.googleapis.com/v1/voices?key=${this.key}`
            )
            .then(res => {
                this.startedBuild = true;
                const voices = res.data.voices;
                const dict = {};
                voices.forEach(voice => {
                    if (voice.name.includes('Wavenet')) {
                        const langCode = voice.languageCodes[0];
                        const name = voice.name;
                        if (dict.hasOwnProperty(langCode)) {
                            dict[langCode].push(name);
                        } else {
                            dict[langCode] = [name];
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
        this.voices = dict;
        console.log(dict);
    };

    getVoices = () => {
        if (this.voices) {
            return this.voices;
        } else if (!this.buildVoicesDict) {
            this.buildVoicesDict();
            return undefined;
        } else {
            return undefined;
        }
        // return new Promise(async (res, rej) => {
        //     if (this.voices) {
        //         res(this.voices);
        //     } else if (!this.startedBuild) {
        //         await this.buildVoicesDict();
        //         res(this.voices);
        //     } else {
        //         rej(
        //             'The build has already started. Please wait before trying again'
        //         );
        //     }
        // });
    };

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
