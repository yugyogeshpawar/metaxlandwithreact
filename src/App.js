import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Maplibre from 'maplibre-gl';
import * as MaplibreGrid from 'maplibre-grid';


mapboxgl.accessToken = 'pk.eyJ1Ijoia2lkcm9vdCIsImEiOiJjbDltbWJ3YTAwMW55NDFtdWU3cGlrdnl2In0.rbBE0meHwOeb4tzl4vEyyA';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  

  const grid = new MaplibreGrid.Grid({
    gridWidth: 0.2,
    gridHeight: 0.1,
    units: 'kilometers',
    minZoom: 14,
    maxZoom: 22,
    paint: {
      'line-opacity': 0.5
    }
  });

 



  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
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
    console.log("hello3");
    map.current.on(MaplibreGrid.GRID_CLICK_EVENT, event => {
      console.log(event.bbox);
    });
    
  }, []);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
