const ImagePicker = jest.genMockFromModule('react-native-image-crop-picker');


const openPicker = jest
  .fn(()=> Promise.resolve({
    path:"path://test_path"
  }))
  .mockRejectedValueOnce("error")


ImagePicker.openPicker = openPicker;
module.exports = ImagePicker;