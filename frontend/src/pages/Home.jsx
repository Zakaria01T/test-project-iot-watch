import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
/* Components */
import Header from '../components/Header';
import HumidityChart from '../components/HumidityChart';

function Home(){
  
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirige vers la page de login si aucun token
      navigate('/login');
    }
  }, [navigate]); 

    return(
        <div className="w-screen max-w-screen min-h-screen bg-zinc-50 flex flex-col">
            <Header />
            <div className="flex-1 flex w-full items-center justify-center flex-col space-y-4">
                <h1 className="font-bold text-5xl">Welcome Home</h1>
                <p className='max-w-xl text-center '>You can navigate through the navbar above to get different temperature data visualizers for the past 7 days.</p>
            </div>
        </div>
    )
}

export default Home;