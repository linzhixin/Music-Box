import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './mutations-types'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
       singerList:[],
       singerDETAILS:[],
       singerPic:'',
       singerDetailIndex:'',
	},
	actions:{

  },
	mutations: {
          GET_SINGER_LIST(state, singerList) {
           state.singerList = singerList
          },
          GET_SINGER_DETAILS(state,{list,singerPic}) {
           state.singerDETAILS = list
           console.log(singerPic)
           state.singerPic = singerPic
           console.log(state.singerPic)
          },
          GET_SINGERDETAILS_INDEX(state,{index}){
            state.singerDetailIndex = index
            console.log(state.singerDetailIndex)
          }

	},
	getters: {

	},
})
export default store