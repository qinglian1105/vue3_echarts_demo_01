  
  function transfer_auth_user_display_all(input_from_api) {
    let thead = ''
    let trs = []    
    thead = Object.keys(input_from_api[0])
    trs = []
    for (let i = 0; i < input_from_api.length; i++) {
    let tr = [
        input_from_api[i]['id'],
        input_from_api[i]['Useranme'],
        input_from_api[i]['Password'],
        input_from_api[i]['Authority (accessible pages)'],
        input_from_api[i]['Create_time'],
        input_from_api[i]['Update_time'],       
    ]
    trs.push(tr)    
    }
    return { thead: thead, trs: trs }
  }
  
  function get_date_time_string (timestamp) {
    const date = new Date(timestamp);     
    let year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1);  
    let day = '' + date.getDate();     
    let hours = '' + date.getHours();
    let minutes = '' + date.getMinutes();
    let seconds = '' + date.getSeconds();      
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;     
    return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
}

  
  export {
    transfer_auth_user_display_all, get_date_time_string
  }
  