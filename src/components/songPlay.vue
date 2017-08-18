<template>
  <div class="song">
     <h2 class="songName">{{this.songName}}</h2>
     <p class="singer">—————{{this.singer}}—————</p>
    <img :src="albumPicture" class="album">
  <div style="position: relative;
    width: 90%;
    height: auto;
    margin: 50px auto;
    clear: both;
    display: inline-block;" class="box">
  <span style="float:left;width:10%;" class="beginTime">{{this.showTime}}</span>
    <div class="ProgressBar" @mousedown="turn"></div>
    <div class="ProgressBarMove"></div>
    <div class="ball" @mousedown="go" @mouseout="stopmoving" @mousemove="mousemoving"></div>
  <span style="float:right;width:10%">{{totalTime}}</span>
  </div>
  <div>
   <img src="../assets/last.png" class="playButton" @click="lastSong">
   <img src="../assets/play.png" class="playButton" v-show="play" @click="stopPlay">
   <img src="../assets/stop.png" class="playButton" v-show="stop" @click="startplay">
   <img src="../assets/next.png" class="playButton" @click="nextSong">
   </div>
   <audio :src="song" autoplay id="audio"></audio>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      play:true,
      stop:false,
      albumPicture:'',
      song:'',
      isplaying:false,
      index:'',
      songName:'',
      singer:'',
      totalTime:'',
      ProgressBar:'',
      ballMoving:'',
      barMoving:0,
      time:0,
      Barwidth:'',
      a:'',
      Barmoving:'',
      showTime:'',
      begin:false,
    }
  },
  computed: mapState([
      'singerList',
      'singerDETAILS',
      'singerPic',
      'songUrl',
      'albumnPic',
      'singerDetailIndex',
  ]),
  created(){
      this.getSong();
      this.index = this.singerDetailIndex;
      this.addTime();
  },
  mounted(){
      console.log(document.querySelector('.ProgressBar').offsetWidth);
      this.ProgressBar = document.querySelector('.ProgressBar').offsetWidth;  
  },
  watch:{
  },
  methods:{
    stopPlay(){
      this.play=false
      this.stop=true
      this.pause=false
        var audio =document.querySelector('#audio');
            audio.pause();
        window.clearInterval(this.addTime);
    },
    startplay(){
      this.play=true
      this.stop=false
        var audio =document.querySelector('#audio');

            audio.play();
        this.addTime();

    },
    getSong(){
      console.log(this.singerDETAILS[this.singerDetailIndex])
                    let data = this.singerDETAILS[this.singerDetailIndex].musicData
                    this.change(data)
    },
    move(){
      if(this.Barwidth*this.time>this.ProgressBar||this.play==false){
         window.clearInterval(this.a)
      }
       this.Barwidth=parseInt(this.ProgressBar)/parseInt(this.singerDETAILS[this.singerDetailIndex].musicData.interval);
       let n = parseInt(this.singerDETAILS[this.singerDetailIndex].musicData.interval)/parseInt(this.ProgressBar);
         console.log(this.Barwidth*this.time);
         document.querySelector('.ball').style.marginLeft =  this.Barwidth*this.time+"px";
         document.querySelector('.ProgressBarMove').style.width =  this.Barwidth*this.time+"px";

      this.time = this.time+1;
      let theTime=this.time;
      let theTime1=0;
      let theTime2=0;
    if(this.time > 60) {  
        theTime1 = parseInt(this.time/60);  
        theTime = parseInt(this.time%60);  
            if(theTime1 > 60) {  
            theTime2 = parseInt(theTime1/60);  
            theTime1 = parseInt(theTime1%60);  
            }  
    }  
    if (theTime<10){
      theTime=0+theTime
    }
        let result =""+parseInt(theTime1)+":"+""+parseInt(theTime)+"";  

      this.showTime=result;
    },
    addTime(){this.a = window.setInterval(this.move,1000)},
    change(data){
      
      let theTime;
      let theTime1=0;
      let theTime2=0;
      this.totalTime=data.interval;

    if(data.interval > 60) {  
        theTime1 = parseInt(data.interval/60);  
        theTime = parseInt(data.interval%60);  
            if(theTime1 > 60) {  
            theTime2 = parseInt(theTime1/60);  
            theTime1 = parseInt(theTime1%60);  
            }  
    }  
        let result = ""+parseInt(theTime)+"";  
        if(theTime1 > 0) {  
        result = ""+parseInt(theTime1)+":"+result;  
        }  
        if(theTime2 > 0) {  
        result = ""+parseInt(theTime2)+":"+result;  
        }   
      this.totalTime=result;
      this.songName=data.songname;
      console.log(data.singer[0].name);
      this.singer=data.singer[0].name;
              let m = data.albummid.substr(data.albummid.length-1,1);
                   let n = data.albummid.substr(data.albummid.length-2,1);
                   this.albumPicture = 'http://imgcache.qq.com/music/photo/mid_album_90/'+n+'/'+m+'/'+data.albummid+'.jpg'
      this.song = 'http://ws.stream.qqmusic.qq.com/'+data.songid+'.m4a?fromtag=46'  
    },
    nextSong(){
      this.index=this.index+1;
                   let data = this.singerDETAILS[this.index].musicData
                   this.change(data)      
    },
    lastSong(){
      this.index=this.index-1;
      let data = this.singerDETAILS[this.index].musicData
                   this.change(data) 
    },

    turn(e){
         console.log(this.time);
         console.log(e);
         console.log(document.querySelector('.box').offsetLeft);
         console.log(document.body.clientWidth)
         console.log(0.1*document.body.clientWidth)
         this.Barmoving = e.clientX-document.querySelector('.box').offsetLeft-0.1*document.body.clientWidth;
         this.time = this.Barmoving/this.Barwidth;
         console.log(this.Barmoving);
         console.log(this.Barmoving)
         console.log(this.time);
         console.log(document.querySelector('.ball').style.marginLeft)
         document.querySelector('#audio').currentTime=this.time;

    },
    go(e){
      console.log(e);
      this.begin=true;
    },
    mousemoving(e){
      console.log(e);
      if(this.begin==true){
      this.Barmoving = e.clientX-document.querySelector('.box').offsetLeft-0.1*document.body.clientWidth;
      this.time = this.Barmoving/this.Barwidth;
      document.querySelector('.ball').style.marginLeft =  this.Barwidth*this.time+"px";
         document.querySelector('.ProgressBarMove').style.width =  this.Barwidth*this.time+"px";
      }
    },
    stopmoving(e){
      console.log(this.time);
      console.log("aaaaa");
      document.querySelector("#audio").currentTime = this.time;
      this.begin=false
    }
  }
} 
</script>

<style scoped>
  .playButton{
    margin-top: 30px;
    width: 70px;
    height: 70px;
  }
  .album{
    width: 200px;
    border-radius: 100px;
    height: 200px; 
  }
  .songName{
    height: 70px;
    margin-top:30px;
  }
  .singer{
    height: 70px
  }
  .ProgressBar{
    width: 80%;
    height: 0.5px;
    border:0.1px solid #999;
    float: left;
  }
  .ball{
    width:15px;
    height:15px;
    border-radius:7.5px;
    background-color: blue;
    position: absolute;
    left: 10%;
    top: -5px;
  }
  .ProgressBarMove{
    height: 3px;
    background-color: blue;
    position: absolute;
    left: 10%
  }
</style>