
import WeatherApp from './components/WeatherApp/WeatherApp';
import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
<ToastContainer />
<WeatherApp/>
    </div>
  );
}

export default App;
