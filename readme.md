# Advanced Weather Forecast using OpenFOAM

This project aims to generate advanced weather forecasts using OpenFOAM to simulate lee waves and thermal forecasts in specific regions.

## Requirement

To get started with this project, simply clone the repository and install the required dependencies using the following commands:

- `git clone https://github.com/ajnisbet/opentopodata.git`  

- `cd opentopodata` 

- `make build-m1`  


- Move the `utils/data` folder in `opentopodata`. 

- Move the `config.yaml` file in `opentopodata`.

- TopData download:  
`TODO`

## Usage

To use this application, run the following command in the terminal:

Inside `opentopodata`:

- `make run` 

In the main project:

- `npm install` 
- `node proxy.js` 
- `npm start` 


This will start the application and generate a cross-section of the mountain based on the elevation data.

## Dependencies

This project uses the following dependencies:

- React
- Axios
- GeographicLib
- Plotly.js
- opentopodata

## Contributing

Contributions to this project are welcome. To contribute, simply fork the repository, create a new branch, make your changes, and submit a pull request.

## Todo List

- [x] Rendering 3D and 2D
- [ ] Lee wave
- [ ] Thermal spot

![Rendering 2D](./public/image1.png)
![Rendering 3D](./public/image2.png)

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
