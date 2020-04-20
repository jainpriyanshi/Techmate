import axios from "axios";
import {GET_FORUM, GET_POST,GET_ERRORS, ADD_COMMENT, REPLY_COMMENT, DELETE_POST, LIKE, DELETE_COMMENT, LIKE_COMMENT } from "./types";

export const getForum = () => async dispatch => {
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

  export const getPost = (id) => async dispatch => {
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


  export const deletePost = (id) => async dispatch => {
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
    try {
      console.log(id);
      const res = await axios.post(`/forum/like/${id}`);
      // dispatch({
      //   type: LIKE,
      //   payload: res.data
      // })
      
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      
    }
  }



  export const deleteComment = (id, cid) => async dispatch => {
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