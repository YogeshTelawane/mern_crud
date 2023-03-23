import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listEmp.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const ListEmp = () => {

    const navigate = useNavigate()
    const [list, setList] = useState([])
    const fetch = async () => {
        const { data } = await axios.get('http://localhost:8800/list')
        console.log(data);
        setList(data)
    }

    const handleEdit = (id)=>{
        navigate(`edit\${id}`)
    }

    const handleDelete = async (id)=>{
        const deleteEmp = await axios.delete(`http://localhost:8800/delete/${id}`);
         fetch()
         toast(`Employee with Id ${id} deleted!`)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className='container'>
            <ToastContainer/>
            <table className='table table-light'>
                <thead className='thead-dark'>
                    <tr>
                        <td>Username</td>
                        <td>Email</td>
                        <td>isActive</td>
                        <td>Country</td>
                        <td>Gender</td>
                        <td>Action</td>
                    </tr>
                </thead>
                {list && list.map(item => {
                    return (
                        <>
                            <tbody>
                                <tr key={item.id}>
                                    <td>
                                        {item.username}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={item.isActive} disabled />
                                    </td>
                                    <td>
                                        {item.country}
                                    </td>
                                    <td>
                                        {item.gender}
                                    </td>
                                    <td>
                                        <button className='btn btn-primary me-2'>View</button>
                                        <button className='btn btn-warning me-2' onClick={()=>handleEdit(item.id)}>Edit</button>
                                        <button className='btn btn-danger me-2' onClick={()=>handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </>
                    )
                })}
            </table>
            <button onClick={()=>{navigate('/create')}}>Back</button>
        </div>
    )
}

export default ListEmp