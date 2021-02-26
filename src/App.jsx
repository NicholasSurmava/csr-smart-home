import React, { Component } from "react";
import logo from "./assets/house.svg";
import "./App.css";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// function logExecutionTimeStart() {
//   return new Promise((resolve) => {
//     console.time("Execution Time");
//     resolve();
//   });
// }

// function logExecutionTimeEnd() {
//   return new Promise((resolve) => {
//     console.timeEnd("Execution Time");
//     resolve();
//   });
// }

class App extends Component {
  state = {
    weather: {
      TEMPERATURE: "loading...",
      TIME_STRING: "loading...",
      LATITUDE: "loading...",
      LONGITUDE: "loading...",
    },
    power: {
      Batteries: "loading...",
      Breakers: "loading...",
      Voltage: "loading...",
    },
    water: {
      water_level: "loading...",
      water_quality: "loading...",
    },
    internet: {
      isp: "loading...",
      speed: "loading...",
      health: "loading...",
    },
  };

  getWeather = async () => {
    await delay(10000);
    console.log("Getting Weather!");

    const response = await fetch(
      "https://api.oceandrivers.com:443/v1.0/getEasyWind/EW013/?period=latestdata"
    );
    const weather = await response.json();
    console.log(weather);
    this.setState({
      weather: {
        TEMPERATURE: weather.TEMPERATURE + " C",
        TIME_STRING: weather.TIME_STRING,
        LATITUDE: weather.LATITUDE,
        LONGITUDE: weather.LONGITUDE,
      },
    });
  };

  getPower = async () => {
    await delay(3000);
    console.log("Getting power");
    this.setState({
      power: {
        Batteries: "good",
        Breakers: "good",
        Voltage: "26.7v",
      },
    });
  };

  getWater = async () => {
    await delay(5000);
    console.log("Getting Water");
    this.setState({
      water: {
        water_level: "good",
        water_quality: "good",
      },
    });
  };

  getInternet = async () => {
    await delay(2000);
    console.log("Getting internet");
    this.setState({
      internet: {
        isp: "Comcast",
        speed: "1000 mbps",
        health: "good",
      },
    });
  };

  componentDidMount() {
    (async () => {
      this.getWeather();
      this.getPower();
      this.getWater();
      this.getInternet();
    })();
  }

  render() {
    return (
      <React.Fragment>
        <header className="site__header">
          <h1>Smart Home Status</h1>
        </header>
        <main>
          <article className="home__status">
            <header className="home__header">
              <div className="home__brief">
                <p className="home__id">Home ID: 23</p>
                <p className="home__address">100 Chicago St. Barts, WI 60054</p>
              </div>
              <div className="icon__container">
                <img className="home__icon" src={logo} alt="home icon" />
              </div>
            </header>
            <section className="home__summary">
              <h2>Home Summary</h2>
              <div className="info__container">
                <div className="weather__info">
                  <h3>Weather Info</h3>
                  {/* <!-- TODO: Add Refresh button, form submit --> */}
                  <ul>
                    <li>Temperature: {this.state.weather.TEMPERATURE}</li>
                    <li>Time: {this.state.weather.TIME_STRING}</li>
                    <li>LATITUDE: {this.state.weather.LATITUDE}</li>
                    <li>LONGITUDE: {this.state.weather.LONGITUDE}</li>
                  </ul>
                </div>
                <div className="power__info">
                  <h3>Power Info</h3>
                  {/* <!-- TODO: Add Refresh button, form submit --> */}
                  <ul>
                    <li>Batteries: {this.state.power.Batteries}</li>
                    <li>Breakers: {this.state.power.Breakers}</li>
                    <li>Voltage: {this.state.power.Voltage}</li>
                  </ul>
                </div>
                <div className="water__info">
                  <h3>Water Info</h3>
                  {/* <!-- TODO: Add Refresh button, form submit --> */}
                  <ul>
                    <li>Water Level: {this.state.water.water_level}</li>
                    <li>Water Quality: {this.state.water.water_quality}</li>
                  </ul>
                </div>
                <div className="internet__info">
                  <h3>internet Info</h3>
                  {/* <!-- TODO: Add Refresh button, form submit --> */}
                  <ul>
                    <li>ISP: {this.state.internet.isp}</li>
                    <li>Speed: {this.state.internet.speed}</li>
                    <li>Health: {this.state.internet.health}</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>
        </main>
        <div style={{ display: "none" }}>
          Icons made by
          <a
            href="https://www.flaticon.com/authors/vectors-market"
            title="Vectors Market"
          >
            Vectors Market
          </a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
