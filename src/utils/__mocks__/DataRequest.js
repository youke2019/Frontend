import axios from 'axios'

const dr = jest.genMockFromModule('../DataRequest.js')
function getCourseById (params){
  return new Promise((resolve,reject)=>{
    const course_info = JSON.parse("{\"course_id\":\"SE101\",\"course_name\":\"计算机系统基础（1）\",\"course_hours\":80,\"course_credits\":5.0,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\",\"classes\":[{\"classname\":\"2018-2019-1-SE101-392689\",\"course_id\":\"SE101\",\"teacher_id\":\"11145\",\"teacher_name\":\"臧斌宇\",\"teachers\":\"11145/臧斌宇/教授[电子信息与电气工程学院];10886/陈榕/副教授[电子信息与电气工程学院]\",\"course_participants\":48,\"class_note\":\"\",\"year\":2018,\"semester\":1,\"classSegments\":[{\"class_sec_id\":9868,\"classname\":\"2018-2019-1-SE101-392689\",\"classroom\":\"东上院102\",\"begin_week\":null,\"end_week\":null,\"begin_sec\":null,\"end_sec\":null,\"week\":null,\"odd_or_even\":\"b\"},{\"class_sec_id\":9869,\"classname\":\"2018-2019-1-SE101-392689\",\"classroom\":\"东上院102\",\"begin_week\":null,\"end_week\":null,\"begin_sec\":null,\"end_sec\":null,\"week\":null,\"odd_or_even\":\"b\"},{\"class_sec_id\":9870,\"classname\":\"2018-2019-1-SE101-392689\",\"classroom\":\"东上院102\",\"begin_week\":null,\"end_week\":null,\"begin_sec\":null,\"end_sec\":null,\"week\":null,\"odd_or_even\":\"b\"},{\"class_sec_id\":9871,\"classname\":\"2018-2019-1-SE101-392689\",\"classroom\":\"东上院102\",\"begin_week\":null,\"end_week\":null,\"begin_sec\":null,\"end_sec\":null,\"week\":null,\"odd_or_even\":\"b\"},{\"class_sec_id\":20170,\"classname\":\"2018-2019-1-SE101-392689\",\"classroom\":\"东上院102\",\"begin_week\":1,\"end_week\":16,\"begin_sec\":7,\"end_sec\":8,\"week\":2,\"odd_or_even\":\"b\"},{\"class_sec_id\":20171,\"classname\":\"2018-2019-1-SE101-392689\",\"classroom\":\"东上院102\",\"begin_week\":1,\"end_week\":16,\"begin_sec\":7,\"end_sec\":8,\"week\":2,\"odd_or_even\":\"b\"},{\"class_sec_id\":20172,\"classname\":\"2018-2019-1-SE101-392689\",\"classroom\":\"东上院102\",\"begin_week\":1,\"end_week\":16,\"begin_sec\":3,\"end_sec\":4,\"week\":5,\"odd_or_even\":\"b\"},{\"class_sec_id\":20173,\"classname\":\"2018-2019-1-SE101-392689\",\"classroom\":\"东上院102\",\"begin_week\":1,\"end_week\":16,\"begin_sec\":3,\"end_sec\":4,\"week\":5,\"odd_or_even\":\"b\"}]}]}")
    return resolve(course_info);
  })
}
dr.getCourseById = getCourseById;

module.exports = dr