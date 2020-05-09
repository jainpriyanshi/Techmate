import React, {
  useEffect,
  Fragment,
  useMemo,
  useState,
  useCallback,
} from "react";

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { TextField, TextareaAutosize } from "@material-ui/core";
import { connect } from "react-redux";
import { getPost } from "../../../actions/forumActions";

const EditPost = ({ getPost, match, forum: { post, loading } }) => {
  const [doubt, setDoubt] = useState(null);
  const [category, setCategory] = useState(null);
  const [value, setValue] = useState(null);
  const [code, setCode] = useState("");
  useEffect(() => {
    getPost(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (post !== null) {
      setDoubt(post.doubt);
      setValue(post.description);
      setCategory(post.category);
      setCode(post.code);
    }
  }, [post]);

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
      const res = await axios.post(
        `/forum/editpost/${match.params.id}`,
        body,
        config
      );
      window.location.href = "/forum";
    } catch (error) {
      console.log(error);
    }
  };

  return post === null ? (
    <Fragment>
      <h1 style={{ marginTop: "200px" }}>Loading</h1>
    </Fragment>
  ) : (
    <div
      style={{
        marginTop: "100px",
        marginLeft: "3%",
        marginRight: "3%",
        padding: "3% 3%",
        textAlign: "center",
      }}
    >
      <h1>EDIT POST </h1>
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
          <span class="select">
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
            rowsMin={5}
            style={{
              width: "100%",
              padding: "1% 1%",
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
  );
};

EditPost.propTypes = {
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

export default connect(mapStateToProps, { getPost })(withRouter(EditPost));
