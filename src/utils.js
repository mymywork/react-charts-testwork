export const groupby = (list, key) => list.reduce((group, row) => {
    const v = row[key]
    group[v] = group[v] ?? []
    group[v].push(row)
    return group
  }, {})
