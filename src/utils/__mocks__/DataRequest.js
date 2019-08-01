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
        avatar_url:"test_url",
      }})))
  .mockRejectedValueOnce("error")

const commentHighlight = jest
  .fn(()=>new Promise((resolve, reject) => resolve(1)))
  .mockImplementationOnce((params) => {
    return new Promise((resolve, reject) => {
      const error_info = 'error'
      reject(error_info)
    })
  })
const sendHighlightImg = jest
  .fn(()=> Promise.resolve({ data: "tmpUrl://100.100.100.100" }))
  .mockImplementationOnce((params) => Promise.reject("error"))

const sendNewHighlight = jest
  .fn(()=> Promise.resolve("success"))
  .mockRejectedValueOnce("error")
  .mockResolvedValueOnce("success")
  .mockRejectedValueOnce("error")
  .mockResolvedValueOnce("success")
  .mockRejectedValueOnce("error")


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
const recommendData =JSON.parse("[{\"course_id\":\"AM108\",\"course_name\":\"消费者行为学\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"安泰经济与管理学院\"},{\"course_id\":\"MR300\",\"course_name\":\"集成电路工艺技术基础（A类）\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"IS208\",\"course_name\":\"数字系统设计\",\"course_hours\":51,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"EI312\",\"course_name\":\"工程实践与科技创新Ⅲ-C\",\"course_hours\":34,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"PM329\",\"course_name\":\"药物化学\",\"course_hours\":48,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"药学院\"},{\"course_id\":\"PL326\",\"course_name\":\"专业实习（植物科学与技术）\",\"course_hours\":64,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"农业与生物学院\"},{\"course_id\":\"JA213\",\"course_name\":\"日语视听说（M类）（1）\",\"course_hours\":48,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"外国语学院\"},{\"course_id\":\"PM342\",\"course_name\":\"药物合成反应\",\"course_hours\":34,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"药学院\"},{\"course_id\":\"CH214\",\"course_name\":\"诗词曲欣赏与写作\",\"course_hours\":48,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"人文学院\"},{\"course_id\":\"JC308\",\"course_name\":\"传播学概论\",\"course_hours\":34,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"媒体与传播学院\"},{\"course_id\":\"MI338\",\"course_name\":\"仪器总线与虚拟仪器课程设计\",\"course_hours\":32,\"course_credits\":1,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"PU401\",\"course_name\":\"中国政府与公务员制度\",\"course_hours\":48,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"国际与公共事务学院\"},{\"course_id\":\"HI938\",\"course_name\":\"欧洲中世纪城市研究\",\"course_hours\":2,\"course_credits\":2,\"general\":true,\"general_type\":\"人文学科\",\"course_deptname\":\"教务处\"},{\"course_id\":\"CL228\",\"course_name\":\"俄苏文学经典\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"人文学院\"},{\"course_id\":\"AV317\",\"course_name\":\"航空航天实验II\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"航空航天学院\"},{\"course_id\":\"PH125\",\"course_name\":\"纳米科技导论\",\"course_hours\":16,\"course_credits\":1,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"物理与天文学院\"},{\"course_id\":\"MA191\",\"course_name\":\"数学分析（荣誉）（2）\",\"course_hours\":96,\"course_credits\":6,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"数学科学学院\"},{\"course_id\":\"BI902\",\"course_name\":\"生命伦理学\",\"course_hours\":32,\"course_credits\":2,\"general\":true,\"general_type\":\"人文学科\",\"course_deptname\":\"生命科学技术学院\"},{\"course_id\":\"PJ120\",\"course_name\":\" 肿瘤转移新靶点的机制及治疗方法的研究\",\"course_hours\":30,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"国际合作与交流处\"},{\"course_id\":\"ME001\",\"course_name\":\"工程图学（1）\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"机械与动力工程学院\"},{\"course_id\":\"EE391\",\"course_name\":\"信息光子学\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"MU302\",\"course_name\":\"作曲技术理论（1）\",\"course_hours\":48,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"人文学院\"},{\"course_id\":\"ID201\",\"course_name\":\"模型制作\",\"course_hours\":51,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"设计学院\"},{\"course_id\":\"EV415\",\"course_name\":\"碳资源循环学\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"环境科学与工程学院\"},{\"course_id\":\"MA187\",\"course_name\":\"概率与统计学\",\"course_hours\":48,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"安泰经济与管理学院\"},{\"course_id\":\"CI119\",\"course_name\":\"汉字与文化\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"人文学院\"},{\"course_id\":\"PJ128\",\"course_name\":\"药用植物代谢调控与工程\",\"course_hours\":30,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"国际合作与交流处\"},{\"course_id\":\"CI366\",\"course_name\":\"经贸口语（1）\",\"course_hours\":34,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"人文学院\"},{\"course_id\":\"FR215\",\"course_name\":\"综合实践项目\",\"course_hours\":64,\"course_credits\":4,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"巴黎高科卓越工程师学院\"},{\"course_id\":\"AR218\",\"course_name\":\"建筑构造（2）\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"船舶海洋与建筑工程学院\"}]")
const getRecommend = jest
  .fn((user_id,num)=>Promise.resolve({ data:recommendData }))
  .mockResolvedValueOnce(recommendData)
  .mockRejectedValueOnce("error")

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
dr.getRecommend = getRecommend
module.exports = dr