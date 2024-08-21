import React, {useState} from 'react';
import axios from "axios";
import './weather_jj.css'


function WeatherJj() {
    const [search, setSearch] = useState("");
    const [weatherData, setWeatherData] = useState()

    const handleSearch = () => {

        if (search) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ac671fd30bab185785aea12741485850`,
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setWeatherData(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const geticon = () => {
        const icon = weatherData?.weather[0].icon
        return `http://openweathermap.org/img/wn/${icon}@2x.png`
    }


    return (
        <div className="search-engine">
            <div className="search-input">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Enter a City Name"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <button
                    className="search-button"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <div className="weatherOfCity">
                {weatherData ? (
                    <>
                        <h3>Weather of {weatherData?.name} </h3>
                        <img src={geticon()} alt="Weather Icon"/>
                        <p>The weather is {weatherData?.weather[0].main}</p>
                        <p>Temperature: {weatherData?.main.temp}</p>
                        <p>humidity: {weatherData?.main.humidity}</p>
                        <p>Visibility: {weatherData?.visibility}</p>
                        <p>Wind spead: {weatherData?.wind.speed}</p>


                    </>
                ) : null}

            </div>


        </div>
    );
}

export default WeatherJj;