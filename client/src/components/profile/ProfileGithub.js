import React, { useState, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileGithub = ({ username }) => {
  const myRef = createRef();
  //eslint-disable-next-line
  const [client_id, setClient_id] = useState(
    process.env.REACT_APP_GITHUB_CLIENT_ID
  ); //eslint-disable-next-line
  const [client_secret, setClient_secret] = useState(
    process.env.REACT_APP_GITHUB_CLIENT_SECRET
  ); //eslint-disable-next-line
  const [count, setCount] = useState(5); //eslint-disable-next-line
  const [sort, setSort] = useState('created: asc');
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`,
        { client_id, client_secret }
      );
      const data = await res.json();
      if (myRef.current) setRepos(data);
    })(); //eslint-disable-next-line
  }, []);

  const repoItems =
    repos.message === 'Not Found' ? (
      <p>No GitHub repos found for this user</p>
    ) : (
      repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ))
    );

  return (
    <div ref={myRef}>
      <hr />
      <h3 className="mb-4">Latest GitHub Repos</h3>
      {repoItems}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
