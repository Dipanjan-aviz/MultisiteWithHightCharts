import React, { useState } from "react";
import Highcharts, { color } from "highcharts";
import worldTopology from "@highcharts/map-collection/custom/world.topo.json";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
// import dipanjan from '@highcharts/map-collection/custom/world-highres.topo.json';

highchartsMap(Highcharts);

// const caData = ["ca", "#ff3300"];
// const usData = ["us", "#bb1188"];
// const mxData = ["mx", "#ccff11"];
// const inData = ["in", "#ff9900"];

// ***********************
// ***********************
// Notes:
// - switching coutries works fine with higcharts@9.0.1
// - it's broken in:
//     - highcharts@9.3.2
//     - highcharts-react-official@3.0.0
//     - highcharts-react-official@3.0.1
// ***********************
// ***********************

const App = () => {
  const [series, setSeries] = useState([]);
  const [allAreas, setAllAreas] = useState(true);
  const [mapData] = useState([
    { name: "Hyderabad", lat: 17.3850, lon: 78.4867, population: "6.8M" },
    { name: "New York", lat: 40.7128, lon: -74.0060, population: "8.4M" },
    { name: "London", lat: 51.5074, lon: -0.1278, population: "8.9M" },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503, population: "14M" }
  ]);


  const mapOptions = {
    chart: {
      map: worldTopology,
      backgroundColor: "rgb(54, 69, 79)", 
      height: "40%",
    },
    plotOptions: {
      map: {
        color: "rgb(209 213 219 )", 
        borderColor: "#000000", 
      },
    },
    title: {
      text: "Multisite With Data Points", 
      style: {
        color: "#ffffff", 
        fontSize: "20px", 
      },
      align: "center", 
    },
    credits: {
      enabled: false
    },
    mapNavigation: {
      enabled: true
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "<b>{point.name}</b><br>Test"
    },
    series: [
      {
        mapData: worldTopology,
        allAreas: true,
        name: "",
        color: "#d3d3d3", 
        borderColor: "#606060", 
      },
      {
        type: "mappoint", 
        name: "Cities",
        color: Highcharts.getOptions().colors[1],
        data: mapData.map(city => ({
          name: city.name,
          lat: city.lat,
          lon: city.lon,
          population: city.population
        })),
        marker: {
          radius: 8, 
          fillColor: '#ff3300', 
          lineWidth: 1,
          lineColor: '#FFFFFF', 
        },
        tooltip: {
          pointFormat: '{point.name}: {point.population}'
        }
      },
    ]
  };


  return (
    <div style={{marginTop: "80px"}}>
      <HighchartsReact
        constructorType="mapChart"
        highcharts={Highcharts}
        options={mapOptions}
      />
    </div>
  );
};

export default App;
