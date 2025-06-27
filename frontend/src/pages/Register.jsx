import { Axe } from 'lucide-react';
import React, {useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Register(){
  const navigate = useNavigate()
    const last_name = useRef("");
    const first_name = useRef("");
    const email = useRef("");
    const password = useRef("");

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
        last_name : last_name.current.value,
        first_name : first_name.current.value,
        email : email.current.value,
        password : password.current.value,  
      }
      console.log(data);
      axios.post(API_BASE_URL+"/api/register", data)
      .then(response => {
        Swal.fire({
          title: "Success Message",
          text: response.data.message,
          icon: "success"
        });
        navigate('/login');
      })
      .catch(error => {
        if (error.response) {
          // Le backend a répondu avec un code d'erreur (401, 400, etc.)
          // console.error("Erreur Axios:", error.response.data.message);
          Swal.fire({
            title: "Error Message",
            text: error.response.data.message,
            icon: "error"
          });
          // alert(error.response.data.message); // Affiche le message du backend
        }
      });
      

    };

    return(
        <div className="w-screen max-w-screen min-h-screen bg-zinc-50 flex flex-col">
            <div className="flex-1 flex w-full items-center justify-center flex-col space-y-4">
                <h1 className="font-bold text-5xl">Register</h1>
                <p className='max-w-xl text-center '>Please fill out the form below to create a new account.</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="text" placeholder="last name" className="border p-2 rounded w-full" ref={last_name} />
                    <input type="text" placeholder="first name" className="border p-2 rounded w-full" ref={first_name} />
                    <input type="email" placeholder="Email" className="border p-2 rounded w-full" ref={email} />
                    <input type="password" placeholder="Password" className="border p-2 rounded w-full" ref={password} />
                    <input type="submit" value={"Register"} className='bg-green-300 p-3 text-white rounded w-full' />
                    <p>Already have an account?   <Link
                      to="/login" className="text-blue-500 hover:text-blue-700 ">
                        Login
                      </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}