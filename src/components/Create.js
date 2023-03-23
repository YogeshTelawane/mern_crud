import React, { useState } from 'react';
import './create.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';


const Create = () => {

    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        // confirmPassword: yup.string().oneOf([yup.ref("password", null)]).required(),
        gender: yup.string().required(),
        isActive: yup.boolean().required(),
        country: yup.string().required()
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        // e.preventDefault();
        console.log(data);
        const resp = await axios.post('http://localhost:8800/create', data, {
          headers: {
            "Content-Type": "application/json",
          }});
          e.target.reset();
    }
    // const [value, setValue] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     gender: "",
    //     isActive: false,
    //     country: ""
    // })

    // const handleChange = (e)=>{
    //     // console.log('name',e.target.name)
    //     // console.log('value',e.target.value)

    //     setValue({ ...value, [e.target.name]: e.target.value })

    //     //  console.log(value)
    // }
    // const handleSelectChange = (e)=>{
    //     // console.log(e.target.checked)
    //     setValue({ ...value, isActive: e.target.checked })
    //     // console.log(value)
    // }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>

            <label>Username</label>
            <input type="text" {...register("username", { required: true })} />
            <p style={{ color: 'red' }}>{errors.username?.message}</p>

            <label>Email</label>
            <input type="text" {...register("email", { required: true })} />
            <p style={{ color: 'red' }}>{errors.email?.message}</p>

            <label>Password</label>
            <input type="text" {...register("password", { required: true })} />
            <p style={{ color: 'red' }}>{errors.password?.message}</p>

            <label>Confirm Password</label>
            <input type="text" {...register("confirmPassword", { required: true })} />
            <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>

            <label>isActive</label>
            <input id="check" type="checkbox" {...register("isActive", { required: true })} />
            <p style={{ color: 'red' }}>{errors.isActive?.message}</p>

            <label>Country</label>
            <select {...register("country", { required: true })}>
                <option value="">Select Option</option>
                <option value="india">India</option>
                <option value="pak">Pak</option>
                <option value="america">America</option>
            </select>
            <p style={{ color: 'red' }}>{errors.country?.message}</p>

            <label>Gender</label>
            <div className='radioGender' {...register("gender", { required: true })}>
                <input type="radio" value="Male" name="gender" /> Male
                <input type="radio" value="Female" name="gender" /> Female
                <input type="radio" value="Other" name="gender" /> Other
            </div>
            <p style={{ color: 'red' }}>{errors.gender?.message}</p>

            <button type="submit">Submit</button>
        </form>
    )
}

export default Create;