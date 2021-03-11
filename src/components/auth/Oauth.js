import React, { Fragment, useState} from 'react'
import { connect } from 'react-redux'
// import {Link, Redirect} from 'react-router-dom'
// import { setAlert } from '../../actions/alert'
// import { register } from '../../actions/auth'
// import PropTypes from 'prop-types'
import axios from 'axios'
const Oauth = () => {
    return(
        <Fragment>
            <a href='/api/oauth/google' className="btn btn-success">Continue using Google</a>
            <button onClick= {()=>{window.open("http://localhost:5000/api/oauth/google", "_self");}} >Sign in</button>
        </Fragment>
    )
}
Oauth.protoTypes = {
}

const mapStateToProps = state =>({
})
export default connect()(Oauth);
