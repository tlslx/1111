import store from './store';
/**
 * 
 * @param {*} row 
 * @param {*} column 
 * @param {*} field 
 * @param {*} dataDictionary 
 * @returns {*} ''
 */
function dataDictionaryFormatter(row, column, field, dataDictionary) {
  // let _field = field;
  let _dataDictionary = dataDictionary;
  if (row && column && column.property) {
    let _field = column.property;
    _dataDictionary = _dataDictionary || store.getters._dataDictionary;
    let data = _dataDictionary[_field];
    if (!data) {
      return '';
    }
    for (let i = 0, len = data.length; i < len; i++) {
      if (String(row[column.property]) === String(data[i].value)) {
        return data[i].text;
      }
    }
  } else {
    return '';
  }
}
/**
 * 
 * @param {*} row 
 * @param {*} column 
 * @param {*} format
 * @returns {*} '' 
 */
function datetimeFormatter(row, column, format) {
  if (row && column && column.property) {
    let field = column.property;
    let value = row[field];
    if (value == null || typeof value === 'undefined' || value === "") {
      return "";
    }
    let datefr = value;
    if (typeof value === 'string') {
    //  datefr = Date.parse(value);
      let datestr = value.replace(/-/g, '/');
      datefr = Date.parse(datestr);
    }
    return Date.format(datefr, format);
  } else {
    return '';
  }
}

export default {
  dataDictionary(row, column, field, dataDictionary) {
    // console.info(row, column, field, dataDictionary);
    return dataDictionaryFormatter(row, column, field, dataDictionary);
  },
  datetime(row, column) {
    return datetimeFormatter(row, column, 'yyyy-MM-dd hh:mm:ss');
  },
  date(row, column) {
    return datetimeFormatter(row, column, 'yyyy-MM-dd');
  }
};
