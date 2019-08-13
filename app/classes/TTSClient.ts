import axios from 'axios';
import * as fs from 'fs';
import * as util from 'util';

/**
 * Manages any information and requests needed to communicate with Google Cloud
 */

export interface ITTSClient {
    buildVoicesDict(): Promise<any>;
    makeRequest(
        text: string,
        lang: string,
        voice: string,
        path: string,
        filename: string
    ): Promise<boolean>;
}
export default class TTSClient implements ITTSClient {
    private key: string;
    /**
     * @constructor
     * @param {string} key - the API key to authenticate with Google Cloud
     */
    constructor(key) {
        this.key = key;
    }

    /**
     * Builds a dictonary containing every voice for each language code
     * @returns {Promise}
     */
    buildVoicesDict = () => {
        return new Promise(async (res, rej) => {
            const dict = await axios
                .get(
                    `https://texttospeech.googleapis.com/v1/voices?key=${
                        this.key
                    }`
                )
                .then(res => {
                    const voices = res.data.voices;
                    const dict = {};
                    voices.forEach(voice => {
                        if (voice.name.includes('Wavenet')) {
                            const langCode = voice.languageCodes[0]; // enEN, enGB, frCA, etc
                            const name = voice.name;
                            const gender = voice.ssmlGender.charAt(0);
                            if (dict.hasOwnProperty(langCode)) {
                                dict[langCode].push(`${name} (${gender})`); // update existing langCode
                            } else {
                                dict[langCode] = [`${name} (${gender})`]; // add new langCode to dict
                            }
                        }
                    });
                    return dict;
                })
                .catch(err => {
                    console.log(err);
                    return undefined;
                });
            dict ? res(dict) : rej('See previous error');
        });
    };

    /**
     * Makes a request to Google Cloud to generate the audio file
     * @param {string} text - the text to convert to speech
     * @param {string} lang - the language and accent to use (enEN, enGB)
     * @param {string} voice - the voice to use for the spoken text
     * @param {string} path - the path to save the file to
     * @param {string} filename - the name of the generated audio file
     * @returns {boolean} whether or not the request was a success
     */
    makeRequest = async (text, lang, voice, path, filename) => {
        voice = voice.substr(0, voice.length - 4);
        const req = {
            input: {
                text: `${text}`
            },
            voice: {
                languageCode: `${lang}`,
                // ssmlGender: 'MALE',
                name: `${voice}`
            },
            audioConfig: {
                audioEncoding: 'MP3'
            }
        };
        console.log('req', req);
        const isSuccess = await axios
            .post(
                `https://texttospeech.googleapis.com/v1/text:synthesize?key=${
                    this.key
                }`,
                req
            )
            .then(res => {
                console.log('res ', res);
                const writeFile = util.promisify(fs.writeFile);
                writeFile(
                    `${path}\\${filename}.mp3`,
                    res.data.audioContent,
                    'base64'
                );
                return true;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        return isSuccess;
    };
}
