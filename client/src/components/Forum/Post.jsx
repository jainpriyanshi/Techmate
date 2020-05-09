import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, TextareaAutosize } from "@material-ui/core";
import {
  ArrowBackIos,
  QuestionAnswer,
  Stars,
  PersonPin,
  Delete,
  Edit,
  Reply,
} from "@material-ui/icons";
import {
  getPost,
  addComment,
  like,
  deleteComment,
  deletePost,
  replyComment,
  likeComment,
} from "../../actions/forumActions";
import { Spinner } from "react-spinners-css";
import Moment from "react-moment";

import Alert from "@material-ui/lab/Alert";
const Post = ({
  getPost,
  like,
  addComment,
  deleteComment,
  likeComment,
  deletePost,
  replyComment,
  errors,
  forum: { post, loading },
  auth: { user },
  match,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  const [value, setValue] = useState(null);

  const [formData, setFormData] = useState({ comment: "" });
  const [reply, setReply] = useState("");
  const { comment } = formData;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentid, setCommentid] = useState("");
  const [likeAlert, setLikeAlert] = useState(false);

  const onChange_r = (e) => {
    console.log(reply);
    setReply(e.target.value);
  };

  const onSubmit_r = async (e, id, cid) => {
    e.preventDefault();
    const comment = reply;
    replyComment(id, cid, { comment });
    setCommentid("");
    setReply("");
    setShowReplyForm(false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addComment(match.params.id, { comment });
    setLikeAlert(true);
  };

  return loading ||
    errors.notfound ||
    errors.notfound ||
    errors.auth ||
    post === null ? (
    <Fragment>
      <div class="deadcentre">
        <h1>Please &nbsp; &nbsp; &nbsp; &nbsp; wait....</h1>

        <div class="deadcentre">
          <Spinner />
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <h1 className="text-danger"> {errors.notfound}</h1>
        <h1 className="text-danger"> {errors.auth}</h1>
        <h1 className="text-danger"> {errors.servererror}</h1>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div style={{ marginTop: "100px" }}>
        <div>
          <div style={{ letterSpacing: "3.5px", textAlign: "center" }}>
            <h1>
              {" "}
              <Link to="/forum">
                <ArrowBackIos />
              </Link>{" "}
              &nbsp;FORUM
            </h1>
          </div>
          <br></br>
          <div>
            <div key={post._id} style={{ margin: "3% 2%" }}>
              <div class="border rounded" style={{ padding: "2% 2%" }}>
                <h6>
                  {" "}
                  <PersonPin />
                  <b>
                    <Link to={`/profile/${post.member}`}>{post.name}</Link>
                  </b>{" "}
                  asks{" "}
                  <Link to={`/forum/show/${post._id}`}> {post.doubt} </Link>{" "}
                </h6>
                {post.description !== "" && (
                  <TextareaAutosize
                    readOnly
                    rowsMin={3}
                    style={{
                      width: "100%",
                      border: "white",
                      padding: "1% 1%",
                    }}
                  >
                    {post.description}
                  </TextareaAutosize>
                )}

                {post.code !== "" && (
                  <TextareaAutosize
                    readOnly
                    rowsMin={3}
                    style={{
                      width: "100%",
                      border: "black",
                      padding: "1% 1%",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      background: "#e3e2e1",
                    }}
                  >
                    {post.code}
                  </TextareaAutosize>
                )}
                <p className="text-muted">
                  <span class="text-monospace">
                    {" "}
                    <Moment format="DD/MM/YY HH:mm" date={post.date} />
                    &nbsp;
                  </span>
                  <Link to={`/forum/show/${post._id}`}>
                    {" "}
                    <QuestionAnswer /> {post.n_comments}{" "}
                  </Link>
                  <button
                    class="btn btn-link"
                    onClick={() => {
                      like(post._id);
                    }}
                  >
                    <Stars /> {post.likes}{" "}
                  </button>
                  {user.id === post.member && (
                    <button
                      class="btn btn-link"
                      onClick={() => {
                        deletePost(post._id);
                        window.location.href = "/forum";
                      }}
                    >
                      <Delete/>
                    </button>
                  )}
                  {user.id === post.member && (
                    <Link to={`/forum/editpost/${post._id}`}>
                      <button class="btn btn-link">
                        <Edit />
                      </button>
                    </Link>
                  )}
                </p>
              </div>
            </div>
            <h3 class="text-center">
              <b style={{ letterSpacing: "2px" }}> COMMENT SECTION</b>
            </h3>
            <div style={{ textAlign: "center", margin: "5% 2%" }}>
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="text-danger"> {errors.comment} </div>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Comment"
                  value={comment}
                  name="comment"
                  onChange={(e) => onChange(e)}
                  style={{ width: "47%" }}
                  required
                />
                <button
                  type="submit"
                  class="btn btn-lg btn-dark"
                  style={{ margin: "3px 10px" }}
                >
                  Reply
                </button>
              </form>
            </div>
            <div style={{ width: "80%", margin: "2% 10%" }}>
              {likeAlert && (
                <Alert
                  onClose={() => {
                    setLikeAlert(false);
                  }}
                  severity="success"
                >
                  You posted to this thread
                </Alert>
              )}
            </div>

            {post.comments.map((comment) => (
              <Fragment key={comment._id}>
                <div style={{ margin: "2% 2%" }}>
                  <div style={{ padding: "2% 2%" }} class="border rounded">
                    <h6>
                      <PersonPin />
                      <span>
                        <Link to={`/profile/${comment.user}`}>
                          <b>{comment.name}</b>
                        </Link>
                      </span>
                      <br />
                      <p style={{ marginTop: "2%" }}>
                        {" "}
                        @
                        <Link to={`/profile/${comment.tagUserId}`}>
                          {comment.tagUserName}{" "}
                        </Link>
                        {comment.comment}{" "}
                      </p>
                    </h6>
                    <p className="text-muted">
                      <Moment format="DD-MM-YYYY HH:mm" date={comment.date} />
                      <span>
                        {user.id === comment.user && (
                          <button
                            class="btn btn-link"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this item?"
                                )
                              ) {
                                deleteComment(post._id, comment._id);
                              }
                            }}
                          >
                            <Delete />
                          </button>
                        )}
                        <button
                          class="btn btn-link"
                          onClick={() => {
                            setShowReplyForm(!showReplyForm);
                            setCommentid(comment._id);
                          }}
                        >
                          <Reply />
                        </button>
                        <button
                          class="btn btn-link"
                          onClick={() => {
                            likeComment(post._id, comment._id);
                          }}
                        >
                          <Stars />
                          {comment.likes}
                        </button>
                        {showReplyForm && comment._id === commentid && (
                          <form
                            className="form"
                            onSubmit={(e) => onSubmit_r(e, post._id, commentid)}
                          >
                            <TextField
                              variant="outlined"
                              type="text"
                              label="Comment"
                              value={reply}
                              name="comment"
                              onChange={(e) => onChange_r(e)}
                              style={{ width: "47%" }}
                              required
                            />
                            <button
                              type="submit"
                              class="btn btn-lg btn-dark"
                              style={{ margin: "3px 10px" }}
                            >
                              Reply
                            </button>
                          </form>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
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
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  replyComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  forum: state.forum,
});

export default connect(mapStateToProps, {
  getPost,
  addComment,
  deletePost,
  like,
  deleteComment,
  replyComment,
  likeComment,
})(withRouter(Post));
