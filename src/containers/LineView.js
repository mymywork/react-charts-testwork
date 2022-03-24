import React, {useState} from "react"
import {LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Line} from "recharts"

export const LineView = ({ data }) => {

  let [selectBts,setSelectBts] = useState('all')
  // сортируем по времени
  let sorted = data.sort((a, b) => {
    let ta = (new Date(a.time)).valueOf()
    let tb = (new Date(b.time)).valueOf()
    if ( ta < tb ) return -1
    if ( ta > tb ) return 1
    return 0
  })
  // конвертируем поле time в читаймый формат
  let formatted = sorted.map(x => ({...x, time: new Date(x.time).toLocaleString()}))
  // создаем ещё один массив с bts
  let btsList = sorted.map(x => x.bts ).filter((item, pos, self) => self.indexOf(item) == pos).sort()
  // если выбраны не "все" то применям фильтр
  if (selectBts != 'all') formatted = formatted.filter(x => x.bts == selectBts)

  const changeBts = (e) => setSelectBts(e.target.value)

  return (
    <React.Fragment>

      <select onChange={changeBts}>
        <option value={'all'}>All bts</option>
        { btsList && btsList.map(x => (<option key={x} value={x}>{x}</option>)) }
      </select>

      <LineChart width={1000} height={500} data={formatted}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <XAxis dataKey="time" />
        <YAxis reversed={true} />
        <Line type="monotone" dataKey="rsrp" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </React.Fragment>
  )
}
