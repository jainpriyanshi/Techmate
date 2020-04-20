import React, { Fragment, useState, useEffect , useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {TextField} from '@material-ui/core';
import {ArrowBackIos} from '@material-ui/icons';
import { getPost, addComment, like , deleteComment, deletePost,replyComment,likeComment} from "../../actions/forumActions";
import { Spinner } from 'react-spinners-css';
import Moment from 'react-moment';
import axios from 'axios';
import { withHistory } from 'slate-history'
import { createEditor } from 'slate'
import { Slate, Editable, withReact,useSlate } from 'slate-react'

const Post = ({getPost, like,addComment,deleteComment, likeComment,deletePost,replyComment,errors,forum :{post,loading},auth:{user}, match}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost,match.params.id]);
  
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState(null)

  const [formData, setFormData] = useState({comment:''});
  const [reply, setReply]= useState('');
  const {comment} = formData;
  const [showReplyForm, setShowReplyForm]=useState(false);
  const [commentid, setCommentid]=useState('');
  




  const onChange_r = e =>
  {console.log(reply);
    setReply(e.target.value);
  }

  const onSubmit_r = async (e,id,cid)=>{
    e.preventDefault();
    const comment= reply;
    replyComment(id, cid, {comment});
    setCommentid('');
    setReply('');
    setShowReplyForm(false);
  }
    
  
  const onChange = e => 
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e =>{
      e.preventDefault();
      addComment(match.params.id, {comment});
  }  


  return loading||errors.notfound|| errors.notfound|| errors.auth || post === null ?(
    <Fragment>
    <div class="deadcentre">
          <h1>Please &nbsp; &nbsp; &nbsp; &nbsp; wait....</h1>
          
          <div class="deadcentre">
          <Spinner />
          </div>
    </div>
    <div style={{marginTop:"100px"}}>
    <h1 className="text-danger">  {errors.notfound}</h1>
    <h1 className="text-danger">   {errors.auth}</h1>
    <h1 className="text-danger">  { errors.servererror}</h1>
    
    </div>
    </Fragment>
      ):
  (
    <Fragment>
        {console.log(post)}
        <div style={{marginTop:"100px"}}>
                <div>
                  <div style={{letterSpacing:"3.5px", textAlign:"center"}}> 
                    <h1> <Link to="/forum"><ArrowBackIos/></Link> &nbsp; DISCUSSION FORUM</h1>
                  </div>
                  <br></br>
                   <div >
                    <div key={post._id} style={{margin:"3% 2%" , padding:"3% 3%"}} class="border rounded">
                      <h2> <Link to={`/forum/show/${post._id}`}> {post.doubt} </Link></h2>
                      <h5>
                      <span class="badge badge-pill badge-dark"> {post.category}</span>
                      <span class="badge badge-pill badge-light"> Posted by : <Link to = {`/profile/${post.member}`}>{post.name}</Link> </span> 
                      </h5>
                      <Slate editor={editor} value={post.description} onChange={value => setValue(post.description)}>
                        <Editable  style={{padding:"1% 1%"}}
                          renderElement={renderElement}
                          renderLeaf={renderLeaf}
                          spellCheck
                          autoFocus
                          readOnly
                          onKeyDown={event => {event.preventDefault()}}              
                        />
                      </Slate>
                      <p className="text-muted"> Date: <Moment format="DD-MM-YYYY HH:mm" date={post.date}/> &nbsp; Comments:{post.n_comments} &nbsp; Likes: {post.likes}
                      <div>    
                      <button  class="btn btn-link" onClick={ ()=>{like(post._id)}}>Like</button> 
                      {
                          user.id===post.member &&
                          <button  class="btn btn-link" onClick={ () => {deletePost(post._id); window.location.href = "/forum"}}>Delete</button>
                        
                      }


                        {
                          user.id===post.member &&
                          <Link to={`/forum/editpost/${post._id}`}><button class="btn btn-link">Edit</button></Link>
                        
                        }
                      </div>
                      </p> 
                      </div>
                      <div style={{textAlign:"center" ,margin:"5% 2%"}}>
                      <form className='form' onSubmit={e => onSubmit(e)}>
                      <div className="text-danger"> {errors.comment} </div>
                      <TextField
                         variant="outlined"
                         type="text"
                         label="Comment"
                         value={comment}
                         name="comment"
                         onChange={e => onChange(e)}
                         style={{width: "47%"}}
                         required
                        />
                      <button type="submit" class="btn btn-lg btn-dark" style={{margin:"3px 10px"}}>Reply</button>
                        </form>
                        </div>
  
                      {post.comments.map((comment) =>(
                        <Fragment key={comment._id}>
                      <div style={{margin:"1% 2%" , padding:"1% 3%"}} class="border-bottom rounded">
                        <b>
                      <span class="badge badge-pill badge-dark"> <Link to = {`/profile/${comment.user}`}>{comment.name}</Link></span>
                      <span class="badge badge-pill badge-light"> Replying to: @<Link to = {`/profile/${comment.tagUserId}`}>{comment.tagUserName}</Link> </span> 
                      </b>
                      <p>  {comment.comment} </p>
                      <p className="text-muted"> Date: <Moment format="DD-MM-YYYY HH:mm" date={comment.date}/> &nbsp; &nbsp; Likes: {comment.likes}  
                      <div>  
                      {user.id===comment.user && <button class="btn btn-link" onClick={()=> {deleteComment(post._id, comment._id)}}>Delete</button>}
                          <button  class="btn btn-link" onClick={()=> {setShowReplyForm(!showReplyForm); setCommentid(comment._id) }}>Reply</button>
                          <button class="btn btn-link" onClick={ ()=>{likeComment(post._id, comment._id)}}>Like</button>
                          {
                             showReplyForm && (comment._id===commentid) &&
                             <form className='form' onSubmit={e => onSubmit_r(e, post._id, commentid)}>
                              <TextField
                                variant="outlined"
                                type="text"
                                label="Comment"
                                value={reply}
                                name="comment"
                                onChange={e => onChange_r(e)}
                                style={{width: "47%"}}
                                required
                                />
                              <button type="submit" class="btn btn-lg btn-dark" style={{margin:"3px 10px"}}>Reply</button>
                                </form>

                          }
                        </div>
                      </p> 
                      </div>
                          
{/*                           
                          <div> Comment : {comment.comment} </div>
                          <div>Name: <Link to = {`/profile/${comment.user}`}>{comment.name}</Link> </div>
                          <div>Replying to <Link to = {`/profile/${comment.tagUserId}`}>{comment.tagUserName}</Link></div>
                          Date: <Moment date={comment.date}/>
                          <div>Likes{comment.likes}</div>
                          {user.id===comment.user && <button onClick={()=> {deleteComment(post._id, comment._id)}}>Delete</button>}
                          <button onClick={()=> {setShowReplyForm(!showReplyForm); setCommentid(comment._id) }}>Reply</button>
                          <button onClick={ ()=>{likeComment(post._id, comment._id)}}>Like</button>
                          {
                             showReplyForm && (comment._id===commentid) &&
                             <form className='form' onSubmit={e => onSubmit_r(e, post._id, commentid)}>
                              <input
                                type="text"
                                label="Comment"
                                value={reply}
                                name="comment"
                                onChange={e => onChange_r(e)}
                                style={{width: "47%"}}
                                required
                                />
                              <button> Submit</button>
                                </form> */}

                          }
    
                          
                        </Fragment>
                      ))}
                          





                    </div>

                </div>
          </div>
    </Fragment>
  );
};

Post.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    forum: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    addComment:PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    replyComment: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    likeComment:PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    forum: state.forum,
  });


  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
  }


  const Element = ({ attributes, children, element }) => {
    switch (element.type) {
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return <p {...attributes}>{children}</p>
    }
  }
  
  export default connect(
    mapStateToProps, {getPost, addComment,deletePost ,like, deleteComment, replyComment, likeComment}
  )(withRouter(Post));
  