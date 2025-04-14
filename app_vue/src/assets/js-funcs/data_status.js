function transfer_data_status_table_counts(input_from_api) {
  let thead = Object.keys(input_from_api[0])
  let trs = []
  let the_date = ''
  for (let i = 0; i < input_from_api.length; i++) {
    if (input_from_api[i]['trading_date'] !== undefined) {
      the_date = input_from_api[i]['trading_date']
    } else {
      the_date = input_from_api[i]['holding_date']
    }
    let tr = [
      input_from_api[i]['num'],
      the_date,
      input_from_api[i]['record_counts'],
    ]
    trs.push(tr)
  }
  return { thead: thead, trs: trs }
}


function transfer_data_status_table_records(input_from_api) {
  let thead = ''
  let trs = []
  if (input_from_api[0]['scraping_time'] !== undefined) {
    thead = Object.keys(input_from_api[0])
    trs = []
    for (let i = 0; i < input_from_api.length; i++) {
      let tr = [
        input_from_api[i]['num'],
        input_from_api[i]['holding_date'],
        input_from_api[i]['etf_code'],
        input_from_api[i]['s_code'],
        input_from_api[i]['s_name'],
        input_from_api[i]['s_close'],
        input_from_api[i]['holding_percentage'],
        input_from_api[i]['holding_amount'],
        input_from_api[i]['unit'],
        input_from_api[i]['scraping_time'],
      ]
      trs.push(tr)
    }
  } else {
    thead = Object.keys(input_from_api[0])
    trs = []
    for (let i = 0; i < input_from_api.length; i++) {
      let tr = [
        input_from_api[i]['num'],
        input_from_api[i]['trading_date'],
        input_from_api[i]['etf_code'],
        input_from_api[i]['etf_name'],
        input_from_api[i]['etf_close'],
        input_from_api[i]['insert_time'],
      ]
      trs.push(tr)
    }
  }
  return { thead: thead, trs: trs }
}


export {
  transfer_data_status_table_counts, transfer_data_status_table_records
}
