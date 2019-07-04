import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 60 * 5, //5 minutes
    enableCache: true,
    sync: {}
});

global.storage = storage;