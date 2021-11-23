<template>
    <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="item in hotList" :key="item.pm">{{item.city}}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="item in cityList" :key="item.province">
                    <h2>{{item.province}}</h2>
                    <ul>
                        <li v-for="itemList in item.list" :key="itemList.pm">{{itemList.nm}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.province" @click="handleToIndex(index)">{{item.province}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : 'City',
    data(){
        return {
            cityList:[],
            hotList:[]
        }
    },
    mounted(){
        this.axios.get('https://v0.yiketianqi.com/aqi/rankcity?appid=19289171&appsecret=6HvV6Dvl').then((res)=>{
            //console.log(res);
            var msg = res.status;
            if (msg === 200) {
            var cities = res.data.list;
            //console.log(cities);
            //[{ index : 'A' , list : [{ nm : '阿城' , id = 123 }]}]
            var { cityList,hotList }=this.formatCityList(cities);
            this.cityList = cityList;
            this.hotList = hotList;
            } else {
                console.log('not in 200');
            }
        });
    },
    methods : {
        formatCityList(cities){
            var cityList = [];
            var hotList = [];

            for (let i = 0; i < cities.length; i++) {
                if (cities[i].pm<10) {
                    hotList.push(cities[i])
                }
                
            }

            for (let i = 0; i < cities.length; i++) {
                var province = cities[i].province;
                if (toCom(province)) {  //新添加index
                    cityList.push({province:province,list:[{nm:cities[i].city,pm:cities[i].pm,aqi:cities[i].aqi}]})
                }else{   //累加index
                    for (let j = 0; j < cityList.length; j++) {
                        if (cityList[j].province === province) {
                            cityList[j].list.push({nm:cities[i].city,pm:cities[i].pm,aqi:cities[i].aqi});
                        }                        
                    }
                }       
            }
            cityList.sort((n1,n2)=>{
                if (n1.province > n2.province) {
                    return 1;
                }else if (n1.province < n2.province) {
                    return -1;
                }else{
                    return 0;
                }
            });
            function toCom(province){
                for (let i = 0; i < cityList.length; i++) {
                    if ( cityList[i].province === province) {
                        return false;
                    }
                }
                return true;
            }
            //    console.log(cityList);
            //    console.log(hotList);
               return{
                   cityList,
                   hotList
               };
        },
        handleToIndex(index){
            console.log('in handle to index, arg: ', index);
           // window.scrollTo(0, this.$refs.city_sort.getElementsByTagName('h2')[index].offsetTop);
           var h2 = this.$refs.city_sort.getElementsByTagName('h2');
          // console.log(h2);
          // console.log('after scroll');
           this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            // h2.scrollIntoView();
        }
    }
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{ background-color:transparent;width:0;}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:50px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
.city_body .city_index ul li{cursor: pointer;font-size: 12px;}
</style>                        