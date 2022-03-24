import React from "react"
import {Map, Placemark, YMaps} from "react-yandex-maps"
import {groupby} from "../utils"

export const MapView = ({data}) => {

  let modList = data.map(x => ({ ...x, keyLocation: x.latitude+";"+x.longitude }))

  let list = groupby(modList,'keyLocation')

  let btsList = data.filter((item, pos, self) => self.indexOf(item) == pos).sort()

  const makeInfo = (x) => [new Date(x.time).toUTCString(),"bts: "+x.bts,"latitude: "+x.latitude,"longitude: "+x.longitude,"rsrp: "+x.rsrp,"rsrq: "+x.rsrq].join("<br />")

  return (
    <YMaps>
      <div>
        <Map width={1000} height={500} defaultState={{center: [55.75, 37.57], zoom: 9}} >
          {list && Object.values(list).map(x => (<Placemark key={x[0].keyLocation}
                                             properties={{balloonContentBody: x.map(x => makeInfo(x)).join("<br/>")}}
                                             options={{openBalloonOnClick: true}}
                                             geometry={[x[0].latitude,x[0].longitude]}
                                             modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
          />))}
        </Map>
      </div>
    </YMaps>
  )
}