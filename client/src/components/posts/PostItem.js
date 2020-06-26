import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

const PostItem = ({
  deletePost,
  addLike,
  removeLike,
  auth,
  post,
  showActions,
}) => {
  const findUserLike = likes => {
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt="Avatar"
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showActions ? (
            <span>
              <button
                onClick={() => addLike(post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i
                  className={classnames('fas fa-thumbs-up', {
                    'text-success': findUserLike(post.likes),
                  })}
                ></i>
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button
                onClick={() => removeLike(post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down"></i>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                {post.comments.length} Comments
              </Link>
              {post.user === auth.user.id ? (
                <button
                  onClick={() => deletePost(post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
