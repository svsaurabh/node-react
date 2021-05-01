import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {publish} from '../../actions/profile'

const Createpublish = ({publish}) =>{
    const [formData, setFormData] = useState({
        technology: '',
        type: '',
        detail:''
    })

    const {technology, type, detail} = formData
    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        publish({technology, type, detail})
    }

    return(
        <Fragment>
        <section className= "landing">
        <h1 className='large text-primary'>Publish</h1>
            <p className='lead'><i className='fas fa-user'></i>Publish something</p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                <input 
                    type='text' 
                    placeholder='Technology' 
                    name='technology' 
                    value={technology} 
                    onChange={e=>onChange(e)} 
                />
                </div>
                <div className='form-group'>
                <input 
                    type='text' 
                    placeholder='Type' 
                    name='type' 
                    value={type} 
                    onChange={e=>onChange(e)} 
                />
                </div>
                <div className='form-group'>
                <input 
                    type='text' 
                    placeholder='Details' 
                    name='detail' 
                    value={detail} 
                    onChange={e=>onChange(e)} 
                />
                </div>
                <input type='submit' className='btn btn-primary' value='Post' />
            </form> 
            </section>  
            </Fragment>     
    )
}

Createpublish.protoTypes = {
    publish: PropTypes.func.isRequired,

}

const mapStateToProps = state =>({
  });

export default connect(mapStateToProps,{publish})(Createpublish)