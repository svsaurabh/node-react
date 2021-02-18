import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {

  if(isAuthenticated){
    return <Redirect to='/authenticated'/>;
  }
    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large"> </h1>
          <div className="buttons">
            <Link to='/register' className="btn btn-primary">Sign Up</Link>
            <Link to='/login' className="btn btn-dark">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}

Landing.protoTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing)
