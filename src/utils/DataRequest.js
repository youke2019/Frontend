import axios from 'axios'

export const sendNewHighlight = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/courses/moments/post',
    data: data
  })
}
export const getAllHighlight = (user_id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/moments/findAll',
    params: {
      user_id: user_id
    }
  })
}
export const getNumberHighlight = (base,size,user_id) =>{
  return axios({
    method:'get',
    url: baseUrl + "/courses/moments/find",
    params: {
      base: base,
      size: size,
      user_id: user_id,
    }
  })
}
export const praiseHighlight = (user_id, video_id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/moments/praise',
    params: {
      video_id: video_id,
      user_id: user_id
    }
  })
}
export const unPraiseHighlight = (user_id, video_id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/moments/unpraise',
    params: {
      video_id: video_id,
      user_id: user_id
    }
  })
}
export const commentHighlight = (user_id, video_id, content) => {
  return axios({
    method: 'post',
    url: baseUrl + '/courses/moments/comment',
    data: {
      user_id: user_id,
      video_id: video_id,
      video_comment_content: content
    }
  })
}
export const sendHighlightImg = (file) => {
  let formData = new FormData()
  formData.append('file', file)
  return axios({
    url: "http://47.103.30.166:8080" + '/courses/moments/upload',
    method: 'POST',
    withCredential: true,
    data: formData
  })
}
export const sendAvatarImg = (file) => {
  let formData = new FormData()
  formData.append('file', file)
  return axios({
    url: 'http://47.103.30.166:8080' + '/users/avatar/upload',
    method: 'POST',
    withCredential: true,
    data: formData
  })
}

export const getUserById = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/users/specific',
    params: {
      id: id
    }
  })
}
export const getCourseById = (params) => {
  return axios({
    method: 'get',
    params: params,
    url: baseUrl + '/courses/specific'
  })
}

export const sendCommentReply = (course_comment_id, user_id, course_comment_reply_content) => {
  return axios({
    method: 'post',
    url: baseUrl + '/courses/comments/reply',
    data: {
      course_comment_id: course_comment_id,
      course_comment_reply_content: course_comment_reply_content,
      user_id: user_id
    }
  })
}
export const getCommentById = ({course_id, user_id}) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/comments/find',
    params: {
      course_id: course_id,
      user_id: user_id
    }
  })
}
export const getEvaluationById = ({course_id, user_id}) => {
  return axios.get(baseUrl + '/courses/evaluates/find', {
    params: {
      course_id: course_id
    }
  })
}
export const getQAbyId = ({course_id, user_id}) => {
  return axios.get(baseUrl + '/courses/questions/find', {
    params: {
      course_id: course_id,
      user_id: user_id
    }
  })
}
export const praiseComment = ({user_id, course_comment_id}) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/comments/praise',
    params: {
      user_id: user_id,
      course_comment_id: course_comment_id
    }
  })
}
export const unPraiseComment = ({user_id, course_comment_id}) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/comments/unpraise',
    params: {
      user_id: user_id,
      course_comment_id: course_comment_id
    }
  })
}
export const getRecommend = (user_id,size) =>{
  return axios({
    method:'get',
    url: baseUrl + "/courses/recommend/find",
    params:{
      user_id:user_id,
      size:size
    }
  })
}
export const getHottest = (user_id, number)=>{
  return axios({
    method:'get',
    url: baseUrl + "/courses/hot",
    params:{
      user_id: user_id,
      number : number,
    }
  })
}
export const getNotices = (number)=>{
  return axios({
    method:'get',
    url: baseUrl+ "/manager/systemMessage/find",
    params:{
      number:number,
    }
  })
}
export const sendVideoReport = (video_id,user_id,video_report_reason) =>{
  return axios({
    method: 'post',
    url: baseUrl + "/report/report/moment",
    data:{
      video_id:video_id,
      user_id: user_id,
      video_report_reason: video_report_reason,
    }
  })
}
module.exports = {
  sendHighlightImg: sendHighlightImg,
  getAllHighlight: getAllHighlight,
  getNumberHighlight: getNumberHighlight,
  getCourseById: getCourseById,
  getUserById: getUserById,
  sendNewHighlight: sendNewHighlight,
  praiseHighlight: praiseHighlight,
  unPraiseHighlight: unPraiseHighlight,
  commentHighlight: commentHighlight,
  sendCommentReply: sendCommentReply,
  sendAvatarImg: sendAvatarImg,
  getCommentById: getCommentById,
  getEvaluationById: getEvaluationById,
  getQAbyId: getQAbyId,
  praiseComment: praiseComment,
  unPraiseComment: unPraiseComment,
  getRecommend: getRecommend,
  getHottest: getHottest,
  getNotices: getNotices,
  sendVideoReport: sendVideoReport,
}