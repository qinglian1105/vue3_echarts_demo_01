<template>
    <div class="row">
        <div class="row" style="width: 60%;">
            <div class="col-md">
                <select v-model="tabSelectDates" class="form-select">
                    <option disabled value="">Please select date</option>
                    <option v-for="selectdate in selectDates">{{ selectdate }}</option>
                </select>
            </div>
            <div class="col-md">
                <button type="button" class="btn btn-outline-secondary" @click="submitDate">Submit</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios";
import { useFinSelectDateStore } from "../stores/FinInfoSelectDate.js";
import {
    create_pie_chart,
    create_bar_chart,
    transfer_pie_data,
    transfer_bar_data,
    transfer_holding_dates,
    transfer_table_top10_stock,
} from "../assets/js-funcs/overview.js"
import { change_metric_sign_color } from "../assets/js-funcs/fin_info.js"

const useFinDateStore = useFinSelectDateStore();
// const api_url_invest = `${import.meta.env.VITE_API_URL_INVEST}/api`
const api_url_invest = 'http://localhost:5008/api'

let selectDates = ref([])
let tabSelectDates = ref('')

async function get_pie_data(select_date) {
    await axios.post(api_url_invest + '/overview/get_stock_by_industry', { holding_date: select_date })
        .then(function (response) {
            let pie_title = response.data.title
            if (response.data) {
                let pie_data_update = transfer_pie_data(response.data.names, response.data.values)
                create_pie_chart(pie_data_update, pie_title)
            } else {
                pie_data_update = []
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function get_bar_data(select_date) {
    await axios.post(api_url_invest + '/overview/get_stock_by_etfs', { holding_date: select_date })
        .then(function (response) {
            let bar_title = response.data.title
            if (response.data) {
                let bar_data_update = transfer_bar_data(response.data.df['ETF Code'], response.data.df['Market Value'])
                create_bar_chart(bar_data_update, bar_title)
            } else {
                bar_data_update = []
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function get_metric_stock_mv(select_date) {
    await axios.post(api_url_invest + '/overview/get_stock', { holding_date: select_date })
        .then(function (response) {
            if (response.data) {
                useFinDateStore.updateMetricStockMv(response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function get_metric_stock_counts(select_date) {
    await axios.post(api_url_invest + '/overview/get_stock_counts', { holding_date: select_date })
        .then(function (response) {
            if (response.data) {
                useFinDateStore.updateMectriStockCounts(response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function get_metric_bond(select_date) {
    await axios.post(api_url_invest + '/overview/get_bond', { holding_date: select_date })
        .then(function (response) {
            if (response.data) {
                useFinDateStore.updateMetricBond(response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function get_metric_cash(select_date) {
    await axios.post(api_url_invest + '/overview/get_cash', { holding_date: select_date })
        .then(function (response) {
            if (response.data) {
                useFinDateStore.updateMetricCash(response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function get_top10_stock_table_data(select_date) {
    let api_url = api_url_invest + '/overview/get_top_stocks_in_etfs'
    let post_data = { holding_date: select_date }
    await axios.post(api_url, post_data,)
        .then(function (response) {
            if (response.data) {
                let top10_stock = transfer_table_top10_stock(response.data)
                useFinDateStore.updateTableTop10Stock(top10_stock)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function submitDate() {
    let selectResult = tabSelectDates.value
    await get_metric_stock_mv(selectResult);
    await get_metric_stock_counts(selectResult);
    await get_metric_bond(selectResult);
    await get_metric_cash(selectResult);
    await get_pie_data(selectResult);
    await get_bar_data(selectResult);
    await get_top10_stock_table_data(selectResult);
    useFinDateStore.updateName(selectResult);
    change_metric_sign_color();
}

onMounted(() => {
    axios.get(api_url_invest + '/overview/get_unique_holding_date')
        .then(function (response) {
            if (response.data) {
                let holding_dates = transfer_holding_dates(response.data)
                selectDates.value = holding_dates
            } else {
                selectDates.value = []
            }
        })
        .catch(function (error) {
            console.log(error);
        });

})
</script>