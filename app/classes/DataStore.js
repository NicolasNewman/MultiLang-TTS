import * as Store from 'electron-store';

export default class DataStore {
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
            uiMode: {
                type: 'string',
                enum: ['light', 'dark'],
                default: 'light',
                description: 'The targeted theme for the UI'
            }
        };
        this.store = new Store({ schema: this.schema });
    }

    set = (key, value) => {
        if (this.schema[key]) {
            console.log('contains key ', key);
            this.store.set(key, value);
        }
    };

    get = key => {
        return this.schema[key] ? this.store.get(key) : undefined;
    };
}
