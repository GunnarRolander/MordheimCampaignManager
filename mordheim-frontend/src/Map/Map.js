import React from 'react';
import L from 'leaflet';
import 'leaflet-rastercoords'
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
    let map = L.map('image-map', {
      minZoom: 1.5,
      maxZoom: 4,
      center: [0, -100],
      zoom: 1.5,
      zoomSnap: 0.25,
      crs: L.CRS.Simple        
    });
    // dimensions of the image
    let w = 2400,
        h = 1750,
        url = img;
    // calculate the edges of the image, in coordinate space
    let southWest = map.unproject([0, h], map.getMaxZoom()-1);
    let northEast = map.unproject([w, 0], map.getMaxZoom()-1);
    let bounds = new L.LatLngBounds(southWest, northEast);
    // add the image overlay, 
    // so that it covers the entire map
    map.createPane('imagebg');
    map.getPane('imagebg').style.zIndex = 50;

    let imageOverlay = L.imageOverlay(url, bounds,{
      pane: 'imagebg'
    })
    map.addLayer(imageOverlay)
    // tell leaflet that the map is exactly as big as the image
    map.setMaxBounds(bounds);

    let layerBounds = L.layerGroup()
    map.addLayer(layerBounds)
    imageOverlay.bringToBack()

    // set markers on click events in the map
    map.on('click', function (event) {
      let coords = event.latlng
      let marker = L.circleMarker(coords)
        .addTo(layerBounds)
      marker.bindPopup('[' + Math.floor(coords.lat) + ',' + Math.floor(coords.lng) + ']')
        .openPopup()
    })
  
    // add layer control object
    L.control.layers({}, {
      'Bounds': layerBounds,
      'image' : imageOverlay
    }).addTo(map)

    this.setState({
      map: map
    })

    // assign map and image dimensions
    //let rc = new L.RasterCoords(map, img)
    // set max zoom Level (might be `x` if gdal2tiles was called with `-z 0-x` option)
    //map.setMaxZoom(rc.zoomLevel())
    // set the view in the middle of the image
    //map.setView(rc.unproject([img[0] / 2, img[1] / 2]), 2)
  
    // set marker at the image bound edges
  
    // the tile layer containing the image generated with gdal2tiles --leaflet ...
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