const ImagePicker = jest.genMockFromModule('react-native-image-crop-picker');

function openPicker(options){
    const promise = new Promise( function (resolve,reject) {
            resolve({
                "path": "http://47.103.30.166:8000/images/b8164f0a7f8c486ea1b43910076543e6.jpg"
            })
        }
    )
    return promise;
}


ImagePicker.openPicker = openPicker;
module.exports = ImagePicker;