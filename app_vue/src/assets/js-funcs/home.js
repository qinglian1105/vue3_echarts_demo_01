import * as echarts from 'echarts'

function create_tree_chart(tree_data) {
    var chartDom = document.getElementById('container-home-tree')
    var myChart = echarts.init(chartDom)
    window.addEventListener(
        'resize',
        () => {
            myChart.resize()
        },
        false,
    )
    let options = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                data: [tree_data],
                top: '1%',
                left: '12%',
                bottom: '1%',
                right: '20%',
                symbolSize: 12,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                emphasis: {
                    focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    }
    myChart.setOption(options)
}


export {
    create_tree_chart
}
