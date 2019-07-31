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
  console.log(JSON.stringify(formData))
  return axios({
    url: baseUrl + '/courses/moments/upload',
    method: 'POST',
    withCredential: true,
    data: formData
  })
}
export const sendAvatarImg = (file) => {
  let formData = new FormData()
  formData.append('file', file)
  console.log(JSON.stringify(formData))
  return axios({
    url: baseUrl + '/users/avatar/upload',
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
export const getCommentById = (course_id, user_id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/comments/find',
    params: {
      course_id: course_id,
      user_id: user_id
    }
  })
}
export const getEvaluationById = (course_id, user_id) => {
  return axios.get(baseUrl + '/courses/evaluates/find', {
    params: {
      course_id: course_id
    }
  })
}
export const getQAbyId = (course_id, user_id) => {
  return axios.get(baseUrl + '/courses/questions/find', {
    params: {
      course_id: course_id,
      user_id: user_id
    }
  })
}
export const praiseComment = (user_id, course_comment_id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/comments/praise',
    params: {
      user_id: user_id,
      course_comment_id: course_comment_id
    }
  })
}
export const unPraiseComment = (user_id, course_comment_id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/courses/comments/unpraise',
    params: {
      user_id: user_id,
      course_comment_id: course_comment_id
    }
  })
}
module.exports = {
  sendHighlightImg: sendHighlightImg,
  getAllHighlight: getAllHighlight,
  getCourseById: getCourseById,
  getUserById: getUserById,
  sendNewHighlight: sendNewHighlight,
  praiseHighlight: praiseHighlight,
  unPraiseHighlight: unPraiseHighlight,
  commentHighlight: commentHighlight,
  sendCommentReply: sendCommentReply,
  sendAvatarImg: sendAvatarImg,
  getCommentById: getCourseById,
  getEvaluationById: getEvaluationById,
  getQAbyId: getQAbyId,
  praiseComment: praiseComment,
  unPraiseComment: unPraiseComment
}