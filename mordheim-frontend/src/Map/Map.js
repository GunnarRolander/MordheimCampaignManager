import React from 'react';
import L from 'leaflet';
import img from '../MordheimMap.jpg'

class Map extends React.Component {
  componentDidMount() {
    // create map
    var map = L.map('image-map', {
        minZoom: 1,
        maxZoom: 4,
        center: [0, 0],
        zoom: 1,
        zoomSnap: 0.25,
        crs: L.CRS.Simple
      });
      // dimensions of the image
      var w = 2000,
          h = 1500,
          url = img;
      // calculate the edges of the image, in coordinate space
      var southWest = map.unproject([0, h], map.getMaxZoom()-1);
      var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
      var bounds = new L.LatLngBounds(southWest, northEast);
      // add the image overlay, 
      // so that it covers the entire map
      L.imageOverlay(url, bounds).addTo(map);
      // tell leaflet that the map is exactly as big as the image
      map.setMaxBounds(bounds);
  }

  render() {
    return <div id="image-map"></div>
  }
}

export default Map;