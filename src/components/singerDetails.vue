<template>
   <div class="slist">
      <div class="pic">
           <img :src="singerPic"> 
      </div>
      <ul class="singerList">
        <li class="singer" v-for="(details,index) in singerDETAILS" @click="play(index)">
          <p>{{details.musicData.songname}}</p>
        </li>
      </ul>
   </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      singer: [],
      singerId:[],
      pic:'',
    }
  },
  computed: mapState([
      'singerList',
      'singerDETAILS',
      'singerPic'
  ]),
  created(){
  	console.log(this.singerDETAILS)
  },
  methods:{
  	play(index){
  		this.$store.commit('GET_SINGERDETAILS_INDEX',{index:index})
  		this.$router.push({path: '/songPlay'})
  	}
  }
}	
</script>

<style scoped>
.slist{
  width: 100%;
  height: 100%;
}
.pic{
	width: 100%;
	height: auto;
}
.pic img{
	width: 100%;
	height: auto;
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