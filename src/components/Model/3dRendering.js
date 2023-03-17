import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const MountainElevations = () => {
  const corner1 = [45.98547, 7.63840];
  const corner2 = [45.98565, 7.67908];
  const corner3 = [45.96709, 7.67844];
  const corner4 = [45.96755, 7.63776];

  const minLat = Math.min(corner1[0], corner2[0], corner3[0], corner4[0]);
  const maxLat = Math.max(corner1[0], corner2[0], corner3[0], corner4[0]);
  const minLng = Math.min(corner1[1], corner2[1], corner3[1], corner4[1]);
  const maxLng = Math.max(corner1[1], corner2[1], corner3[1], corner4[1]);

  const stepSize = 0.0001; // approximately 10 meters
  const numPointsLat = Math.floor((maxLat - minLat) / stepSize);
  const numPointsLng = Math.floor((maxLng - minLng) / stepSize);

  const [elevations, setElevations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cache = {};

  useEffect(() => {
    const fetchData = async () => {
      const newElevations = [];

      for (let i = 0; i <= numPointsLat; i++) {
        const lat = minLat + i * stepSize;

        for (let j = 0; j <= numPointsLng; j++) {
          const lng = minLng + j * stepSize;
          const cacheKey = `${lat},${lng}`;

          if (cache[cacheKey]) {
            newElevations.push({ x: lat, y: lng, z: cache[cacheKey] });
            continue;
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
              newElevations.push({ x: lat, y: lng, z: elevation });
              cache[cacheKey] = elevation;
              console.warn("Elevation at", lat, lng, "is", elevation, "meters");
            } else {
              console.warn("No elevation data for", lat, lng);
            }
          } catch (error) {
            console.error(error);
            console.warn("Proxy connection failed");
          }
        }
      }

      setElevations(newElevations);
      setIsLoading(false);
    };

    fetchData();
  }, []);



  const customColorScale = [
    [0, "#ffffff"],   // white at the lowest elevation
    [0.2, "#a6a6a6"], // grayish at 20% of the range
    [0.4, "#d9b38c"], // light brown at 40% of the range
    [0.6, "#b67d4c"], // medium brown at 60% of the range
    [0.8, "#8f5e2f"], // dark brown at 80% of the range
    [1, "#663300"]    // dark brown at the highest elevation
  ];
  

  const data = [
    {
      type: "mesh3d",
      x: elevations.map((elevation) => elevation.x),
      y: elevations.map((elevation) => elevation.y),
      z: elevations.map((elevation) => elevation.z),
      colorbar: {
        title: "Elevation (meters)",
      },
      colorscale: customColorScale,
      intensity: elevations.map((elevation) => elevation.z),
      intensitymode: "cell",
    },
  ];

  const layout = {
    title: "Mountain Elevations",
    scene: {
      xaxis: { title: "Latitude" },
      yaxis: { title: "Longitude" },
      zaxis: { title: "Elevation (meters)" },
    },
  };
  
  
  return (
    <div>
      {elevations.length > 0 ? (
        <Plot data={data} layout={layout} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

}
  export default MountainElevations;