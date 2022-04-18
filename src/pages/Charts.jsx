import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import CoinData from "./CoinData";
import "../css/CoinData.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { useInterval } from "./useInterval.js";
import HistoryChart from "./HistoryChart";

const Charts = () => {
  const { id } = useParams();
  const [coinsOneday, setCoinsOneDay] = useState([]);
  const [coinsOneWeek, setCoinsOneWeek] = useState([]);
  const [coinsOneYear, setCoinsOneYear] = useState([]);
  const [coinDetails, setCoinDetails] = useState([]);
  const [error, seterror] = useState(false);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(false);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=1`
      )
      .then((res) => {
        setCoinsOneDay(res.data);
      })
      .catch((error) => seterror(true));

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=7`
      )
      .then((res) => {
        setCoinsOneWeek(res.data);
      })
      .catch((error) => seterror(true));
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=365`
      )
      .then((res) => {
        setCoinsOneYear(res.data);
      })
      .catch((error) => seterror(true));

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${id}`
      )
      .then((res) => {
        setCoinDetails(res.data);
      })
      .catch((error) => seterror(true));
    setloaded(true);
  }, [id]);

  //----------------- CALL API Every 2sec---------------------------------------------------------------------

  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setloaded(false);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=1`
      )
      .then((res) => {
        setCoinsOneDay(res.data);
      })
      .catch((error) => seterror(true));

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=7`
      )
      .then((res) => {
        setCoinsOneWeek(res.data);
      })
      .catch((error) => seterror(true));
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=365`
      )
      .then((res) => {
        setCoinsOneYear(res.data);
      })
      .catch((error) => seterror(true));

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${id}`
      )
      .then((res) => {
        setCoinDetails(res.data);
      })
      .catch((error) => seterror(true));
    setloaded(true);

    setSeconds(seconds + 1);
  }, 120000);
  //--------------------------------------------------------------------------------------------------
  const renderData = () => {
    if (!loaded) {
      return <div>Loading....</div>;
    }

    return (
      <div className="coinlist">
        {error ? (
          <Redirect to="/" />
        ) : (
          <div>
            <div className="heading">
              {" "}
              <h2 className="h2"> Vizualization</h2>
            </div>
            <Header show={true} />
            <br />
            <CoinData data={coinDetails[0]} />
            <br /> <br /> <br /> <br />
            <HistoryChart
              days={coinsOneday}
              weeks={coinsOneWeek}
              years={coinsOneYear}
              details={coinDetails[0]}
            />
            <br />
            <br />
            <br />
            <br />
            {/* <Footer/> */}
          </div>
        )}
      </div>
    );
  };
  return renderData();
};

export default Charts;
