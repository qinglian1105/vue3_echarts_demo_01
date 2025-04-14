<template>
    <div class="row">
        <div class="row">
            <div id="container-home-tree"></div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { create_tree_chart } from "../assets/js-funcs/home.js"

    const tree_data = {
        "name": "Platform",
        "children": [
            { "name": "Home" },
            { "name": "Financial Info" },
            { "name": "DB Status" },
            { "name": "Auth (user management)" },
            { "name": "Test Page" },
            {
                "name": "Other Items", "children": [
                    { "name": "Sub Item_01" },
                    { "name": "Sub Item_02" },
                    { "name": "Sub Item_03" },
                    { "name": "Sub Item_04" },
                    { "name": "Sub Item_05" },
                ]
            },
            { "name": "Logout" },
        ]
    }

    onMounted(() => {
        create_tree_chart(tree_data)
    })
</script>

<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
