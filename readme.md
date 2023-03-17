# Advanced Weather Forecast using OpenFOAM

This project aims to generate advanced weather forecasts using OpenFOAM to simulate lee waves and thermal forecasts in a specific regions.

## Getting Started

To get started with this project, simply clone the repository and install the required dependencies using the following commands:

`git clone https://github.com/<your-username>/openfoam-weather-forecast.git
cd openfoam-weather-forecast`

`npm install`

## Tutorial: Setting API Key in .env

To use the weather API, you'll need to set your google_place API key in a `.env` file. Here's how:

1. Create a `.env` file in the root directory of your project.
2. Add the following line to the proxy file: `WEATHER_API_KEY=your_api_key_here`.
3. Replace `your_api_key_here` with your actual API key.
4. Save the file.

Now your API key is set and you can use it in your code by accessing the environment variable `process.env.WEATHER_API_KEY`.



## Usage

To use this application, run the following command in the terminal:

`node proxy`  
`npm start`


This will start the application and generate a cross section of the mountain based on the elevations data.

## Dependencies

This project uses the following dependencies:

- React
- axios
- GeographicLib
- Plotly.js

## Contributing

Contributions to this project are welcome. To contribute, simply fork the repository, create a new branch, make your changes, and submit a pull request.

## Todo List

- [x] Rendering 3D and 2D

![Rendering 2D](./public/image1.png)
![Rendering 3D](./public/image2.png)

- [ ] Lee wave
- [ ] Thermal spot


## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
