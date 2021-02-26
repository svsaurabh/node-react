import React, {Fragment, useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { isauthor } from '../../actions/profile';
import { loadProfile } from '../../actions/profile';


const Author = ({loadProfile, isauthor, history}) =>{
    useEffect(() =>{
        loadProfile();
    },[])
    const [formData, setFormdata] = useState({isAuthor: ''})
    const {isAuthor} = formData;
    const onChange = e => setFormdata({...formData, [e.target.name]:e.target.value})

    const onSubmit =async e =>{
        e.preventDefault();
        console.log("submitted")
        isauthor(formData, history);
    }
    return(
        <Fragment>
        <h1 className='large text-primary'>Becoming Author</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                <input 
                    placeholder = 'true/false'
                    name = 'isAuthor'
                    type='text' 
                    value= {isAuthor}
                    onChange={e=>onChange(e)} 
                />
                </div>
                <input type='submit' className='btn btn-primary' value='Submit' />
            </form>
            <p className='my-1'>
                Don't want to become author? <Link to='/authenticated'>Back to Profile</Link>
            </p>
    </Fragment>
    )
}

Author.protoTypes = {
    loadProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    isauthor: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile.isAuthor
  });

export default connect(mapStateToProps,{loadProfile,isauthor})(Author)