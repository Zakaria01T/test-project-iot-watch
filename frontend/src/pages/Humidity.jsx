import React, {useEffect} from 'react';

/* Components */
import Header from '../components/Header';
import HumidityChart from '../components/HumidityChart';
import { useNavigate } from 'react-router-dom';
function Humidity(){
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirige vers la page de login si aucun token
      navigate('/login');
    }
  }, [navigate]); 
    return(
        <div className="w-screen max-w-screen min-h-screen bg-zinc-50">
      <Header />
      <div className='flex justify-center items-center'>

      <HumidityChart/>

      </div>
    </div>
    )
}

export default Humidity;