import axios from 'axios'
export const sendNewHighlight = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+"/courses/moments/post",
    data: data
  })
}
export const getAllHighlight =(user_id) =>{
  return axios({
    method:'get',
    url:baseUrl+"/courses/moments/findAll",
    params:{
      user_id:user_id
    }
  })
}
export const praiseHighlight = (user_id,video_id) =>{
  return axios({
    method:'get',
    url:baseUrl + "/courses/moments/praise",
    params:{
      video_id:video_id,
      user_id:user_id,
    }
  })
}
export const unPraiseHighlight = (user_id,video_id) =>{
  return axios({
    method:'get',
    url:baseUrl + "/courses/moments/unpraise",
    params:{
      video_id:video_id,
      user_id:user_id,
    }
  })
}
export const commentHighlight = (user_id,video_id,content) =>{
  return axios({
    method:'post',
    url:baseUrl + "/courses/moments/comment",
    data:{
      user_id:user_id,
      video_id:video_id,
      video_comment_content:content,
    }
  })
}
export const sendHighlightImg = (file)=>{
  let formData = new FormData();
  formData.append("file",file);
  console.log(JSON.stringify(formData))
  return axios({
    url : baseUrl + "/courses/moments/upload",
    method:'POST',
    withCredential:true,
    data:formData,
  })
}
export const getUserById = (id)=>{
  return axios({
    method:'get',
    url:baseUrl+"/users/specific",
    params:{
      id:id,
    }
  })
}
export const getCourseById = (params) =>{
  return axios({
    method:'get',
    params:params,
    url:baseUrl + '/courses/specific',
  })
}
module.exports = {
  sendHighlightImg:sendHighlightImg,
  getAllHighlight:getAllHighlight,
  getCourseById:getCourseById,
  getUserById:getUserById,
  sendNewHighlight:sendNewHighlight,
  praiseHighlight:praiseHighlight,
  unPraiseHighlight:unPraiseHighlight,
}