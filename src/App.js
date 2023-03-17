import React, { useEffect, useState } from "react";
import axios from "axios";
import GeographicLib from "geographiclib";
import Plot from "react-plotly.js";
import MountainElevation from "../src/components/MountainElevations"

const App = () => {
  const [elevations, setElevations] = useState([]);
  const p1 = [46.00607, 7.66548];
  const p2 = [45.93212, 7.65208];
  const distance = GeographicLib.Geodesic.WGS84.Inverse(
    p1[0],
    p1[1],
    p2[0],
    p2[1]
  ).s12;

  useEffect(() => {
    const numPoints = Math.floor(distance / 5);
    const cache = {};

    const fetchElevation = async (lat, lng) => {
      const cacheKey = `${lat},${lng}`;

      if (cache[cacheKey]) {
        setElevations((prevElevations) => [...prevElevations, cache[cacheKey]]);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/elevation", {
          params: {
            lat: lat,
            lng: lng,
          },
        });

        if (response.data.results && response.data.results.length > 0) {
          const elevation = response.data.results[0].elevation;
          setElevations((prevElevations) => [...prevElevations, elevation]);
          cache[cacheKey] = elevation;
          console.log("Elevation at", lat, lng, "is", elevation, "meters");
        } else {
          console.log("No elevation data for", lat, lng);
        }
      } catch (error) {
        console.error(error);
        console.log("Google API connection failed");
      }
    };

    const delay = 0; // set delay in milliseconds
    for (let i = 0; i <= numPoints; i++) {
      const fraction = i / numPoints;
      const lat = (1 - fraction) * p1[0] + fraction * p2[0];
      const lng = (1 - fraction) * p1[1] + fraction * p2[1];
      setTimeout(() => {
        fetchElevation(lat, lng);
      }, i * delay);
    }
  }, []);

  const layout = {
    title: "Cross Section of the Mountain",
    xaxis: { title: "Distance (m)" },
    yaxis: { title: "Elevation (m)" },
  };

  const trace = {
    x: elevations.map((_, i) => (i / (elevations.length - 1)) * distance),
    y: elevations,
    type: "scatter",
    mode: "lines",
  };

  return (
    <div>
      <Plot data={[trace]} layout={layout} />
      <MountainElevation/>
    </div>
  );
};

export default App;
