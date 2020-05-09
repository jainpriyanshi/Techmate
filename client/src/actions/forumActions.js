import axios from "axios";
import {GET_FORUM, GET_POST,GET_ERRORS, ADD_COMMENT, GET_CATEGORY, DELETE_POST, LIKE, DELETE_COMMENT, LIKE_COMMENT, LIKE_FORUM, USER_POST } from "./types";
import setAuthToken from "../utils/setAuthToken";

const tokensetter = () =>
{
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
  }
}

export const getForum = () => async dispatch => {
    tokensetter();
    try {
      const res = await axios.get('/forum');
  
      dispatch({
        type: GET_FORUM,
        payload: res.data
      });

    } catch (err) {
      console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
    }
  };


  export const getUserPost = () => async dispatch => {
    tokensetter();
    try {
      const res = await axios.get('/forum/userpost');
  
      dispatch({
        type: USER_POST,
        payload: res.data
      });

    } catch (err) {
      console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
    }
  };


  export const getPost = (id) => async dispatch => {
    tokensetter();
    try {
      const res = await axios.get(`/forum/showpost/${id}`);
      console.log(res.data);
      dispatch({
        type: GET_POST,
        payload: res.data
      })
      
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }

  export const getCategory = ( {category}) => async dispatch => {
    tokensetter();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({  category });
    console.log(body, "ACSJNBKJABDV");
    try {
      const res = await axios.post(`/forum/category`,body,config);
      console.log(res.data,"jhbsnadvhjnhloads");
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      })
      
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }


  export const deletePost = (id) => async dispatch => {
    tokensetter();
    try {
      console.log(id);
      const res = await axios.delete(`/forum/deletepost/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: res.data
      })
      
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }

  export const addComment = (id, {comment}) => async dispatch => {
    tokensetter();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({  comment });
    
    try {
      const res = await axios.post(`/forum/comment/${id}`, body, config);
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
      
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }



  export const like = (id) => async dispatch => {
    tokensetter();
    try {
      console.log(id);
      const res = await axios.post(`/forum/like/${id}`);
      dispatch({
        type: LIKE,
        payload: res.data
      })
      
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }


  export const likeForum = (id) => async dispatch => {
    tokensetter();
    try {
      
      const res = await axios.post(`/forum/likeforum/${id}`);
      dispatch({
        type: LIKE_FORUM,
        payload: res.data
      })
      
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }



  export const deleteComment = (id, cid) => async dispatch => {
    tokensetter();
    try {
      console.log(id);
      const res = await axios.delete(`/forum/deletecomment/${id}/${cid}`);
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      })
      
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }


  export const replyComment = (id, cid, {comment}) => async dispatch => {
    tokensetter();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({  comment });
    
    try {
      console.log(id);
      const res = await axios.post(`/forum/replycomment/${id}/${cid}`, body, config);
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      })
      
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }



  export const likeComment = (id, cid) => async dispatch => {    
    tokensetter();
    try {
      console.log(id);
      const res = await axios.post(`/forum/likecomment/${id}/${cid}`);
      dispatch({
        type: LIKE_COMMENT,
        payload: res.data
      })
      
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });   
    }
  }