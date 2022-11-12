import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import * as MaplibreGrid from 'maplibre-grid';


mapboxgl.accessToken = 'pk.eyJ1Ijoia2lkcm9vdCIsImEiOiJjbDltbWJ3YTAwMW55NDFtdWU3cGlrdnl2In0.rbBE0meHwOeb4tzl4vEyyA';

function Mapbox() {

    const selectedCells = [];

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-71.0539);
    const [lat, setLat] = useState(42.3498);
    const [zoom, setZoom] = useState(14);


    const grid = new MaplibreGrid.Grid({
        gridWidth: 0.08,
        gridHeight: 0.05,
        units: 'kilometers',
        minZoom: 13,
        maxZoom: 16,
        paint: {
            'line-opacity': 1
        }
    });


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/kidroot/cl9n18vdd00fr14mqq560gyn3',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });



    }, []);

    useEffect(() => {
        map.current.addControl(grid);
        console.log("loadgrid");
        map.current.on('load', () => {
            const selectedCellsId = 'selected-cells';
            map.current.addSource(selectedCellsId, {
                type: 'geojson',
                data: { type: 'FeatureCollection', features: selectedCells }
            });


            map.current.addLayer({
                id: selectedCellsId,
                source: selectedCellsId,
                type: 'fill',
                paint: {
                    'fill-color': '#0000ff',
                    'fill-opacity': 0.2,
                    'fill-outline-color': 'transparent'
                }
            });


            map.current.on(MaplibreGrid.GRID_CLICK_EVENT, event => {
                const bbox = event.bbox;

                const cellIndex = selectedCells.findIndex(x => x.geometry.bbox.toString() === bbox.toString());
                if (cellIndex === -1) {
                    const coordinates = [
                        [
                            [bbox[0], bbox[1]],
                            [bbox[2], bbox[1]],
                            [bbox[2], bbox[3]],
                            [bbox[0], bbox[3]],
                            [bbox[0], bbox[1]],
                        ]
                    ];
                    const cell = { type: 'Feature', geometry: { type: 'Polygon', bbox, coordinates } };
                    selectedCells.push(cell);
                } else {
                    selectedCells.splice(cellIndex, 1);
                }

                const source =  map.current.getSource(selectedCellsId);
                source.setData({ type: 'FeatureCollection', features: selectedCells });

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
    )
}

export default Mapbox