import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
// import Button from 'react-bootstrap/Button'
import "../css/Watchlist.css";

import { Link } from "react-router-dom";

const Watchlist = () => {
  const [d, setData] = useState([]);
  const [selected, setSelected] = useState("none");

  //console.log(items)
  let list = [];
  let add = true;
  let displayItem = [];

  const uselocalstorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  let stored = uselocalstorage(); // to store the items of previously saved
  const [items, setItems] = useState([]);
  const [itemlist, setItemlist] = useState([]); //to display

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setData(res.data);

        setItems(stored);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  //custom hook
  const useInterval = (callback, delay) => {
    const savedCallback = React.useRef();

    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setData(res.data);

        setItems(stored);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line

    setSeconds(seconds + 1);
  }, 10000);

  const addItems = () => {
    for (let i = 0; i < items.length; i++) {
      if (items[i] === selected) {
        add = false;
        break;
      }
    }

    if (selected === "none") {
      alert(
        "Currency not selected...Please Select the Cryptocurrency in the list"
      );
    }
    if (selected !== "none") {
      if (add) {
        setItems([...items, selected]);
      } else {
        alert("Currency already selected");
      }
      setSelected("none");
    }
  };
  const deleteItem = (ind) => {
    const updateditems = items.filter((e, id) => {
      return e !== ind;
    });
    setItems(updateditems);
  };

  useEffect(() => {
    //displayItem = [];
    // eslint-disable-next-line
    items.map((item) => {
      // eslint-disable-next-line
      d.map((e, i) => {
        if (e.name === item) {
          // eslint-disable-next-line
          displayItem = [...displayItem, e];
        }
      });
    });

    setItemlist(displayItem);
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="heading-watch">
        <h2 className="h2"> Custom WatchList</h2>
        <Header show={true} />
      </div>

      <div className="dropdown">
        {
          // eslint-disable-next-line
          d.length !== 0 ? (
            d.map((ele) => {
              list.push(ele.name);
            })
          ) : (
            <p></p>
          )
        }

        <select
          className="form-select select form-select-sm"
          aria-label=".form-select-sm"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
          }}
        >
          <option selected>Select Cryptocurrency</option>
          {list.map((item, i) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
        <button className="button-add btn btn-primary" onClick={addItems}>
          Add
        </button>
      </div>
      <br />
      <br />
      <div className="show-items">
        <div className="table-responsive-sm">
          <table className="table coin-table">
            <thead className="table-head">
              <tr>
                <th>
                  <strong>#</strong>
                </th>
                <th>
                  <strong>Coin</strong>
                </th>
                <th>
                  {" "}
                  <strong>Name</strong>
                </th>
                <th>
                  {" "}
                  <strong>Symbol</strong>
                </th>
                <th>
                  <strong>Price in &#8377;</strong>
                </th>
                <th>
                  {" "}
                  <strong>Price Change</strong>
                </th>
                <th>
                  <strong>Volume for 24h in &#8377;</strong>
                </th>
                <th>
                  <strong>Market Cap in &#8377;</strong>
                </th>
                <th>
                  <strong>Visualize Price Change</strong>
                </th>
                <th>
                  <strong>Delete</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {itemlist.length !== 0 ? (
                itemlist.map((ele, id) => {
                  return (
                    <tr>
                      <td>{id + 1}</td>
                      <td>
                        {" "}
                        <img className="coin-img" src={ele.image} alt="icon" />
                      </td>
                      <td className="name">{ele.name}</td>
                      <td>{ele.symbol}</td>
                      <td>{ele.current_price.toLocaleString("en-IN")}</td>
                      {ele.price_change_percentage_24h < 0 ? (
                        <td className="red">
                          <i className="fas fa-caret-down  red"></i>
                          {ele.price_change_percentage_24h.toFixed(2)}%{" "}
                        </td>
                      ) : (
                        <td className="green">
                          <i className="fas fa-sort-up green"></i>
                          {ele.price_change_percentage_24h.toFixed(2)}%{" "}
                        </td>
                      )}

                      <td>{ele.total_volume.toLocaleString("en-IN")}</td>
                      <td>{ele.market_cap.toLocaleString("en-IN")}</td>
                      <td>
                        <Link to={`/watchlist/tracker/${ele.id}`}>
                          <i className="fas fa-chart-bar"></i>
                        </Link>
                      </td>
                      <td>
                        <i
                          className="fas fa-minus-circle x5"
                          onClick={() => {
                            deleteItem(ele.name);
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9}>
                    <center>No Coins added</center>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <Footer /> */}
    </>
  );
};

export default Watchlist;
