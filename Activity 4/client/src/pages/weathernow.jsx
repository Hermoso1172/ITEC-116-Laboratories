import React, { useState, useEffect } from "react";
import {
  MapPin,
  Droplets,
  Wind,
  CloudSun,
  CloudRain,
  Sun,
  Moon,
  Cloud,
  Search,
  Thermometer,
  TriangleAlert,
} from "lucide-react";

const WeatherNow = () => {
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");
  const [found, setFound] = useState(true);
  const [ipAddress, setIpAddress] = useState(null);

  const hourlyWeather = [
    { time: "02:00 PM", icon: <CloudRain size={24} />, temp: "31°" },
    { time: "03:00 PM", icon: <CloudSun size={24} />, temp: "21°" },
    { time: "05:00 PM", icon: <Sun size={24} />, temp: "32°" },
    { time: "06:00 PM", icon: <Moon size={24} />, temp: "15°" },
    { time: "07:00 PM", icon: <Cloud size={24} />, temp: "15°" },
  ];

 
  const validCities = ["manila", "tokyo", "london", "new york", "paris"];


  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIpAddress(data.ip);
        console.log("User IP address:", data.ip);
      })
      .catch((err) => {
        console.error("Could not fetch IP address:", err);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedCity(city);
    if (validCities.includes(city.trim().toLowerCase())) {
      setFound(true);
    } else {
      setFound(false);
    }
  };

  // Not Found Screen
  if (!found) {
    return (
      <div className="py-6 w-full bg-white px-30">
        <form onSubmit={handleSearch} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
              alt="weather logo"
              className="w-8 h-8"
            />
            <h1 className="font-semibold text-lg">WeatherNow</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Another City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-full py-1 pl-8 pr-4 text-sm w-48 focus:outline-none"
            />
            <Search
              className="absolute left-2 top-1.5 text-gray-400"
              size={16}
            />
          </div>
        </form>

        <div className="flex flex-col justify-center items-center min-h-[60vh] bg-white text-center">
          <TriangleAlert size={100} className="text-red-400" />
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Can’t find “{submittedCity}”
          </h1>
          <p className="text-gray-600 mb-6">
            Please check the spelling or try searching for another city.
          </p>
          {ipAddress && (
            <p className="text-sm text-gray-500">
              Your IP: {ipAddress}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Main Weather Page
  return (
    <div className="bg-white flex justify-center items-center">
      <div className="py-6 w-full bg-white px-30">
        {/* Header */}
        <form onSubmit={handleSearch} className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
              alt="weather logo"
              className="w-8 h-8"
            />
            <h1 className="font-semibold text-lg">WeatherNow</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Another City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-full py-1 pl-8 pr-4 text-sm w-48 focus:outline-none"
            />
            <Search
              className="absolute left-2 top-1.5 text-gray-400"
              size={16}
            />
          </div>
        </form>

       
        {ipAddress && (
          <div className="mb-4 text-xs text-gray-500">
            Your IP: {ipAddress}
          </div>
        )}

       
        {/* Main Weather Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-full">
            <div className="flex w-full">
              <div className="w-1/2">
                <h2 className="text-5xl font-bold">31° C</h2>
                <p className="text-gray-600 text-lg mt-2 flex items-center gap-2">
                  <CloudSun className="text-yellow-400" size={22} />
                  Partly Cloudy
                </p>
                <p className="text-gray-500 text-sm mt-2">2025-10-28 • 9:19PM</p>

                <div className="flex items-center gap-2 mt-3 text-gray-700">
                  <MapPin size={18} />
                  <p>Manila, Manila, Philippines</p>
                </div>
              </div>

              <div className="w-1/2 flex justify-end">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
                  alt="weather icon"
                  className="w-32 h-32"
                />
              </div>
            </div>

            {/* Weather Info Row */}
            <div className="flex w-full justify-between items-center text-sm mt-5">
              <div className="flex items-center">
                <Thermometer size={45} />
                <div className="flex flex-col ml-2">
                  <p className="font-semibold">Feels Like</p>
                  <p className="text-black text-2xl">31° C</p>
                </div>
              </div>

              <div className="flex items-center">
                <Droplets size={45} />
                <div className="flex flex-col ml-2">
                  <p className="font-semibold">Humidity</p>
                  <p className="text-black text-2xl">94</p>
                </div>
              </div>

              <div className="flex items-center">
                <Wind size={45} />
                <div className="flex flex-col ml-2">
                  <p className="font-semibold">Air Condition</p>
                  <p className="text-gray-700">Moderate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today’s Weather */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Today’s Weather</h3>
          <div className="bg-[#1E1E1E] text-white rounded-2xl p-4 space-y-2">
            {hourlyWeather.map((item, index) => (
              <div key={index} className="flex justify-between items-center px-2 py-3">
                <span>{item.time}</span>
                <span>{item.icon}</span>
                <span>{item.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherNow;