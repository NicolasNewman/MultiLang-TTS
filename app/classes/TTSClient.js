import * as axios from 'axios';
import * as fs from 'fs';
import * as util from 'util';

/**
 * Manages any information and requests needed to communicate with Google Cloud
 */
export default class TTSClient {
    /**
     * @constructor
     * @param {string} key - the API key to authenticate with Google Cloud
     */
    constructor(key) {
        this.key = key;
        this.voices = undefined;
        this.startedBuild = false;
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
                    this.startedBuild = true;
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
        console.log(this);
        const isSuccess = await axios
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
