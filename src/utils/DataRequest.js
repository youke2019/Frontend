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
export const getUserById = (id)=>{
  return axios({
    method:'get',
    url:baseUrl+"/users/specific",
    params:{
      id:id,
    }
  })
}