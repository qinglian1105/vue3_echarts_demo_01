
function change_metric_sign_color() {
    let ids = [
        'metric-stock-mv-change',
        'metric-stock-counts-change',
        'metric-bond-change',
        'metric-cash-change'
    ]
    for (let i = 0; i < ids.length; i++) {
        let element = document.getElementById(ids[i]);
        if (element.textContent.includes('▲')) {
            element.style.color = 'red'
        } else if (element.textContent.includes('▼')) {
            element.style.color = 'green'
        }
        else {
            element.style.color = 'black'
        }
    }
}


export {
    change_metric_sign_color,
}
