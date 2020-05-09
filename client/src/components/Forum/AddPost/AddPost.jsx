import React, { Fragment, useMemo, useState, useCallback } from "react";
import { TextField, TextareaAutosize } from "@material-ui/core";
import { ArrowBackIos, PersonPin, Edit } from "@material-ui/icons";
import PropTypes from "prop-types";
import "./textEditor.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const AddPost = () => {
  const [doubt, setDoubt] = useState(null);
  const [post, setPost] = useState(null);
  const [category, setCategory] = useState("Other");
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");

  const onChange = (e) => {
    setDoubt(e.target.value);
    console.log(doubt);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const description = value;
    const body = JSON.stringify({ doubt, category, description, code });
    console.log(body);
    try {
      const res = await axios.post(`/forum/`, body, config);
      console.log(res.data);
      setPost(res.data);
      console.log(res.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  return post === null ? (
    <div
      style={{
        marginTop: "100px",
        marginLeft: "3%",
        marginRight: "3%",
        padding: "3% 3%",
        textAlign: "center",
      }}
    >
      <h1>ADD POST </h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div style={{ marginTop: "30px" }}>
          <h5 style={{ textAlign: "left", letterSpacing: "2px" }}>
            Short Query:
          </h5>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            label="Doubt"
            value={doubt}
            name="doubt"
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <h5 style={{ textAlign: "left", letterSpacing: "2px" }}>
            Select A Category
          </h5>
          <span class="select" style={{ width: "100%" }}>
            <select
              name="slct"
              id="slct"
              value={category}
              onChange={(e) => {
                setCategory(e.currentTarget.value);
                console.log(category);
              }}
            >
              <option selected disabled>
                Choose an option
              </option>
              <option value="Competitive Programming">
                Competitive Programming
              </option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Game Development">Game Development</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Artifical Intelligence">
                Artifical Intelligence
              </option>
              <option value="Cloud Comuting">Cloud Comuting</option>
              <option value="Image Processing">Image Processing</option>
              <option value="Other">Other</option>
            </select>
          </span>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h5 style={{ textAlign: "left", letterSpacing: "2px" }}>
            Describe your query
          </h5>
          <TextareaAutosize
            rowsMin={6}
            style={{
              width: "100%",
              padding: "1% 1%",
              background: "#2c3e50",
              color: "white",
            }}
            placeholder="Describe your query here"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></TextareaAutosize>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h5 style={{ textAlign: "left", letterSpacing: "2px" }}>
            Share your code
          </h5>
          <TextareaAutosize
            rowsMin={5}
            style={{
              width: "100%",
              padding: "1% 1%",
              fontFamily: "monospace",
              fontWeight: "bold",
              background: "#2c3e50",
              color: "white",
            }}
            placeholder="Share your code snippets here"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></TextareaAutosize>
        </div>
        <button
          class="btn btn-primary btn-lg"
          style={{ marginTop: "20px", marginBottom: "20px" }}
          type="submit"
        >
          Post this question
        </button>
      </form>
    </div>
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
              &nbsp;&nbsp; REVIEW
            </h1>
          </div>
          <br></br>
          <div key={post._id} style={{ margin: "3% 2%" }}>
            <div class="border rounded" style={{ padding: "5% 5%" }}>
              <h6>
                {" "}
                <PersonPin />
                <b>
                  <Link to={`/profile/${post.member}`}>{post.name}</Link>
                </b>{" "}
                asks <Link to={`/forum/show/${post._id}`}> {post.doubt} </Link>{" "}
              </h6>
              {post.description !== "" && (
                <TextareaAutosize
                  readOnly
                  rowsMin={3}
                  style={{ width: "100%", border: "black", padding: "1% 1%" }}
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
            </div>
          </div>
        </div>
      </div>
      <div style={{ letterSpacing: "3.5px", textAlign: "center" }}>
        <Link to="/forum/post">
          <span>
            <button
              class="btn btn-link"
              onClick={() => {
                setPost(null);
                setDoubt(null);
                setCategory(null);
                setValue(null);
                setCode(null)
              }}
            >
              Ask another question
            </button>{" "}
          </span>
        </Link>
        &nbsp;|&nbsp;
        <Link to={`/forum/editpost/${post._id}`}>
          <button class="btn btn-link">Edit</button>
        </Link>
      </div>
    </Fragment>
  );
};

AddPost.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  forum: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  forum: state.forum,
});

export default connect(mapStateToProps, {})(withRouter(AddPost));
