<template>
    <div class="row">
        <div class="col-sm-12 mb-3 mb-sm-0">
            <div class="card">
                <br>
                <h5 style="text-align: center;">Top Stocks of ETFs</h5>
                <br>
                <div class="d-flex justify-content-center">
                    <table class="table table-striped" id="fin-info-overview-top-stocks">
                        <thead>
                            <tr>
                                <th v-for="thd in useFinDateStore.table_top10_stock.thead">{{ thd }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="trs in useFinDateStore.table_top10_stock.trs">
                                <td v-for="tr in trs">{{ tr }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFinSelectDateStore } from "../stores/FinInfoSelectDate.js";
const useFinDateStore = useFinSelectDateStore();
</script>

<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
