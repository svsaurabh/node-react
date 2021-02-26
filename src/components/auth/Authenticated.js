import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {loadUser} from '../../actions/auth'
import {logout} from '../../actions/auth'

const Authenticated = ({auth: {isAuthenticated, user, loading }, logout, loadUser}) => {
  // if(!isAuthenticated){
  //   <Redirect to='/login'/>
  // }
  useEffect(() =>{
    loadUser()
  }, [])
  const content = ( 
  <Fragment>
    <a onClick={logout} href='/'>
    <i className='fas fa-sign-out-alt'></i>{' '}
    <span className='hide-sm'>Logout</span></a><br></br><hr></hr>
    <Fragment>{user?<Fragment> Name : {user.name} <br></br> Author: {user.isAuthor?<Fragment>true</Fragment> :<Fragment> false </Fragment>} <br></br> </Fragment>: null}</Fragment>
    <hr></hr>
    {!loading?  (user.isAuthor === false ? (<Fragment> Want to become Author. <a href= "/author">Apply Now? </a></Fragment>):<Fragment> You are author</Fragment> /*<Link to= '/publish' className = 'btn btn-primary'>Publish</Link>*/ ): null}
  </Fragment>
  ) 
  return (
    
          <Fragment>{isAuthenticated ?  content : <Fragment> You are now logged in <a href = '/login'> Go To Login</a>  </Fragment> } </Fragment>
  )
}
Authenticated.protoTypes = {
    loadUser:PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = state =>({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, {loadUser, logout })(Authenticated)
  