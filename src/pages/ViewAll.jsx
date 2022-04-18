import React, { useState, useEffect } from "react";
import axios from "axios"; //to get data from api
import Coins from "./Coins";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../css/Watchlist.css";
import { useInterval } from "./useInterval.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ViewAll() {
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState([]); //INITIAL FETCH
  const [search, setSearch] = useState("");
  const [findcoin, setfindcoin] = useState(1);
  const [order_name, setOrderName] = useState("asc");
  const [order_symbol, setOrderSymbol] = useState("asc");
  const [order_price, setOrderPrice] = useState("asc");
  const [order_priceChange, setOrderPriceChange] = useState("asc");
  const [order_volume, setOrderVolume] = useState("asc");
  const [order_mktcap, setOrderMktCap] = useState("asc");

  //fetch api data-----------------------------------------------------------------------
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=650&page=1&sparkline=false&sort_by=asc(current_price)"
      )
      .then((res) => {
        setCoin(res.data);
        setCoins(res.data);
        //  localStorage.setItem('response',JSON.stringify(res.data));
      })
      .catch((error) => console.log(error));
  }, []);

  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=650&page=1&sparkline=false&sort_by=asc(current_price)"
      )
      .then((res) => {
        setCoin(res.data);
        setCoins(res.data);
        //  localStorage.setItem('response',JSON.stringify(res.data));
      })
      .catch((error) => console.log(error));
    setSeconds(seconds + 1);
  }, 10000);

  //handle input change------------------------------------------------------------------
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //filter coins based on input----------------------------------------------------------
  const filterCoins = coins.filter((c) => {
    return c.name.toLowerCase().includes(search.toLowerCase());
  });

  //find if coins are present with search input------------------------------------------
  useEffect(() => {
    if (filterCoins.length) {
      setfindcoin(1);
    } else {
      setfindcoin(0);
    }
  }, [filterCoins]);

  //SORT BY NAME-----------------------------------------------------------
  useEffect(() => {
    var data = coin;
    var arr = [];
    for (let key in data) {
      data[key]["key"] = key;
      arr.push(data[key]);
    }
    arr.sort(function (a, b) {
      if (order_name === "dsc") {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      } else {
        return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
      }
    });

    setCoins(arr);
    // eslint-disable-next-line
  }, [order_name]);

  const handleSortName = () => {
    if (order_name === "asc") {
      setOrderName("dsc");
    } else {
      setOrderName("asc");
    }
  };

  //SORT BY symbol --------------------------------------------------------------
  useEffect(() => {
    var data = coin;
    var arr = [];
    for (let key in data) {
      data[key]["key"] = key;
      arr.push(data[key]);
    }
    arr.sort(function (a, b) {
      if (order_symbol === "dsc") {
        return a.symbol > b.symbol ? 1 : a.symbol < b.symbol ? -1 : 0;
      } else {
        return a.symbol < b.symbol ? 1 : a.name > b.symbol ? -1 : 0;
      }
    });

    setCoins(arr);
    // eslint-disable-next-line
  }, [order_symbol]);

  const handleSortSymbol = () => {
    if (order_symbol === "asc") {
      setOrderSymbol("dsc");
    } else {
      setOrderSymbol("asc");
    }
  };

  //SORT BY PRICE--------------------------------------------------------------
  useEffect(() => {
    var data = coin;
    var arr = [];
    for (let key in data) {
      data[key]["key"] = key;
      arr.push(data[key]);
    }
    arr.sort(function (a, b) {
      if (order_price === "dsc") {
        return a.current_price > b.current_price
          ? 1
          : a.current_price < b.current_price
          ? -1
          : 0;
      } else {
        return a.current_price < b.current_price
          ? 1
          : a.current_price > b.current_price
          ? -1
          : 0;
      }
    });
    setCoins(arr);
    // eslint-disable-next-line
  }, [order_price]);

  const handleSortPrice = () => {
    if (order_price === "asc") {
      setOrderPrice("dsc");
    } else {
      setOrderPrice("asc");
    }
  };

  //SORT BY PRICE_CHANGE-----------------------------------------------------------
  useEffect(() => {
    var data = coin;
    var arr = [];
    for (let key in data) {
      data[key]["key"] = key;
      arr.push(data[key]);
    }
    arr.sort(function (a, b) {
      if (order_priceChange === "dsc") {
        return a.price_change_percentage_24h > b.price_change_percentage_24h
          ? 1
          : a.price_change_percentage_24h < b.price_change_percentage_24h
          ? -1
          : 0;
      } else {
        return a.price_change_percentage_24h < b.price_change_percentage_24h
          ? 1
          : a.price_change_percentage_24h > b.price_change_percentage_24h
          ? -1
          : 0;
      }
    });
    setCoins(arr);
    // eslint-disable-next-line
  }, [order_priceChange]);

  const handleSortPriceChange = () => {
    if (order_priceChange === "asc") {
      setOrderPriceChange("dsc");
    } else {
      setOrderPriceChange("asc");
    }
  };

  //SORT BY PRICE_Volume-----------------------------------------------------------
  useEffect(() => {
    var data = coin;
    var arr = [];
    for (let key in data) {
      data[key]["key"] = key;
      arr.push(data[key]);
    }
    arr.sort(function (a, b) {
      if (order_volume === "dsc") {
        return a.total_volume > b.total_volume
          ? 1
          : a.total_volume < b.total_volume
          ? -1
          : 0;
      } else {
        return a.total_volume < b.total_volume
          ? 1
          : a.total_volume > b.total_volume
          ? -1
          : 0;
      }
    });
    setCoins(arr);
    // eslint-disable-next-line
  }, [order_volume]);

  const handleSortVolume = () => {
    if (order_volume === "asc") {
      setOrderVolume("dsc");
    } else {
      setOrderVolume("asc");
    }
  };

  //SORT BY MKTCAP-----------------------------------------------------------
  useEffect(() => {
    var data = coin;
    var arr = [];
    for (let key in data) {
      data[key]["key"] = key;
      arr.push(data[key]);
    }
    arr.sort(function (a, b) {
      if (order_mktcap === "dsc") {
        return a.market_cap > b.market_cap
          ? 1
          : a.market_cap < b.market_cap
          ? -1
          : 0;
      } else {
        return a.market_cap < b.market_cap
          ? 1
          : a.market_cap > b.market_cap
          ? -1
          : 0;
      }
    });
    setCoins(arr);
    // eslint-disable-next-line
  }, [order_mktcap]);

  const handleSortMktcap = () => {
    if (order_mktcap === "asc") {
      setOrderMktCap("dsc");
    } else {
      setOrderMktCap("asc");
    }
  };

  return (
    <>
      <div className="heading-watch">
        {" "}
        <h2 className="h2"> Crypto List</h2>
      </div>
      <Header show={true} />

      <div className="coin-app">
        <div className="input-group flex-nowrap input">
          <span className="input-group-text coin-input" id="addon-wrapping">
            Search
          </span>
          <input
            type="text"
            className="form-control coin-input"
            placeholder="Search a currency"
            onChange={handleChange}
            aria-label="coin-name"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />

        <div className="table-responsive-sm">
          <table className="table coin-table">
            <thead className="table-head">
              <tr>
                <th>
                  <Button variant="default">
                    <strong>
                      #<br />
                      <br />
                    </strong>
                  </Button>
                </th>
                <th>
                  <Button variant="default">
                    <strong>
                      Coin
                      <br />
                      <br />
                    </strong>
                  </Button>
                </th>
                <th>
                  <Button variant="default" onClick={handleSortName}>
                    {" "}
                    <strong>
                      Name
                      <br />
                    </strong>
                    {order_name === "asc" ? (
                      <i className="fas fa-caret-down"></i>
                    ) : (
                      <i className="fas fa-sort-up"></i>
                    )}
                  </Button>
                </th>
                <th>
                  <Button variant="default" onClick={handleSortSymbol}>
                    {" "}
                    <strong>Symbol</strong>
                    {order_symbol === "asc" ? (
                      <i className="fas fa-caret-down"></i>
                    ) : (
                      <i className="fas fa-sort-up"></i>
                    )}
                  </Button>
                </th>
                <th>
                  <Button variant="default" onClick={handleSortPrice}>
                    {" "}
                    <strong>Price in &#8377;</strong>
                    {order_price === "asc" ? (
                      <i className="fas fa-caret-down"></i>
                    ) : (
                      <i className="fas fa-sort-up"></i>
                    )}
                  </Button>
                </th>
                <th>
                  <Button variant="default" onClick={handleSortPriceChange}>
                    {" "}
                    <strong>Price Change</strong>
                    {order_priceChange === "asc" ? (
                      <i className="fas fa-caret-down"></i>
                    ) : (
                      <i className="fas fa-sort-up"></i>
                    )}
                  </Button>
                </th>
                <th>
                  <Button variant="default" onClick={handleSortVolume}>
                    {" "}
                    <strong>Volume for 24h in &#8377;</strong>
                    {order_volume === "asc" ? (
                      <i className="fas fa-caret-down"></i>
                    ) : (
                      <i className="fas fa-sort-up"></i>
                    )}
                  </Button>
                </th>
                <th>
                  <Button variant="default" onClick={handleSortMktcap}>
                    {" "}
                    <strong>Market Cap in &#8377;</strong>
                    {order_mktcap === "asc" ? (
                      <i className="fas fa-caret-down"></i>
                    ) : (
                      <i className="fas fa-sort-up"></i>
                    )}
                  </Button>
                </th>
                <th>
                  <Button variant="default">
                    <strong>Visualize Price Change</strong>
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filterCoins.map((c, ind) => {
                localStorage.setItem("lists", JSON.stringify(c));

                return (
                  <Coins
                    key={ind}
                    id={ind}
                    coin_id={c.id}
                    name={c.name}
                    image={c.image}
                    symbol={c.symbol}
                    price={c.current_price}
                    volume={c.total_volume}
                    priceChange={c.price_change_percentage_24h}
                    market_cap={c.market_cap}
                  />
                );
              })}
              {findcoin === 0 ? (
                <tr>
                  <td colSpan={9}>No such Cryptocurrency</td>
                </tr>
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* <Footer /> */}
    </>
  );
}

export default ViewAll;
