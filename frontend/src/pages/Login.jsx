import React, {useRef,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';

export default function Login() {

    const email = useRef("");
    const password = useRef("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          // Redirige vers la page de login si aucun token
          navigate('/');
        }
      }, [navigate]); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email.current.value,
            password: password.current.value,
        }
        axios.post(API_BASE_URL+"/api/login", data)
        .then(response => {
          Swal.fire({
            title: "Success Message",
            text: response.data.message,
            icon: "success"
          });
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        })
        .catch(error => {
          if (error.response) {
            Swal.fire({
              title: "Error Message",
              text: error.response.data.message,
              icon: "error"
            });
          } 
        });
    };

    return (
        <div className="w-screen max-w-screen min-h-screen bg-zinc-50 flex flex-col">
            <div className="flex-1 flex w-full items-center justify-center flex-col space-y-4">
                <h1 className="font-bold text-5xl">Login</h1>
                <p className='max-w-xl text-center'>Please fill out the form below to log in to your account.</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" className="border p-2 rounded w-full" ref={email} />
                    <input type="password" placeholder="Password" className="border p-2 rounded w-full" ref={password} />
                    <input type="submit" value={"Login"} className='bg-blue-500 p-3 text-white rounded w-full' />
                </form>
                <p>Don't have an account? <Link to="/register" className='text-blue-500'>Register here</Link></p>
            </div>
        </div>
    );
}