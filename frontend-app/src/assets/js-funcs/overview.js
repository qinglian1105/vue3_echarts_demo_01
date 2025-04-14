import * as echarts from 'echarts'

function create_pie_chart(pie_data, pie_title) {
  var chartDom = document.getElementById('pie-chart')
  var myChart = echarts.init(chartDom)
  window.addEventListener(
    'resize',
    () => {
      myChart.resize()
    },
    false,
  )
  let options = {
    title: {
      text: pie_title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return `${params.seriesName}<br>${params.marker}${params.name}<span style="float: right; margin-left: 20px"><b>${params.value.toLocaleString()} (單位:億)</b> (${params.percent}%)</span>`
      },
    },
    series: [
      {
        name: '產業別',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: pie_data,
      },
    ],
  }
  myChart.setOption(options)
}

function create_bar_chart(bar_data, bar_title) {
  var chartDom = document.getElementById('bar-chart')
  var myChart = echarts.init(chartDom)
  window.addEventListener(
    'resize',
    () => {
      myChart.resize()
    },
    false,
  )

  let options = {
    title: {
      text: bar_title,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params) {
        return `ETF代號: ${params[0].name}<br>市值: ${params[0].data.toLocaleString()} (單位:億)</span>`
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: bar_data.x,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: bar_data.y,
      },
    ],
  }
  myChart.setOption(options)
}

function transfer_pie_data(names, values) {
  let pie_datas = []
  let pie_data = ''
  for (let i = 0; i < names.length; i++) {
    pie_data = { name: names[i], value: Math.round(values[i] / 100, 2) }
    pie_datas.push(pie_data)
  }
  return pie_datas
}

function transfer_bar_data(etf_code, market_value) {
  let bar_data_x = Object.values(etf_code)
  let bar_data_y = Object.values(market_value).map(function (item) {
    return Math.round(item / 100000000)
  })
  let bar_data = { x: bar_data_x, y: bar_data_y }
  return bar_data
}

function transfer_holding_dates(date_data) {
  let holding_dates = []
  for (let i = 0; i < date_data.length; i++) {
    holding_dates.push(date_data[i].label)
  }
  return holding_dates
}

function transfer_table_top10_stock(top10_stock) {
  let theads = Object.keys(top10_stock[0])
  let trss = []
  for (let i = 0; i < top10_stock.length; i++) {
    let trs = [
      top10_stock[i]['Num'],
      top10_stock[i]['Security Code'],
      top10_stock[i]['Security Name'],
      top10_stock[i]['Industry Name'],
      top10_stock[i]['Market Value'],
    ]
    trss.push(trs)
  }
  return { thead: theads, trs: trss }
}

export {
  create_pie_chart,
  create_bar_chart,
  transfer_pie_data,
  transfer_bar_data,
  transfer_holding_dates,
  transfer_table_top10_stock
}
