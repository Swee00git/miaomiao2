<template>
    <div class="movie_body">
        <Loading v-if="isLoading"/>
       <Scroller v-else ref="city_list" :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="massage">{{massage}}</li>
                <li v-for="item in moviesList" :key="item.pm">
                    <div class="pic_show" @touchstart="handleToDetail(item.pm)"><img src="/images/movie_1.jpg"></div>
                    <div class="info_list">
                        <h2 @touchstart="handleToDetail(item.pm)">{{ item.city }}</h2>
                        <p>观众评 <span class="grade">{{item.pm}}</span></p>
                        <p>主演: {{item.aqi_level}}</p>
                        <p>今天{{item.province}}影院放映{{item.aqi}}场</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
       </Scroller>
	</div>
</template>

<script>
export default {
    name : 'NowPLaying',
    data(){
        return {
            moviesList:[],
            massage:'',
            isLoading:true,
            // prevCityId :-1
        }
    },
    activated(){
        // var cityId = this.$store.state.city.id;
        // console.log(cityId);
        // if (this.prevCityId === cityId) {
        //     return;
        // }
        // this.isLoading = true;

        this.axios.get('https://v0.yiketianqi.com/aqi/rankcity?appid=36318646&appsecret=VSEak9nH'/*+cityId*/).then((res)=>{
               // console.log(res);
            var status = res.status;
            if ( status === 200 ) {
                this.moviesList = res.data.list;
                this.isLoading = false;
                // this.prevCityId = cityId;
            }else{
                console.log('not in page!')
            }
        }); 
    },
    methods : {
        // handleToDetail(){
        //     console.log('tap');
        // },
        handleToScroll(pos) {
            if (pos.y > 30) {
                this.massage = "reload...";
            }
        },

        handleToTouchEnd(pos) {
            if (pos.y > 30) {
                this.axios
                .get(
                    "https://v0.yiketianqi.com/aqi/rankcity?appid=36318646&appsecret=VSEak9nH"
                )
                .then((res) => {
                    if (res.status === 200) {
                    console.log("ok", res.status);
                    setTimeout(() => {
                        this.cities = res.data.list;
                        this.massage = "";
                    }, 1000);
                    this.massage = "reload over!";
                    } else {
                    console.log(res.status);
                    }
                });
                //  this.pullDownMsg = "reload over!";
            }
        },
        handleToDetail(moviePm){
           // console.log(moviedate);
            this.$router.push('/Movie/detail/1/' +moviePm)
        }
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul .massage{margin: 0px;padding: 0px;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>