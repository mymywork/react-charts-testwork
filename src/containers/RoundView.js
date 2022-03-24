import React from 'react'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import {groupby} from "../utils"


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const RADIAN = Math.PI / 180

export const RoundView = ({data}) => {

  // групируем по bts
  let rowGrouped = groupby(data,'bts')

  // сортируем по количеству записей
  rowGrouped = Object.values(rowGrouped).sort((a, b) => {
    if ( a.length > b.length ) return -1
    if ( a.length < b.length ) return 1
    return 0
  })

  // конвертируем в новый массив где value количество записей
  let newGroup = rowGrouped.map(x => ({ name: x[0]['bts'], value: x.length }))

  const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${newGroup[index]['value']}`}
      </text>
    )
  }

  return (
    <React.Fragment>
      <div>
        <PieChart width={400} height={400} style={{display: 'inline-block'}}>
          <Pie
            data={newGroup.slice(0,-1)}
            cx="50%"
            cy="50%"
            label
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            ))}
          </Pie>
        </PieChart>

        <PieChart width={400} height={400} style={{display: 'inline-block'}}>
          <Legend />

          <Pie
            data={newGroup.slice(0,3)}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            ))}
          </Pie>
        </PieChart>
      </div>

    </React.Fragment>
  )
}
