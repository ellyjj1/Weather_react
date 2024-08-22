import React, {useState} from 'react';
import axios from "axios";
import './weather_jj.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function WeatherJj() {
    const [search, setSearch] = useState("");
    const [weatherData, setWeatherData] = useState()
    const [backGroundImage, setBackGroundImage] = useState("00")
    const [status, setstatus] = useState("")

    const handleSearch = () => {
        if (search) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ac671fd30bab185785aea12741485850`,
            };

            axios.request(config)
                .then((response) => {
                    setWeatherData(response.data)
                    setBackGroundImage(response.data.weather[0].icon.substring(0, 2))
                    setstatus("")
                })
                .catch((error) => {
                        if (error.code === "ERR_NETWORK") {
                            setstatus("Network Error")
                            console.log(error);
                        } else if (error.code === "ERR_BAD_REQUEST") {
                            setstatus("Please enter a valid city name")
                            console.log(error);
                        } else {
                            setstatus("Something went wrong")
                            console.log(error);
                        }

                    }
                );
        }
    };

    const getIcon = () => {
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
                <Button
                    className="search-button"
                    variant="secondary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>

            <div className="weatherOfCity" style={{
                backgroundImage: 'url(' + require(`./assets/${backGroundImage}.jpg`) + ')',
            }}>
                {status ? (
                    <p className="error-status">{status}</p>
                ) : (
                    <div className="weatherdata">
                        {weatherData ? (
                            <>
                                <h3>Weather of {weatherData?.name} </h3>
                                <img src={getIcon()} alt="Weather Icon"/>
                                <p>The weather is {weatherData?.weather[0].main}</p>
                                <p>Temperature: {weatherData?.main.temp}</p>
                                <p>humidity: {weatherData?.main.humidity}</p>
                                <p>Visibility: {weatherData?.visibility}</p>
                                <p>Wind spead: {weatherData?.wind.speed}</p>
                            </>
                        ) : null}
                    </div>)}

            </div>

        </div>
    );
}

export default WeatherJj;