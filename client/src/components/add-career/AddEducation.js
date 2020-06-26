import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

const AddEducation = props => {
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldofstudy, setFieldofstudy] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  const onSubmit = e => {
    e.preventDefault();

    const eduData = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    props.addEducation(eduData, props.history);
  };

  const onCheck = () => {
    setDisabled(!disabled);
    setCurrent(!current);
  };

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={school}
                onChange={e => setSchool(e.target.value)}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={degree}
                onChange={e => setDegree(e.target.value)}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="* Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={e => setFieldofstudy(e.target.value)}
                error={errors.fieldofstudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={from}
                onChange={e => setFrom(e.target.value)}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={to}
                onChange={e => setTo(e.target.value)}
                error={errors.to}
                disabled={disabled ? 'disabled' : ''}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Currently Attending this School
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Program Description"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                error={errors.description}
                info="Tell us about the program that you were in"
              />
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
