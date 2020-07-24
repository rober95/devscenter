import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = props => (
  <>
    <Navbar />
    {props.location.pathname === '/' ? (
      <main>{props.children}</main>
    ) : (
      <main className="container d-flex flex-column main-container mb-5">
        {props.children}
      </main>
    )}
    <Footer />
  </>
);

export default withRouter(Layout);
