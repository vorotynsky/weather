import { useState, useEffect } from 'react';
import { Sun, Moon, CloudRain, Cloud, CloudSnow, CloudLightning, Wind, Droplets, Thermometer } from 'lucide-react';

export default function WeatherUI() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/latest');
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
      }
    };
  
    fetchWeatherData();
    
    const intervalId = setInterval(fetchWeatherData, 1000 * 60 * 5);
    
    return () => clearInterval(intervalId);
  }, []);

  const [timeOfDay, setTimeOfDay] = useState("day");

  useEffect(() => {
    const currentTime = new Date().getTime() / 1000;
    const sunrise = weatherData?.sys.sunrise || (new Date(new Date(Date.now()).setHours(6, 0, 0)).getTime() / 1000)
    const sunset = weatherData?.sys.sunset || (new Date(new Date(Date.now()).setHours(20, 0, 0)).getTime() / 1000)
    if ((currentTime > sunrise && currentTime < sunset)) {
      setTimeOfDay("day");
    } else {
      setTimeOfDay("night");
    }
  }, [weatherData]);

  const getBgColor = () => {
    if (timeOfDay === "day") {
      return "bg-gradient-to-br from-blue-400 to-blue-600";
    } else {
      return "bg-gradient-to-br from-indigo-900 to-purple-900";
    }
  };

  const getWeatherIcon = () => {
    if (weatherData == null) return <></>

    const iconCode = weatherData.weather[0].icon;
    const weatherId = weatherData.weather[0].id;

    if (weatherId >= 200 && weatherId < 300) {
      return <CloudLightning size={64} className="text-yellow-400" />;
    } else if (weatherId >= 300 && weatherId < 600) {
      return <CloudRain size={64} className="text-blue-300" />;
    } else if (weatherId >= 600 && weatherId < 700) {
      return <CloudSnow size={64} className="text-white" />;
    } else if (weatherId >= 700 && weatherId < 800) {
      return <Wind size={64} className="text-gray-300" />;
    } else if (weatherId === 800) {
      return timeOfDay === "day" ? 
        <Sun size={64} className="text-yellow-400" /> : 
        <Moon size={64} className="text-yellow-200" />;
    } else {
      return <Cloud size={64} className="text-gray-300" />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatTemperature = (temp) => {
    if (!temp) return "unknown"
    return Math.round(temp) + "°C";
  };

  const getDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    return days[date.getDay()];
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${getBgColor()}`}>
      <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">{weatherData?.name ?? "Loading..."}</h1>
              {
                !!weatherData &&
                  <p className="text-white/80">{weatherData.sys.country}, {getDayName()}</p>
              }
            </div>
            <div className="text-right">
              {
                !!weatherData &&
                  <>
                    <p className="text-4xl font-bold text-white">{formatTemperature(weatherData.main.temp)}</p>
                    <p className="text-white/80">Feels like {formatTemperature(weatherData.main.feels_like)}</p>
                  </>
              }
            </div>
          </div>

          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              {getWeatherIcon()}
              <h2 className="text-xl font-semibold text-white mt-2">{weatherData?.weather[0].main ?? ""}</h2>
              <p className="text-white/80 capitalize">{weatherData?.weather[0].description ?? ""}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 rounded-xl p-4">
              <div className="flex items-center">
                <Thermometer className="text-white mr-2" size={18} />
                <span className="text-white/80">Min/Max</span>
              </div>
              {
                !!weatherData &&
                  <p className="text-white text-lg mt-1">
                    {formatTemperature(weatherData?.main.temp_min)} / {formatTemperature(weatherData?.main.temp_max)}
                  </p>
              }
            </div>

            <div className="bg-white/20 rounded-xl p-4">
              <div className="flex items-center">
                <Wind className="text-white mr-2" size={18} />
                <span className="text-white/80">Wind</span>
              </div>
              {
                !!weatherData &&
                  <p className="text-white text-lg mt-1">{weatherData.wind.speed} m/s</p>
              }
            </div>

            <div className="bg-white/20 rounded-xl p-4">
              <div className="flex items-center">
                <Droplets className="text-white mr-2" size={18} />
                <span className="text-white/80">Humidity</span>
              </div>
              {
                !!weatherData &&
                  <p className="text-white text-lg mt-1">{weatherData.main.humidity}%</p>
              }
            </div>

            <div className="bg-white/20 rounded-xl p-4">
              <div className="flex items-center">
                <Sun className="text-white mr-2" size={18} />
                <span className="text-white/80">Sunrise/Sunset</span>
              </div>
              {
                !!weatherData && 
                  <p className="text-white text-lg mt-1">
                    {formatTime(weatherData.sys.sunrise)} / {formatTime(weatherData.sys.sunset)}
                  </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
