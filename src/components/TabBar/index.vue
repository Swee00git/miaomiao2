<template>
    <footer id="footer">
        <ul>
            <router-link tag="li" to="/movie">
                <i class="iconfont icon-dianying"></i>
                <p>movies</p>
            </router-link>
            <router-link tag="li" to="/cinema">
                <i class="iconfont icon-yingyuan"></i>
                <p>cinema</p>
            </router-link>
            <router-link tag="li" to="/mine">
                <i class="iconfont icon-wode"></i>
                <p>mine</p>
            </router-link>
        </ul>
    </footer>
</template>

<script>
export default {
   name:'TabBar'
}
</script>

<style scoped>
    #footer{
        width: 100%;
        height: 50px;
        background: rgb(214, 228, 240);
        border-top: 2px solid palevioletred;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    #footer ul{
        display: flex;
        text-align: center;
        height: 50px;
        align-items: center;
    }
    #footer ul li{
        flex: 1;
        height: 50px;
    }
    #footer ul li.active{
        color: purple;
    }
    #footer ul li.router-link-active{
        color: purple;
    }
    #footer ul li i{
        font-size: 20px;
    }
    #footer ul li p{
        font-size: 12px;
        line-height: 18px;
    }
</style>