import React from 'react';
import L from 'leaflet';
import 'leaflet-css'
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import img from '../MordheimMap.png'

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        map: null
    }
  }

  componentDidMount() {
    // create map
    var map = L.map('image-map', {
      minZoom: 1.5,
      maxZoom: 4,
      center: [0, -100],
      zoom: 1.5,
      zoomSnap: 0.25,
      crs: L.CRS.Simple        
    });
    // dimensions of the image
    var w = 2400,
        h = 1750,
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
    var marker = L.marker([-100, 150]);
    marker.addTo(map);
    this.setState({
      map: map
    })
  }

  render() {
    return <div>
      <div style={{height: "600px"}} id="image-map"></div>
      <Button onClick={() => this._addCircleMarker([100, 100])}>Lägg till</Button>
    </div>
  }

  _addCircleMarker(latlng){
    let marker = new L.circleMarker(latlng).addTo(this.state.map)
  }
}

export default Map;