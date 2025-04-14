<template>
    <div class="row">
        <div class="col-sm-3 mb-3 mb-sm-0">
            <div class="card text-center">
                <div class="card-body">
                    <h6 class="card-title">Stock Market</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{{ useFinDateStore.metric_stock_mv.stock }}</h6>
                    <p class="card-text" id="metric-stock-mv-change">{{ useFinDateStore.metric_stock_mv.change }}</p>
                </div>
            </div>
        </div>

        <div class="col-sm-3 mb-3 mb-sm-0">
            <div class="card text-center">
                <div class="card-body">
                    <h6 class="card-title">Stocks - Counts</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{{
                        useFinDateStore.metric_stock_counts.stock_counts }}</h6>
                    <p class="card-text" id="metric-stock-counts-change">{{ useFinDateStore.metric_stock_counts.change }}</p>
                </div>
            </div>
        </div>

        <div class="col-sm-3 mb-3 mb-sm-0">
            <div class="card text-center">
                <div class="card-body">
                    <h6 class="card-title">Bonds - Amount</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{{ useFinDateStore.metric_bond.bond }}</h6>
                    <p class="card-text" id="metric-bond-change">{{ useFinDateStore.metric_bond.change }}</p>
                </div>
            </div>
        </div>

        <div class="col-sm-3 mb-3 mb-sm-0">
            <div class="card text-center">
                <div class="card-body">
                    <h6 class="card-title">Cash - Amount</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{{ useFinDateStore.metric_cash.cash }}</h6>
                    <p class="card-text" id="metric-cash-change">{{ useFinDateStore.metric_cash.change }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useFinSelectDateStore } from "../stores/FinInfoSelectDate.js";
const useFinDateStore = useFinSelectDateStore();
</script>
