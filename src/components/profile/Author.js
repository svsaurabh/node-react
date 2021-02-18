import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



const Author = ({auth: {isAuthenticated, user}}) =>{
    return(
        <Fragment>This is Author page</Fragment>
    )
}

Author.protoTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth
  });

export default connect(mapStateToProps)(Author)