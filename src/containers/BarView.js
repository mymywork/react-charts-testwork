import React from "react"
import {BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import {groupby} from "../utils"

export const BarView = ({data}) => {

  // сортируем по timestamp
  let sorted = data.sort((a, b) => {
    let ta = (new Date(a.time)).valueOf()
    let tb = (new Date(b.time)).valueOf()
    if ( ta < tb ) return -1
    if ( ta > tb ) return 1
    return 0
  })
  // конвертируем Date в дни
  let convertedToDays = sorted.map(x => ({...x, time: new Date(x.time).toLocaleDateString()}))
  // группируем записи по дням
  let grouped = groupby(convertedToDays,'time')
  // конвертируем в массив где поле value количество записей
  let newData = Object.values(grouped).map(x => ({ time: x[0]['time'], records: x.length }))

  return (
    <BarChart
      width={1000}
      height={500}
      data={newData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="time"/>
      <YAxis />
      <Tooltip/>
      <Legend/>
      <Bar dataKey="records" fill="#8884d8"/>
    </BarChart>
  )
}
