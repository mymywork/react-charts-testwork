import React from "react"
import ReactDOM from "react-dom"
import {Application} from "./containers/Application"
import {LineView} from "./containers/LineView"
import {BarView} from "./containers/BarView"
import {RoundView} from "./containers/RoundView"
import {Routes} from "react-router"
import {BrowserRouter, Route} from "react-router-dom"
import {MapView} from "./containers/MapView"
import {data} from "./data"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Application/>}>
        <Route index element={<LineView data={data}/>}/>
        <Route path="line" element={<LineView data={data}/>}/>
        <Route path="round" element={<RoundView data={data}/>}/>
        <Route path="bar" element={<BarView data={data}/>}/>
        <Route path="map" element={<MapView data={data}/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  , document.getElementById("application"))
