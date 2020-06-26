import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

const Profile = props => {
  useEffect(() => {
    if (props.match.params.handle) {
      props.getProfileByHandle(props.match.params.handle);
    } //eslint-disable-next-line
  }, []);

  const { profile, loading } = props.profile;

  const prevLoadingRef = useRef();

  useEffect(() => {
    if (prevLoading && !loading && profile === null) {
      props.history.push('/not-found');
    }
    prevLoadingRef.current = props.profile.loading; //eslint-disable-next-line
  }, [props.profile.loading]);

  const prevLoading = prevLoadingRef.current;

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back to Profiles
            </Link>
          </div>
          <div className="col-md-6"></div>
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubusername ? (
          <ProfileGithub username={profile.githubusername} />
        ) : null}
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
