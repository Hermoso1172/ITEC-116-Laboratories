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
  UmbrellaOff,
  Calendar,
} from "lucide-react";

const WeatherNow = () => {
  const [city, setCity] = useState("");
  const [noCity, setNoCity] = useState(null);
  const [weather, setWeather] = useState(null);

  const convertDate = (date) => {
    const currentDate = new Date(date);
    const localeString = currentDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return localeString;
  };

  const convertTime = (date) => {
    const currentDate = new Date(date);
    return currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) {
      alert("Input a city");
    }
    getWeather();
  };

  const getWeather = async () => {
    try {
      const response = await fetch(`http://localhost:3000/weather?q=${city}`);
      if (!response.ok) {
        const data = await response.json();
        const err = new Error(data.error?.message || "Unknown error");
        err.code = data.error?.code || 0;
        throw err;
      }
      setNoCity(false);
      const data = await response.json();
      setWeather({
        location: {
          name: data.location.name,
          region: data.location.region,
          country: data.location.country,
          localtime: data.location.localtime,
        },
        windspeed: data.current.wind_kph,
        temp_c: data.current.temp_c,
        is_day: data.current.is_day,
        condition: {
          text: data.current.condition.text,
          icon: data.current.condition.icon,
          code: data.current.condition.code,
        },
        feelslike_c: data.current.feelslike_c,
        humidity: data.current.humidity,
        hours: data.forecast.forecastday[0].hour.map((h) => ({
          time: convertTime(h.time),
          temp_c: h.temp_c,
          condition: {
            text: h.condition.text,
            icon: h.condition.icon,
            code: h.condition.code,
          },
        })),
      });
    } catch (error) {
      if (error.code === 1006) {
        console.error(error?.message ?? "Something went wrong with the api");
        setNoCity(true);
        setWeather(null);
      } else {
        setNoCity(true);
        setWeather(null);
        console.error("Something went wrong:", error);
      }
    }
  };

  useEffect(() => {
    console.log(weather?.is_day);
  }, [weather]);

  const bgColor = weather?.is_day === 1 ? "bg-blue-200" : "bg-gray-900";
  const textColor = weather?.is_day === 1 ? "text-black" : "text-white";

  return (
    <div
      className={`transition-colors min-h-screen duration-700 ${bgColor} ${textColor} `}
    >
      {noCity === null && weather === null ? (
        <div className="py-6 w-full  px-30">
          <form
            onSubmit={handleSearch}
            className="flex justify-between items-center"
          >
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
              <Search className="absolute left-2 top-1.5 " size={16} />
            </div>
          </form>

          <div className="flex flex-col justify-center items-center min-h-[60vh]  text-center">
            <UmbrellaOff size={100} className="" />
            <h1 className="text-3xl font-bold mb-4 ">No City Selected Yet.</h1>
            <p className=" mb-6">
              Type a city name above to check the weather.
            </p>
          </div>
        </div>
      ) : noCity === false && weather !== null ? (
        <div className="flex justify-center items-center">
          <div className="py-6 w-full  px-30">
            {/* Header */}
            <form
              onSubmit={handleSearch}
              className="flex justify-between items-center mb-4"
            >
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
                <Search className="absolute left-2 top-1.5 " size={16} />
              </div>
            </form>

            {/* Main Weather Section */}
            <div className="flex justify-between items-center mb-6">
              <div className="w-full">
                <div className="flex w-full">
                  <div
                    className={`${
                      weather?.is_day === 1 ? "bg-gray-100  " : "bg-[#1E1E1E]"
                    }  border w-full flex flex-col gap-4 rounded-lg p-4 space-y-2`}
                  >
                    <h2 className="text-5xl font-bold">{weather.temp_c}° C</h2>
                    <p className=" mt-2 flex text-sm items-center gap-2">
                      <img
                        src={weather.condition.icon}
                        alt="weather icon"
                        width={45}
                      />
                      {weather.condition.text}
                    </p>
                    <p className="text-sm mt-2 px-2 flex items-center gap-2 ">
                      <Calendar size={35} />
                      {weather.location.localtime}
                    </p>

                    <div className="flex items-center gap-2 px-2 mt-3 ">
                      <MapPin size={35} />
                      <p>
                        {weather.location.name}, {weather.location.region}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weather Info Row */}
                <div
                  className={`flex w-full justify-between items-center text-sm mt-5 border px-4 py-2 rounded-md ${
                    weather?.is_day === 1 ? "bg-gray-100  " : "bg-[#1E1E1E]"
                  } `}
                >
                  <div className="flex items-center">
                    <Thermometer size={45} />
                    <div className="flex flex-col ml-2">
                      <p className="font-semibold">Feels Like</p>
                      <p className=" text-2xl">{weather.feelslike_c}° C</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Droplets size={45} />
                    <div className="flex flex-col ml-2">
                      <p className="font-semibold">Humidity</p>
                      <p className=" text-2xl">{weather.humidity}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Wind size={45} />
                    <div className="flex flex-col ml-2">
                      <p className="font-semibold">Wind Speed</p>
                      <p className="">{weather.windspeed}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today’s Weather */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Today’s Weather</h3>
              <div
                className={`${
                  weather?.is_day === 1 ? "bg-gray-100  " : "bg-[#1E1E1E]"
                }  border  rounded-2xl p-4 space-y-2`}
              >
                {weather.hours.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-2 py-3"
                  >
                    <span>{item.time}</span>
                    <span>
                      <img
                        src={item.condition.icon}
                        alt="weather icon"
                        width={50}
                      />
                    </span>
                    <span>{item.temp_c}° C</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        noCity === true &&
        weather === null && (
          <div className="py-6 w-full    px-30">
            <form
              onSubmit={handleSearch}
              className="flex justify-between items-center"
            >
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
                <Search className="absolute left-2 top-1.5 " size={16} />
              </div>
            </form>

            <div className="flex flex-col justify-center items-center min-h-[60vh]  text-center">
              <TriangleAlert size={100} className="text-red-400" />
              <h1 className="text-3xl font-bold mb-4 ">Can’t find “{city}”</h1>
              <p className=" mb-6">
                Please check the spelling or try searching for another city.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherNow;
