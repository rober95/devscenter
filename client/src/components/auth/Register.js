import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const Register = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  const onSubmit = e => {
    e.preventDefault();

    const newUser = { name, email, password, password2 };

    props.registerUser(newUser, props.history);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevsCenter account</p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use
                a Gravatar email"
              />
              <TextFieldGroup
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm Password"
                type="password"
                name="password2"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                error={errors.password2}
              />
              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                value="Sign Up"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
