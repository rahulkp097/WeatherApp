import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';
import { toast } from 'react-toastify';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import Loader from '../Loader';




function WeatherApp() {
  const [wicon, setWicon] = useState(cloud_icon);
  const [element, setElement] = useState('palakkad');
  const [isLoading, setIsLoading] = useState(false);
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [location, setLocation] = useState('');
  useEffect(() => {
   
    search();
  }, []);
  let api_key = 'de78e2337d3a8557c9150ee84a2ea26e';

  const search = async () => {
    if (element === undefined) {
      return toast.warning('Please Enter something');
    }
    setIsLoading(true);

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${api_key}&units=Metric`;
      let { data } = await axios.get(url);
      setIsLoading(false);
        console.log(data,"data")
      setHumidity(data?.main.humidity + '%');
      setWindSpeed(Math.floor(data?.wind.speed) + ' km/h');
      setTemperature(Math.floor(data?.main.temp) + '°C');
      setLocation(data.name);

      let weatherIcon = clear_icon; // Default icon

      
      switch (data.weather[0].icon) {
        case '01d':
        case '01n':
          weatherIcon = clear_icon;
          break;
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
          weatherIcon = cloud_icon;
          break;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
          weatherIcon = rain_icon;
          break;
        case '13d':
        case '13n':
          weatherIcon = snow_icon;
          break;
        default:
          weatherIcon = clear_icon;
      }
      

      setWicon(weatherIcon);
    } catch (error) {
      setIsLoading(false);
      toast.warning('City not found');
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          onChange={(e) => setElement(e.target.value)}
          type='text'
          className='cityInput'
          placeholder='search'
        />
        {isLoading? <Loader/> :
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt='' />
        </div>
        }
      </div>

      

      <div className='weather-image'>
        <img src={wicon} alt='' />
      </div>
      <div className='weather-temp'>{temperature}</div>
      <div className='weather-location'>{location}</div>

      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' className='icon' />
          <div className='data'>
            <div className='humidity-percentage'>{humidity}</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='' className='icon' />
          <div className='data'>
            <div className='wind-rate'>{windSpeed}</div>
            <div className='text'>Wind speed</div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default WeatherApp;
