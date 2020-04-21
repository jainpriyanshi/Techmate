import React, { Fragment, useMemo, useState, useCallback , useEffect} from "react";
import { createEditor,Editor, Transforms } from 'slate'
import { Slate, Editable, withReact,useSlate } from 'slate-react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {TextareaAutosize} from '@material-ui/core';
import { } from '@material-ui/icons';
import { getForum, deletePost, like, getCategory, } from "../../actions/forumActions";
import { Spinner } from 'react-spinners-css';
import Moment from 'react-moment';
import { withHistory } from 'slate-history'
import axios from 'axios';


const Forum = ({getForum, errors,getCategory ,like,deletePost,forum :{forum,loading}, auth:{user}}) => {
  useEffect(() => {
    getForum();
  }, []);

  const [category, setCategory] = useState("All");
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState(null)

  const onFilter = async e =>{
    e.preventDefault();
    getCategory({category})
    
}

  return loading||errors.notfound|| errors.notfound|| errors.auth || forum === null ?(
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
        <div style={{marginTop:"100px"}}>
                <div style={{textAlign:"left"}}>
                  <div style={{letterSpacing:"3.5px", textAlign:"center"}}> 
                    <h1>DISCUSSION FORUM</h1>
                      </div>
                      <br></br>
                      <hr></hr> 
                      
                    

                  <Link to ="/forum/post"><h1 style={{letterSpacing:"3.5px", textAlign:"center"}}>Ask a question</h1></Link>
                  <br></br>
                    {forum.map(post =>(  
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
                      <TextareaAutosize rowsMin={3} style={{width:"100%", border:"black", padding:"1% 1%", fontFamily:"monospace", fontWeight:"bold", background:"#e3e2e1"}} readonly>{post.code}</TextareaAutosize>
                      <p className="text-muted"> <Moment format="DD-MM-YYYY HH:mm" date={post.date}/> &nbsp; Comments: {post.n_comments} &nbsp; Likes: {post.likes} 
                      <div style={{float:"right" , marginBottom:"100px"}}>
                        <button  class="btn btn-link" onClick={ ()=>{like(post._id)}}>Like</button> 
                        {
                          user.id===post.member &&
                           <button style={{marginLeft:"2px", padding:"0px 0px"}} class="btn btn-link" onClick={ () => {deletePost(post._id);getForum()}}> Delete</button>
                        }
                      </div>

                      </p>            
                    </div>
                    ))}

                </div>
          </div>
    </Fragment>
  );
};

Forum.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    forum: PropTypes.object.isRequired,
    getForum: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    category: PropTypes.func.isRequired,
    
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
    mapStateToProps, {getForum, deletePost, like, getCategory}
  )(withRouter(Forum));
  



