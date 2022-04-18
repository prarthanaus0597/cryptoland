import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import '../css/HistoryChart.css'
import { useParams } from 'react-router-dom'
//import { useEffect } from 'react';

const HistoryChart = ({ days, weeks, years, details }) => {
  let day = days;
  let week = weeks;
  let year = years;
  let detail = details;
  let { id } = useParams();
  let name = (details === undefined) ? id : detail.name;
  let Prices = [];
  let x_labeling = [];
  let y_labeling = [];
  let backgroundColors = 'rgba(75,192,192,0.2)';
  let borderColors = 'rgba(75,192,192,1)';
  let time="1 year";
  const [type, setType] = useState('Bar')
  const [timeFormat, setTimeFormat] = useState("7d");



  let date;
  const formatData = (data) => {
    return data.map((el) => {
      date = new Date(el[0]);
      var dateStr = ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
      return {

        t: dateStr,
        y: el[1].toFixed(2),
      };
    });
  };


  const setValues = () => {
    if (timeFormat === "24h") {
      if (day.prices !== undefined) {
        Prices = formatData(day.prices)
        x_labeling = Prices.map((e) => {

          return e.t
        })
        y_labeling = Prices.map((e) => {
          return e.y
        })
        backgroundColors = "rgba(75,192,192,0.6)";
        borderColors = "rgba(75,192,192,1)";
        time="24 hours"
      }
    }
    if (timeFormat === "7d") {
      if (week.prices !== undefined) {
        Prices = formatData(week.prices)
        x_labeling = Prices.map((e) => {

          return e.t
        })
        y_labeling = Prices.map((e) => {
          return e.y
        })
      }
      backgroundColors = "rgb(139, 75, 192,0.6)"
      borderColors = "rgb(139, 75, 192,1)"
      time=" 7 Days"

    }
    if (timeFormat === "1y") {
      if (year.prices !== undefined) {
        Prices = formatData(year.prices)
        x_labeling = Prices.map((e) => {

          return e.t
        })
        y_labeling = Prices.map((e) => {
          return e.y
        })
      }
      backgroundColors = " rgb(255, 0, 170,0.6)"
      borderColors = " rgb(255, 0, 170,1)"
      time='1 year'

    }

  }
  setValues();






  const data_display = {
    labels: x_labeling,
    datasets: [
      {
        label: `${name} price for ${time}`,
        data: y_labeling,
        fill: true,
        backgroundColor: backgroundColors,
        //   borderColor: "#742774"
        borderColor: borderColors
      }

      //    


    ]


  }


  return (<div>

    <div className="buttons-group">
 <div className="first-group">
   
      <h6>Type of Graph:</h6>
      <Button className='button6' variant='btn btn-outline-primary' onClick={() => { setType("Bar") }}>Bar </Button>
      <Button className='button7' variant='btn btn-outline-primary' onClick={() => { setType("Line") }}>Area </Button>

 </div>

<div className='second-group'>

      <h6>Visualize data of:</h6>
      <Button className='button8' variant='btn btn-outline-primary' onClick={() => { setTimeFormat("24h") }}>24 hours</Button>
      <Button className='button9' variant='btn btn-outline-primary' onClick={() => { setTimeFormat("7d") }}> 7 Days</Button>
      <Button className='button10' variant='btn btn-outline-primary' onClick={() => { setTimeFormat("1y") }}>1 Year</Button>
</div>

    </div>


    <div className="HistoryChart" >
      <div className='chart'>

        <p className='y-axis'><strong>Prices</strong>(in &#8377;)</p>
        {type === 'Bar' ?
          (<Bar className='chart-id' data={data_display} />) :
          (<Line className='chart-id' data={data_display} />)

        }
      </div>

      <br />
      <p className='x-axis'><strong>Time</strong>(in mm/dd/yyyy hh:mm:ss)</p>

    </div>
    
  </div>)

};

export default HistoryChart;