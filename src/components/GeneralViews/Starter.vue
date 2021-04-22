<template>
    <div></div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "login",
        methods: {
            ...mapActions(["authCheck", "isLogin"])
        },
        created() {
            this.isLogin()
                .then(res => {
                    this.$router.push("/admin");
                })
                .catch(res => {
                    window.location = window.location.href.split('#')[0] + '?#/login'
                });
        }
    };
</script>

<style scoped lang="scss">
</style>
