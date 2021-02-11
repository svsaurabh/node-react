import React, { Fragment } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'

const Authenticated = ({auth: {isAuthenticated } , logout}) => {
    return (
        <Fragment>
            <a onClick={logout} href='/'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Logout</span></a>
        </Fragment>
    )
}
Authenticated.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = state =>({
    auth: state.auth
  });
  
export default connect(mapStateToProps, { logout })(Authenticated)
  