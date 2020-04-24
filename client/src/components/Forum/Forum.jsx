import React, { Fragment, useMemo, useState, useCallback , useEffect} from "react";
import { createEditor,Editor, Transforms } from 'slate'
import { Slate, Editable, withReact,useSlate } from 'slate-react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {TextareaAutosize} from '@material-ui/core';
import { QuestionAnswer, FilterList, Stars, PersonPin, Delete, Edit} from '@material-ui/icons';
import { getForum, deletePost, likeForum, getCategory, getUserPost } from "../../actions/forumActions";
import { Spinner } from 'react-spinners-css';
import Moment from 'react-moment';
import { withHistory } from 'slate-history'
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

const Forum = ({getForum, errors,getCategory,getUserPost ,likeForum,deletePost,forum :{forum,loading}, auth:{user}}) => {
  useEffect(() => {
    getForum();
  }, []);

  const [category, setCategory] = useState("All");
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState(null)
  const[likeAlert, setLikeAlert]= useState(false);
  const[likePost, setLikePost]= useState(null);
    
  const onSubmit = async e =>{
    e.preventDefault();
    console.log(category);
    if(category==="All")
      getForum();
    else if(category==="My Posts")
      getUserPost();
    else
    getCategory({category});
}

  return loading||errors.notfound|| errors.notfound|| errors.auth || forum === null ?(
  <Fragment>
  <div class="deadcentre" style={{marginBottom: "100px"}}>
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
    <div style={{ marginTop : "70px"}}>
            <span style={{marginLeft: "10px"}}>    <Link to ="/" style={{color: "grey"}}> Home </Link> / <Link to ="/forum"> Forum</Link></span>
       <div style={{marginTop:"100px" }} style={{marginBottom: "100px"}}>
          <div style={{textAlign:"left"}}>
            <div style={{letterSpacing:"3.5px", textAlign:"center"}}> 
              <h1>FORUM</h1>
            </div>                   
            <br></br>
            <hr/>
            <div style={{marginTop:"30px", marginBottom:"30px"}}>
              <div class="container">
              <div class="row" style={{height:'250px' }}>
                <div class="col-xs-4 col-sm-4" style={{marginTop:"40px", textAlign:"center"}}>
                  <button type="button" class="btn btn-md btn-dark"><Link to ="/forum/post" style={{textDecoration:"none", color:"white", letterSpacing:"3px"}}>POST QUERY</Link></button>
                  <h5 style={{marginTop:"30px", marginBottom:"10px"}}> Posts </h5>
                  <h3><b>{forum.length}</b></h3>
                </div >
                <div class="col-xs-12 col-sm-8">
                  <div style={{margin:"20px 10px"}}>
                    <div style={{padding:"10px 50px", textAlign:"center"}} class="border-left">
                      <h5 style={{margin:"10px 5px"}}> Select a Category </h5>
                        <form className='form' onSubmit={e => onSubmit(e)}> 
                          <div>
                          <span class="select" style={{width:"100%", marginTop:"20px"}}>
                                      <select  name="slct" id="slct" value={category} onChange={e=>{setCategory(e.currentTarget.value); console.log(category)} }>
                                        <option selected disabled>Choose an option</option>
                                        <option value="All" >All</option>
                                        <option value="My Posts" >My Posts</option>
                                        <option value="Competitive Programming" >Competitive Programming</option>
                                        <option value="Web Development" >Web Development</option>
                                        <option value="App Development" >App Development</option>
                                        <option value="Game Development" >Game Development</option>
                                        <option value="Blockchain" >Blockchain</option>
                                        <option value="Artifical Intelligence" >Artifical Intelligence</option>
                                        <option value="Cloud Comuting" >Cloud Comuting</option>
                                        <option value="Image Processing" >Image Processing</option>
                                        <option value="Other">Other</option>
                                        </select>
                          </span>
                          </div>
                          <button type="submit" class="btn btn-sm btn-dark" style={{marginTop:"10px"}}> <FilterList/> Filter </button>
                          </form>
                  </div>
                </div>
              </div>
              
            </div>   
            </div>
            {forum.map(post =>(  
                    <div key={post._id} style={{margin:"3% 2%"}}  class="col-lg-12">
                    <div>
                    <div class="border rounded" style={{padding:"2% 2%"}}>
                    <h6> <PersonPin/><b><Link to = {`/profile/${post.member}`}>{post.name}</Link></b> asks <Link to={`/forum/show/${post._id}`}> {post.doubt} </Link> </h6>
                      
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
                      {
                        post.code!=="" && <TextareaAutosize readOnly rowsMin={3} style={{width:"100%", border:"black", padding:"1% 1%", fontFamily:"monospace", fontWeight:"bold", background:"#e3e2e1"}} >{post.code}</TextareaAutosize>
                      }
                      
                      <p className="text-muted"> 
                      <span class="text-monospace"> <Moment format="DD/MM/YY HH:mm" date={post.date}/>&nbsp;</span> 
                             <Link to={`/forum/show/${post._id}`}> <QuestionAnswer/> {post.n_comments} </Link> 
                             <button  class="btn btn-link" onClick={ ()=>{likeForum(post._id); setLikeAlert(true); setLikePost(post._id)}}><Stars/> {post.likes} </button>
                            {
                                user.id===post.member &&
                                <button style={{marginLeft:"2px"}} class="btn btn-link" onClick={ () => { if (window.confirm('Are you sure you wish to delete this item?')){deletePost(post._id);getForum();window.alert("Your Post is deleted")}}}> <Delete/></button>
                            }
                            {
                              user.id===post.member &&
                              <Link to={`/forum/editpost/${post._id}`}><button class="btn btn-link"><Edit/></button></Link>
                            }
                      </p>
                       {likeAlert && post._id===likePost && <Alert onClose={() => {setLikeAlert(false)}} severity="success">You Liked this post</Alert>}
                      </div>
                      </div>
                    </div>
                    ))}

            </div>
            </div>
          </div>
    </div>
  );
};

Forum.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    forum: PropTypes.object.isRequired,
    getForum: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    likeForum: PropTypes.func.isRequired,
    category: PropTypes.func.isRequired,
    getUserPost:PropTypes.func.isRequired,
    
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
    mapStateToProps, {getForum, deletePost, likeForum, getCategory, getUserPost}
  )(withRouter(Forum));
  



