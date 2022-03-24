'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs')

const result = excelToJson({
	sourceFile: 'data.xlsx',
	columnToKey: {
		A: 'time',
		B: 'bts',
		C: 'latitude',
		D: 'longitude',
		E: 'rsrp',
		F: 'rsrq'
	}
});

let r = result['Лист1'].filter(x => x.time != 'Time')

try {
	fs.writeFileSync('./data.json', JSON.stringify(r))
	//file written successfully
} catch (err) {
	console.error(err)
}
	//

console.log(r)
