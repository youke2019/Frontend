import Global from '../src/Global'
import {loadData,saveData} from '../src/utils/LocalStorage';

test("read and store data from local storage", () =>{
  loadData({
    key:"test"
  }).then(rsp =>{
    console.log(rsp)
  }).catch(err => {
    console.log(err);
  })
  saveData({
    key:"test",
    data:{
      data: "this is a test data",
    }
  }).catch(err => console.log(err))
})