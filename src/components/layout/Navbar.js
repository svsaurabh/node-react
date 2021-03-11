import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'

const Navbar = ({auth: {isAuthenticated, user}, logout}) => {
    const guestLinks = (
        <ul>
        <li><Link to='/publish'>Publishes</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
        </ul>
        )
        const authLinks = (
            <ul>
            <li><Link to='/publish'>Publishes</Link></li>
            <li>
              <a onClick={logout} href='/'>
                <i className='fas fa-sign-out-alt'></i>{' '}
                <span className='hide-sm'>Logout</span></a>
            </li>
            </ul>
            )
    return (
        <nav className='navbar bg-dark'>
        <h1>
        <i className='fas fa-code'> Welcome {user && user.name} </i>
        </h1>
        <Fragment>
            {isAuthenticated? authLinks :guestLinks }
        </Fragment>
        </nav>
        
    )
}

Navbar.protoTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = state =>({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { logout })(Navbar)
  