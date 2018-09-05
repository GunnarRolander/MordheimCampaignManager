import React from 'react';
import L from 'leaflet';
import 'leaflet-rastercoords'
import 'leaflet-css'
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import img from '../MordheimMap.png'
import PlaceInfoModal from './PlaceInfoModal.js'

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
        map: null,
        showMapModal: false,
        mapInfoPlace: null
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
    //map.createPane('tooltips');
    //map.getPane('tooltips').style.zIndex = -1;

    // tell leaflet that the map is exactly as big as the image
    map.setMaxBounds(bounds);

    map.createPane('imagebg');
    map.getPane('imagebg').style.zIndex = 50;
    map.getPane('imagebg').style.pointerEvents = 'none';
    let imageOverlay = L.imageOverlay(url, bounds,{
      pane: 'imagebg',
      zIndex: 49,
      interactive: false
    })
    map.addLayer(imageOverlay)
    imageOverlay.bringToBack()
    
    map.createPane('circleMarkers');
    map.getPane('circleMarkers').style.zIndex = -11;

    let layerBounds = L.layerGroup(null, {pane: 'circleMarkers'})
    map.addLayer(layerBounds)
    
    let visiblePlaces = this.props.visiblePlaces
    this.props.visibleLinks.map((link) => {
      let place = visiblePlaces.find(p => p.id == link[0])
      let linked_place = visiblePlaces.find(p => p.id == link[1])

      let marker = L.polyline([[place.lat, place.lng],[linked_place.lat, linked_place.lng]], {color: '#101010', opacity: 0.6})
      marker.addTo(layerBounds)
      
    })
    
    visiblePlaces.map((place) => {
      let marker = L.circleMarker([place.lat, place.lng], {color: "#101010", fillColor: this._getColour(place.warband_id), opacity: 0.9, fillOpacity: 1}
      )
      marker.addTo(layerBounds)
    })

    visiblePlaces.map((place) => {
      let marker = L.marker([place.lat-2, place.lng], {color: '#000000', opacity: 0.6}
      )
      marker.on('click', (e) => {
        this._showMapModal(place);
      })
      marker.addTo(layerBounds)
    })

    // set markers on click events in the map
    map.on('click', function (event) {
      let coords = event.latlng
      let marker = L.marker(coords)
      .addTo(layerBounds)
      marker.on('mouseover', (e) => {
        alert("KLICK!");
        //this._showMapModal(visiblePlaces[0]);
      })
      marker.bindPopup('[' + Math.floor(coords.lat) + ',' + Math.floor(coords.lng) + ']')
      .openPopup()
    })
    
    // add layer control object
    L.control.layers({}, {
      'Bounds': layerBounds,
      'image' : imageOverlay
    }).addTo(map)

    this.map = map;
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
      <PlaceInfoModal show={this.state.showMapModal} hide={() => this._hideMapModal()} place={this.state.mapInfoPlace}></PlaceInfoModal>
    </div>
  }

  _getColour(warband_id) {
    let colour = this.props.colours[warband_id]
    if (colour == null) {
      colour = "#808080"
    }
    return colour
  }

  _addCircleMarker(latlng){
    let marker = new L.circleMarker(latlng).addTo(this.state.map)
  }

  _showMapModal(place) {
    this.setState({
      showMapModal: true,
      mapInfoPlace: place
    })
  }

  _hideMapModal(){
    this.setState({
      showMapModal: false
    })
  }
}

export default Map;