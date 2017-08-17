<template>
   <div class="slist">
      <ul class="singerList">
        <li class="singer" v-for="(singers,index) in singer" @click="singerDetials(singers.Fsinger_mid,index)">
          <img :src="singerId[index]">
          <p>{{singers.Fsinger_name}}</p>
        </li>
      </ul>
   </div>
</template>

<script>
import { mapState } from 'vuex';
import { getSingerList,getSingerDetail} from '../api/singer'
import { ERR_OK } from '../api/config'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      singer: [],
      singerId:[],
    }
  },
  computed: mapState([
      'singerList',
  ]),
  methods:{
      _getSingerList() {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singer=res.data.list
            for(var i=0;i<res.data.list.length;i++){
                   let id = res.data.list[i].Fsinger_mid;
                   let m = id.substr(id.length-1,1);
                   let n = id.substr(id.length-2,1);
                   let url = 'http://imgcache.qq.com/music/photo/mid_singer_90/'+n+'/'+m+'/'+id+'.jpg'
                   this.singerId.push(url)
            }
          }
        })
      },
      singerDetials(id,index){
        console.log(id);
        console.log(this.singerId[index])
        getSingerDetail(id).then(res => {
          if (res.code === ERR_OK) {
             this.$store.commit('GET_SINGER_DETAILS',{list:res.data.list,
              singerPic:this.singerId[index]})
          }
        })
        this.$router.push({path: '/singerDetails'})      
      }
  },
  created(){
      this._getSingerList()
  },
}
</script>


<style scoped>
.slist{
  width: 100%;
  height: 100%;
}
.singerList{
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 0
}
.singer{
  width: 100%;
  padding:0px 30px; 
  background-color: #eee;
  list-style:none;
  margin:0;
  height:100px;
  box-sizing:border-box;
-moz-box-sizing:border-box; /* Firefox */
-webkit-box-sizing:border-box;
}
.singer img{
  width: 70px;
  height: 70px;
  float: left;
  margin-top: 15px;
  margin-right: 20px;
}
.singer p{
  float: left;
    height:100px;
    line-height:100px
}


</style>
