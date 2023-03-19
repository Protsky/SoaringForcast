import axios from "axios";
import React, { useEffect, useState } from "react";
import MountainElevation from "../Model/3dRendering";
import { Geodesic } from "geographiclib";
import Plot from "react-plotly.js";

const API_URL = process.env.API_URL || "http://localhost:3001/elevation";
const DISTANCE_INTERVAL = process.env.DISTANCE_INTERVAL || 5;

const App = () => {
  const [elevations, setElevations] = useState([]);

  const { p1, p2 } = {
    p1: [46.00607, 7.66548],
    p2: [45.93212, 7.65208],
    delay: 0,
  };
  const distance = Geodesic.WGS84.Inverse(p1[0], p1[1], p2[0], p2[1]).s12;

  useEffect(() => {
    const calculateLat = (fraction) =>
      (1 - fraction) * p1[0] + fraction * p2[0];
    const calculateLng = (fraction) =>
      (1 - fraction) * p1[1] + fraction * p2[1];
    const cacheKey = (lat, lng) => `${lat},${lng}`;
    const cache = {};

    const fetchElevation = async (lat, lng) => {
      const key = cacheKey(lat, lng);
      if (cache[key]) {
        setElevations((prevElevations) => [...prevElevations, cache[key]]);
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          params: {
            lat,
            lng,
          },
        });

        const elevation = response.data.results?.[0]?.elevation;
        if (elevation) {
          setElevations((prevElevations) => {
            const newElevations = [...prevElevations, elevation];
            cache[key] = elevation;
            console.log("Elevation at", lat, lng, "is", elevation, "meters");
            return newElevations;
          });

          cache[key] = elevation;
          console.log("Elevation at", lat, lng, "is", elevation, "meters");
        } else {
          console.log("No elevation data for", lat, lng);
        }
      } catch (error) {
        console.error(error);
        console.log("Google API connection failed");
      }
    };

    const numPoints = Math.floor(distance / DISTANCE_INTERVAL);
    const fractionIncrement = 1 / numPoints;

    for (let i = 0; i <= numPoints; i++) {
      const fraction = i * fractionIncrement;
      const lat = calculateLat(fraction);
      const lng = calculateLng(fraction);
      fetchElevation(lat, lng);
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
      <MountainElevation />
    </div>
  );
};

export default App;
