import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { loadPublish } from '../../actions/profile'
import PublishItem from './PublishItems';

const Publish = ({loadPublish, publishes}) =>{
    useEffect(() => {
        loadPublish();
    }, [])
    return(
        <div>
        {publishes.length > 0 ? (publishes.map(publish => <PublishItem publish={publish} />)) :<h4> no Publishes found</h4>}
        </div>
    )
}

Publish.protoTypes = {
    loadPublish: PropTypes.func.isRequired,
    publishes: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    publishes: state.profile.publishes 
  });

export default connect(mapStateToProps,{loadPublish})(Publish)