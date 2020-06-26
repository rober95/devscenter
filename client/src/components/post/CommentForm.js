import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

const CommentForm = ({ errors: errorsProp, addComment, auth, postId }) => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errorsProp) {
      setErrors(errorsProp);
    }
  }, [errorsProp]);

  const onSubmit = e => {
    e.preventDefault();

    const newComment = {
      text,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    addComment(postId, newComment);
    setText('');
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to post"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
