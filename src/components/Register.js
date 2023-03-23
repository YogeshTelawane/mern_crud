import React, { useState } from 'react';
import './register.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useNavigate , useParams} from 'react-router-dom'

const Register = () => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required(),
        country: yup.string().required(),
        gender: yup.string().required()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {

        let method = id ? "put" : "post"
        e.preventDefault();
        setLoading(true)
        const create = await axios.post('http://localhost:8800/create', data);
        setLoading(false);
        toast('Employee Created Successfully')
        navigate('/list')
    }

    return (
        <div className="row">
            <div className="mx-auto col-6">
            <ToastContainer />
                <form className='mt-5' autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center mb-3 mt-3'>{id? 'Update' : "Register"}</h1>
                    {loading ? <Loader /> : <><div className='form-group'>
                        {/* <label>Username</label> */}
                        <input type="text" placeholder='Username' {...register('username', { required: true })} className='form-control' />
                        <span>{errors.username?.message}</span>
                    </div><div className="form-group">
                            {/* <label>Email</label> */}
                            <input placeholder='Email' type="email" className="form-control" {...register('email', { required: true })} />
                            <span>{errors.email?.message}</span>
                        </div><div className="form-group">
                            {/* <label>Password:</label> */}
                            <input placeholder='Password' type="password" className="form-control" {...register('password', { required: true })} />
                            <span>{errors.password?.message}</span>
                        </div><div className='form-group'>
                            {/* <label>Confirm Password</label> */}
                            <input placeholder='Confirm Password' type="password" className='form-control' {...register('confirmPassword', { required: true })} />
                            <span>{errors.confirmPassword?.message}</span>
                        </div><div className="checkbox mt-3 mb-3">
                            <label>isActive <input type="checkbox" /></label>
                        </div><div>
                            <label className='form-label'>Country</label>
                            <select className='form-select mb-3' {...register('country', { required: true })}>
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="Pak">Pak</option>
                                <option value="Us">US</option>
                                <option value="Japan">Japan</option>
                            </select>
                            <span>{errors.country?.message}</span>
                        </div>
                        
                        <div>
                            <label className='me-3 mb-3'>Gender</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" {...register('gender')} type="radio" name="gender" value="Male" id="inlineRadio1"/>
                                <label className="form-check-label" for="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" {...register('gender')} type="radio" name='gender' value="Female" id="inlineRadio2"/>
                                <label className="form-check-label" for="inlineRadio2">Female</label>
                            </div>
                            {/* <p>{errors.gender?.type === "required" && "Select Gender"}</p> */}
                        </div>
                        
                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">{id ? 'Edit' : 'Submit'}</button>
                        </div></>}
                </form>
            </div>
        </div>

    )
}

export default Register