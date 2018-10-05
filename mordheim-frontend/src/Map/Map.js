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
    this.layerBounds = null;
    this.placeDescriptions = null;
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
    
    let layerBounds = new L.FeatureGroup(null, {pane: 'circleMarkers'})
    map.addLayer(layerBounds)
    this.layerBounds = layerBounds
    this.map = map;

    
    map.on('click', function (event) {
      console.log(map.getBounds())
      console.log(event.latlng)
    })
    
    // add layer control object    
    L.control.layers({}, {
      //'Bounds': layerBounds,
      'image' : imageOverlay
    }).addTo(map)
    
    this._generateGraphics(layerBounds)

    fetch("place_descriptions.json").then((rsp) => {
      if(rsp.status != 200) 
        throw new Error("CPV could not be loaded")
      rsp.json().then((placeDescriptions) => {
        this.placeDescriptions = placeDescriptions

      })
    }).catch((error) => {
      console.error("Error:", error)
    })
  }

  componentDidUpdate() {

    this.map.removeLayer(this.layerBounds)

    let layerBounds = new L.FeatureGroup(null, {pane: 'circleMarkers'})
    this.map.addLayer(layerBounds)
    this.layerBounds = layerBounds

    this._generateGraphics(layerBounds)
    
  }

  render() {
    return <div>
      <div style={{height: "600px"}} id="image-map"></div>
      <PlaceInfoModal show={this.state.showMapModal} hide={() => this._hideMapModal()} visibleWarbands={this.props.visibleWarbands} place={this.state.mapInfoPlace} cpv={this.state.cpv}></PlaceInfoModal>
    </div>
  }

  _getColour(warband_id) {
    let colour = "#808080"
    let warband = this.props.visibleWarbands.find(w => w.id == warband_id)
    if (warband != null && warband.colour != null) {
      colour = warband.colour
    }
    return colour
  }

  _getRadius(place){
    let radius = 10
    let warband = this.props.visibleWarbands.find(w => w.id == place.warband_id)
    if (warband != null && warband.place_id == place.id) {
      radius = 15
    }
    return radius
  }

  _generateGraphics(layerBounds) {    
    let visiblePlaces = this.props.visiblePlaces
    this.props.visibleLinks.map((link) => {
      let place = visiblePlaces.find(p => p.id == link[0])
      let linked_place = visiblePlaces.find(p => p.id == link[1])

      let marker = L.polyline([[place.lat, place.lng],[linked_place.lat, linked_place.lng]], {color: '#101010', opacity: 0.6})
      marker.addTo(layerBounds)
      
    })
    
    visiblePlaces.map((place) => {
      let marker = L.circleMarker([place.lat, place.lng], {color: "#101010", fillColor: this._getColour(place.warband_id), opacity: 0.9, fillOpacity: 1, radius: this._getRadius(place)}
      )
      console.log([place.lat, place.lng])
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
    this.map.fitBounds(layerBounds.getBounds().pad(0.1))
    console.log(layerBounds.getBounds())
    console.log(this.map.getBounds())
  }

  _addCircleMarker(latlng){
    let marker = new L.circleMarker(latlng).addTo(this.state.map)
  }

  _showMapModal(place) {
    let placeDesc = this.placeDescriptions.find(p => p.name == place.namn)
    let cpv = 0

    if (placeDesc) {
      cpv = placeDesc.cpv
    }

    this.setState({
      showMapModal: true,
      mapInfoPlace: place,
      cpv: cpv
    })
  }

  _hideMapModal(){
    this.setState({
      showMapModal: false
    })
  }
}

export default Map;