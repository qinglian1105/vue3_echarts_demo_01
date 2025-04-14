import { defineStore } from 'pinia'

export const useFinSelectDateStore = defineStore(
    'fin_info_select_date', {
    state: () => ({
        fin_select_date: '',
        metric_stock_mv: '',
        metric_stock_counts: '',
        metric_bond: '',
        metric_cash: '',
        table_top10_stock: '',
    }),

    actions: {
        updateName(newDate) {
            this.fin_select_date = newDate;
        },
        updateMetricStockMv(newFig) {
            this.metric_stock_mv = newFig;
        },
        updateMectriStockCounts(newFig) {
            this.metric_stock_counts = newFig;
        },
        updateMetricBond(newFig) {
            this.metric_bond = newFig;
        },
        updateMetricCash(newFig) {
            this.metric_cash = newFig;
        },
        updateTableTop10Stock(newFig) {
            this.table_top10_stock = newFig;
        },
    },

}

)