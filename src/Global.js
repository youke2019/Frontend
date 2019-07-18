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
global.baseUrl = 'http://192.168.42.148:8080'
// global.baseUrl = 'http://47.103.30.166:8000'