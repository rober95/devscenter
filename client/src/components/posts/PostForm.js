import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

const PostForm = ({ auth, addPost, errors: errorsProp }) => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errorsProp) {
      setErrors(errorsProp);
    }
  }, [errorsProp]);

  const onSubmit = e => {
    e.preventDefault();

    const newPost = {
      text,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    addPost(newPost);
    setText('');
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={e => setText(e.target.value)}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
