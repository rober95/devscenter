import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';

const CreateProfile = props => {
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [handle, setHandle] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [skills, setSkills] = useState('');
  const [githubusername, setGithubusername] = useState('');
  const [bio, setBio] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    props.getCurrentProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.profile.profile) {
      if (Object.keys(props.profile.profile).length > 0) {
        props.history.push('/dashboard');
      }
    }
    // eslint-disable-next-line
  }, [props.profile.profile]);

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  const onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    };

    props.createProfile(profileData, props.history);
  };

  let socialInputs;

  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={linkedin}
          onChange={e => setLinkedin(e.target.value)}
          error={errors.linkedin}
        />
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          onChange={e => setTwitter(e.target.value)}
          error={errors.twitter}
        />
        <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          onChange={e => setInstagram(e.target.value)}
          error={errors.instagram}
        />
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          onChange={e => setFacebook(e.target.value)}
          error={errors.facebook}
        />
        <InputGroup
          placeholder="Youtube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={youtube}
          onChange={e => setYoutube(e.target.value)}
          error={errors.youtube}
        />
      </div>
    );
  }

  // Select options for status
  const options = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={handle}
                onChange={e => setHandle(e.target.value)}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
              />
              <SelectListGroup
                name="status"
                value={status}
                onChange={e => setStatus(e.target.value)}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                error={errors.location}
                info="City & state for US devs or country"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={e => setSkills(e.target.value)}
                error={errors.skills}
                info="Please use comma separated values (eg. HTML,CSS,PHP)"
              />
              <TextFieldGroup
                placeholder="GitHub Username"
                name="githubusername"
                value={githubusername}
                onChange={e => setGithubusername(e.target.value)}
                error={errors.githubusername}
                info="If you want your latest repos and a GitHub link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                error={errors.bio}
                info="Tell us a little about yourself"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setDisplaySocialInputs(!displaySocialInputs)}
                  className="btn btn-light"
                >
                  Add Social Media Links
                </button>{' '}
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
