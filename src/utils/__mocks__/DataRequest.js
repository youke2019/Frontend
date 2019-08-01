const dr = jest.genMockFromModule('../DataRequest.js')
const getCourseById = jest
  .fn(() => new Promise((resolve, reject) => {resolve(null)}))
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const course_info = JSON.parse('{"course_id":"SE101","course_name":"计算机系统基础（1）","course_hours":80,"course_credits":5.0,"general":false,"general_type":"","course_deptname":"电子信息与电气工程学院","classes":[{"classname":"2018-2019-1-SE101-392689","course_id":"SE101","teacher_id":"11145","teacher_name":"臧斌宇","teachers":"11145/臧斌宇/教授[电子信息与电气工程学院];10886/陈榕/副教授[电子信息与电气工程学院]","course_participants":48,"class_note":"","year":2018,"semester":1,"classSegments":[{"class_sec_id":9868,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9869,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9870,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9871,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":20170,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":7,"end_sec":8,"week":2,"odd_or_even":"b"},{"class_sec_id":20171,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":7,"end_sec":8,"week":2,"odd_or_even":"b"},{"class_sec_id":20172,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":3,"end_sec":4,"week":5,"odd_or_even":"b"},{"class_sec_id":20173,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":3,"end_sec":4,"week":5,"odd_or_even":"b"}]}]}')
      resolve(course_info)
    })
  })
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })

const getAllHighlight = jest
  .fn(() => new Promise((resolve, reject) => {resolve(null)}))
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const resp = {
        data: JSON.parse('[{"video_id":1,"user_id":"46420","post_time":"177IG770","post_text":"UC4GRrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr662312XE4H5MBDU923644WLL3QE563EEQ7QBBT7","video_url":"58850","video_type":"W","image_url":"3","isbanned":false,"video_praise_point":1,"current_user_praise":true,"courseMomentCommentList":[{"video_comment_id":2,"video_id":1,"user_id":"14963","video_comment_content":"07335","video_comment_time":"69660","isbanned":true},{"video_comment_id":3,"video_id":1,"user_id":"14963","video_comment_content":"16292","video_comment_time":"71693","isbanned":true},{"video_comment_id":6,"video_id":1,"user_id":"34992","video_comment_content":"74875","video_comment_time":"95459","isbanned":true},{"video_comment_id":13,"video_id":1,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_comment_content":"还是是你的","video_comment_time":"2019-07-20 23:22:26","isbanned":false},{"video_comment_id":14,"video_id":1,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_comment_content":"好的好的姐姐的","video_comment_time":"2019-07-20 23:38:58","isbanned":false},{"video_comment_id":15,"video_id":1,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_comment_content":"防脱发头发","video_comment_time":"2019-07-20 23:40:46","isbanned":false},{"video_comment_id":16,"video_id":1,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_comment_content":"刚才填充图册填充图册太吓人饭堂吃同学人吃肉馅肉馅长途车如此","video_comment_time":"2019-07-20 23:42:05","isbanned":false},{"video_comment_id":18,"video_id":1,"user_id":"1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120","video_comment_content":"你是真的牛逼","video_comment_time":"2019-07-22 11:32:41","isbanned":false},{"video_comment_id":20,"video_id":1,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_comment_content":"？","video_comment_time":"2019-07-22 16:54:50","isbanned":false}],"courseMomentPraiseList":[{"video_praise_id":11,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":12,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":13,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":14,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":15,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":16,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":17,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":18,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":19,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":20,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":21,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":22,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":23,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":24,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":25,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1},{"video_praise_id":26,"user_id":"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A","video_id":1}]}]')
      }
      resolve(resp)
    })
  })
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })

const unPraiseHighlight = jest
  .fn(()=>new Promise((resolve, reject) => resolve('1')))
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const praiseHighlight = jest
  .fn(()=>new Promise((resolve, reject) => resolve('1')))
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const getUserById = jest
  .fn(()=>new Promise((resolve, reject) =>
    resolve({
      data: {
        nickname: '啦啦啦啦',
        avatarUrl:"jhfeuishfuhsehfouef",
      }})))
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const commentHighlight = jest
  .fn(()=>new Promise((resolve, reject) => resolve(1)))
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const sendHighlightImg = jest
  .fn(()=> new Promise((resolve,reject)=> resolve({
    data: "tmpUrl://100.100.100.100"
  })))
  .mockImplementationOnce((params) => {
    if(params.source > 0){
      return new Promise((resolve,reject)=> resolve({
        data: "tmpUrl://100.100.100.100"
      }))}
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const sendNewHighlight = jest
  .fn(()=> new Promise((resolve,reject)=> resolve("success")))
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const getCommentById = jest
  .fn(()=> new Promise((resolve,reject)=>{
  const data = JSON.parse("[{\"course_comment_id\":14,\"course_id\":\"BM176\",\"course_comment_time\":\"2019-07-18 23:07:37\",\"course_comment_content\":\"我觉得这门课很垃圾\",\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"isbanned\":false,\"course_comment_praise_point\":1,\"current_user_praise\":true,\"courseCommentReportList\":[],\"courseCommentReplyList\":[{\"course_comment_reply_id\":1,\"course_comment_reply_content\":\"服服服\",\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"course_comment_id\":14},{\"course_comment_reply_id\":2,\"course_comment_reply_content\":\"八九十年代不\",\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"course_comment_id\":14},{\"course_comment_reply_id\":3,\"course_comment_reply_content\":\"同意呀\",\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"course_comment_id\":14}]}]")
  resolve({ data: data })
})).mockImplementationOnce((params) => {
  return new Promise((resolve, reject) => {
    const error_info = 'error'
    reject(error_info)
  })
})
const getEvaluationById = jest
  .fn(()=> new Promise((resolve,reject)=>{
    const data = "[{\"evaluate_id\":1442,\"evaluate_time\":\"2019-07-31 18:24:46\",\"user_id\":\"01231\",\"course_id\":\"SE101\",\"evaluate_content\":{\"course_id\":\"SE101\",\"evaluate_id\":1442,\"给分情况\":\"给分高\",\"user_id\":\"01231\",\"evaluate_point\":10},\"evaluate_point\":10,\"evaluate_praise_point\":0,\"current_user_praise\":false,\"courseEvaluationPraiseList\":[]}]"
    resolve({ data: data })
  })).mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const getQAbyId = jest
  .fn(()=> new Promise((resolve,reject)=>{
    const data = "[{\"question_id\":39,\"user_id\":\"01231\",\"course_id\":\"SE101\",\"question_content\":\"上课有趣吗\",\"question_time\":\"2019-07-23 09:37:38\",\"question_isbanned\":false,\"question_praise_point\":0,\"courseAnswerList\":[],\"courseQuestionPraiseList\":[],\"current_user_praise\":false}]"
    resolve({ data: data })
  })).mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const praiseComment = jest
  .fn((user_id,course_comment_id)=>new Promise((resolve, reject) => resolve('1')))
  .mockImplementationOnce((user_id,course_comment_id) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const unPraiseComment = jest
  .fn((user_id,course_comment_id)=>new Promise((resolve, reject) => resolve('1')))
  .mockImplementationOnce((user_id,course_comment_id) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })

dr.commentHighlight = commentHighlight
dr.getCourseById = getCourseById
dr.getAllHighlight = getAllHighlight
dr.unPraiseHighlight = unPraiseHighlight
dr.praiseHighlight = praiseHighlight
dr.getUserById = getUserById
dr.sendHighlightImg = sendHighlightImg
dr.sendNewHighlight = sendNewHighlight
dr.getCommentById = getCommentById
dr.getEvaluationById = getEvaluationById
dr.getQAbyId = getQAbyId
dr.praiseComment = praiseComment
dr.unPraiseComment = unPraiseComment
dr.sendCommentReply = praiseHighlight
module.exports = dr