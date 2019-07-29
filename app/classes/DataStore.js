import * as Store from 'electron-store';

/**
 * Wrapper for electron-store\'s Store object
 */
export default class DataStore {
    /**
     * Creates the data schema and initializes it
     * @constructor
     */
    constructor() {
        this.schema = {
            key: {
                type: 'string',
                description:
                    'The API key used to authenticate with Google cloud'
            },
            defaultPath: {
                type: 'string',
                description:
                    'The default path to open to when the program launches',
                default: 'C:\\Users\\Nicolas Newman\\Documents'
            },
            uiTheme: {
                type: 'string',
                enum: ['light', 'dark'],
                default: 'light',
                description: 'The targeted theme for the UI'
            }
        };
        this.store = new Store({ schema: this.schema });
    }

    /**
     * Updates the value of the given key in the Store
     * @param {string} key - the key the data is stored under
     * @param {*} value - the new value for the data
     */
    set = (key, value) => {
        if (this.schema[key]) {
            console.log('contains key ', key);
            this.store.set(key, value);
        }
    };

    /**
     * @param {string} key - the key the data is stored under
     * @returns {*} the information stored at the given key
     */
    get = key => {
        return this.schema[key] ? this.store.get(key) : undefined;
    };
}
