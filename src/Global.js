import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 60 * 60 * 24, //1 day
    enableCache: true,
    sync: {}
})

global.storage = storage
global.baseUrl = 'http://192.168.43.241:8080'