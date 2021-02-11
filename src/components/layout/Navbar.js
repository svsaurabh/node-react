import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'

const Navbar = ({auth: {isAuthenticated, user}, logout}) => {
    const guestLinks = (
        <ul>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
        </ul>
        )
    return (
        <nav className='navbar bg-dark'>
        <h1>
        <i className='fas fa-code'> Welcome {user && user.name} </i>
        </h1>
        <Fragment>{guestLinks}</Fragment>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = state =>({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { logout })(Navbar)
  