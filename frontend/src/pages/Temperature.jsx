import React,{useEffect} from 'react';

/* Components */
import Content from '../components/Content';
import Header from '../components/Header';
// import TemperaturePrediction from '../components/TemperaturePrediction';
// import WeeklyStats from '../components/WeeklyStats';
import { useNavigate } from 'react-router-dom';
function Temperature(){

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirige vers la page de login si aucun token
      navigate('/login');
    }
  }, [navigate]); 
  console.log("Temperature page loaded");
    return(
        <div className="w-screen max-w-screen min-h-screen bg-zinc-50">
      <Header />
      <Content />
      {/* <TemperaturePrediction />
      <WeeklyStats /> */}
    </div>
    )
}

export default Temperature;