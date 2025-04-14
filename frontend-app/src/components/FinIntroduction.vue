<template>
    <br>
    <div class="row" style="margin-left: 50px;">
        <div class="row">
            <h5 style="font-weight: bold;">{{ topic_name }}</h5><br><br>
            <p>{{ text_one }}</p>
            <p>{{ text_two }}</p>
            <p>{{ text_three }}</p><br><br><br>
        </div>

        <div class="row">
            <div>Date: 2025-04-11</div><br>
            <div>
                <table class="table table-sm" style="width: 90%; height: auto;">
                    <thead>
                        <tr>
                            <th v-for="thd in thds" scope="col">{{ thd }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tr in trs">
                            <td v-for="r in tr">{{ r }}</td>
                        </tr>
                    </tbody>
                </table>
                <br>
            </div>
        </div>

        <div class="row">
            <p>{{ more_info_text }}
                <a href="https://tw.stock.yahoo.com/tw-etf/total-assets" target="_blank">
                    {{ more_info_website }}
                </a>
            </p>
        </div>
    </div>
</template>

<script setup>
const topic_name = 'About this study'
const text_one = "The main subject of this study is Equity ETFs in Taiwan's capital market, and some of them are Multi-Asset ETF."
const text_two = "Besides, the second selection criteria is that asset size of the ETF exceeds NT$100 billion."
const text_three = "Therefore, there are 8 ETFs that meet the conditions, and their information is shown in the table below."
const more_info_text = 'About more information of Taiwan ETFs, please refer to  '
const more_info_website = " Yahoo Finance (Taiwan)"
const thds = ['Num', 'Security Code', 'Security Name (CHT)', 'Asset Value (億, TWD)']
const trs = [
    ['1', '0050', '元大台灣50', '4,771.13'],
    ['2', '0056', '元大高股息', '4,021.91'],
    ['3', '00878', '國泰永續高股息', '3,990.25'],
    ['4', '00919', '群益台灣精選高息', '3,351.06'],
    ['5', '006208', '富邦台50', '1,971.34'],
    ['6', '00929', '復華台灣科技優息', '1,698.09'],
    ['7', '00713', '元大台灣高息低波', '1,303.84'],
    ['8', '00940', '元大台灣價值高息', '1,216.02'],
]
</script>
