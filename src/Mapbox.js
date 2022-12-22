import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as MaplibreGrid from "./utils/grid/index";
import { mapboxStyle, mapboxglAccessToken } from "./utils/consts";
import { findOthers } from "./utils/helper";


function Mapbox() {

  let active = false;
  let bbox1 = [];
  let difference = 0.000008993203637785996;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(72.5341);
  const [lat, setLat] = useState(23.0403);
  const [zoom, setZoom] = useState(18.5);

  let [selectedCellsArray, pushCellsToArray] = useState([]);
  let [selectedCellsArray2, pushCellsToArray2] = useState([]);

  const grid = new MaplibreGrid.Grid({
    gridWidth: 0.01,
    gridHeight: 0.01,
    units: "kilometers",
    minZoom: 17,
    maxZoom: 24,
    paint: {
      "line-opacity": 0.15,
      "line-color": "#000",
    },
  });

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      accessToken: mapboxglAccessToken,
      container: mapContainer.current,
      style: mapboxStyle,
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  useEffect(() => {

    map.current.addControl(grid);
    const selectedCells = [];
    const selectedCells2 = [];
    map.current.on("load", async () => {
      const layers = map.current.getStyle().layers;
      let firstSymbolId;
      for (const layer of layers) {
        if (layer.type === "symbol") {
          firstSymbolId = layer.id;
          break;
        }
      }
    });



    map.current.on("load", () => {
      var selectedCellsId = "";
      selectedCellsId = "selected-cells";

      var selectedCellsId2 = "";
      selectedCellsId2 = "selected-cells2";

      map.current.addSource(selectedCellsId2, {
        'type': 'geojson',
        'data': { type: "FeatureCollection", features: selectedCells2 },
      });

      map.current.addLayer(
        {
          'id': selectedCellsId2,
          'type': 'fill',
          'source': selectedCellsId2,
          'layout': {},
          'paint': {
            'fill-color': '#f08',
            'fill-opacity': 0.4
          }
        },
      );



      map.current.addSource(selectedCellsId, {
        type: "geojson",
        data: { type: "FeatureCollection", features: selectedCells },
      });

      map.current.addLayer({
        id: selectedCellsId,
        source: selectedCellsId,
        type: "fill",
        paint: {
          "fill-color": "#000",
          "fill-opacity": 0.2,
          "fill-outline-color": "transparent",
        },
      });



      // GRID_CLICK_EVENT;
      map.current.on(MaplibreGrid.GRID_CLICK_EVENT, (event) => {

        if (active == true) {
          for (var i = 0; i < selectedCellsArray.length; i++) {
            selectedCellsArray2.push(selectedCellsArray[i]);
          }

          const source = map.current.getSource(selectedCellsId2);
          source.setData({
            type: "FeatureCollection",
            features: selectedCellsArray2,
          });

          selectedCellsArray.length = 0;
          const source2 = map.current.getSource(selectedCellsId);
          source2.setData({
            type: "FeatureCollection",
            features: selectedCellsArray,
          });
        }

        const bbox = event.bbox;
        const cellIndex = checkSelecion(bbox);

        if (cellIndex != -1 && active == false) {
          
          selectedCellsArray2.splice(cellIndex, 1);
          const source = map.current.getSource(selectedCellsId2);
          source.setData({
            type: "FeatureCollection",
            features: selectedCellsArray2,
          });
        } else {
          bbox1 = bbox;
          active = active ? false : true;
        }
      });

      const checkSelecion = (bbox) => {
        difference = bbox[2] - bbox[0];

        const bbox2 = [Math.round(bbox[0] / difference) * difference, Math.round(bbox[1] / difference) * difference, Math.round(bbox[2] / difference) * difference, Math.round(bbox[3] / difference) * difference];
        const cellIndex = selectedCellsArray2.findIndex((x) => (x.geometry.bbox.toString() === bbox2.toString()));
        return cellIndex;

      }


      // GRID_Mouse_MOVE_EVENT
      map.current.on(MaplibreGrid.GRID_MOVE_EVENT, (event) => {
        let bbox = [];
        let bbox2 = event.bbox;

        const cellIndex = checkSelecion(bbox2);

        if (active === true && cellIndex === -1) {

          let digit1, digit2, digit3, digit4;

          difference = bbox1[2] - bbox1[0];

          console.log(difference);
          digit1 = bbox1[0] / difference;
          digit2 = bbox1[1] / difference;
          digit3 = bbox2[0] / difference;
          digit4 = bbox2[1] / difference;

          let arr1 = [Math.round(digit1), Math.round(digit2)];
          let arr2 = [Math.round(digit3), Math.round(digit4)];

          let arrays = findOthers(arr1, arr2);

          selectedCellsArray.length = 0;

          for (let i = 0; i < arrays.length; i++) {

            bbox = [];
            bbox.push(arrays[i][0] * difference);
            bbox.push(arrays[i][1] * difference);
            bbox.push(arrays[i][0] * difference + difference);
            bbox.push(arrays[i][1] * difference + difference);

            const cellIndex = checkSelecion(bbox);

            if (cellIndex === -1) {
              const coordinates = [
                [
                  [bbox[0], bbox[1]],
                  [bbox[2], bbox[1]],
                  [bbox[2], bbox[3]],
                  [bbox[0], bbox[3]],
                  [bbox[0], bbox[1]],
                ],
              ];
              const cell = {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  bbox,
                  coordinates,
                },
              };

              selectedCellsArray.push(cell);
              const source = map.current.getSource(selectedCellsId);
              source.setData({
                type: "FeatureCollection",
                features: selectedCellsArray,
              });
            }
          }
        }
      });
    });
  }, []);



  return (
    <div>
      <div className="sidebar2">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Mapbox;
