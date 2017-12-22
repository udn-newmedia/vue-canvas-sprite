<template>
	<header>
		<div class="logo">
			<a href="./index.html"><img :src="udnLogo" alt="聯合報" title="聯合報"></a>
		</div>
		<div id="elderLogo">
			<img src="../assets/elderHome_logo.png" alt="大人宅">
		</div>		
		<div class="blank" :style="{backgroundColor: headerBgc}"></div>
		<div class="menu-btn hidden-lg hidden-md" 
			 :class="{menuIcon_isOpen : menu_isOpen}"
			 @click="menuOpen">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>		
		<div class="comment-btn" 
			 @click="commentOpen" 
			 :class="{comment_Open: comment_isOpen}">
			<img :src="commentIcon" title="comment">
		</div>					
		<nav class="menuContainer"
			 :class="{itemContainer_isOpen: menu_isOpen}">
			<ul>
				<li>
					<a @click="playAgain" href="./index.html">重新開始</a>
				</li>
				<li>
					<a @click.prevent="menuClose">我的大人宅</a>
				</li>				
			</ul>
			<div class="menu_logo hidden-lg hidden-md">
				<Logo/>
			</div>			
		</nav>
		<div class="commentContainer"
			 :class="{itemContainer_isOpen: comment_isOpen}"
			 :style="{height: viewHeight+'px'}"
			 @transitionend="handleEnd"
			 @click="commentOpen">
			 <div class="cblank" style="background-color: #fff;"></div>
			<FBComment href="https://udn.com/upf/newmedia/2017_data/elderhome/index.html"/>
		</div>
	</header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Logo from '../components/Logo.vue'
import udnLogo from '../assets/udn-logo_black.png'
import commentIcon from '../assets/ic_textsms_black_24px.svg'
import FBComment from '../components/FBComment.vue'

export default {

  name: 'elderHome_header',
  components: {
  	Logo,
  	FBComment,
  },
  data: function () {
    return {
    	udnLogo: udnLogo,
    	commentIcon: commentIcon,
    	menu_isOpen: false,
    	comment_isOpen: false,
    	viewHeight: 0,
    }
  },
  computed: {
	...mapGetters([
  	  'quizIndex',
  	  'platform',
  	  'headerBgc',
  	  'webTitle'
  	]),
  },  
  methods: {
	...mapActions([
		'handle_lookDemand',
		'handle_headerBgc',
		'handle_headerTrans',
		'handle_again'
	]),  	
  	menuOpen () {
  		this.comment_isOpen ? this.comment_isOpen = false : this.comment_isOpen = false;
  		this.menu_isOpen ? this.menu_isOpen = false : this.menu_isOpen = true;
		ga("send", {
		    "hitType": "event",
		    "eventCategory": "button", 
		    "eventAction": "漢堡",	 
		    "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][點擊漢堡按鈕]"
		});
  	},
  	commentOpen () {
  		this.comment_isOpen ? this.comment_isOpen = false : this.comment_isOpen = true;
  		this.menu_isOpen ? this.menu_isOpen = false : this.menu_isOpen = false;
  		// this.handle_headerBgc()
		ga("send", {
		    "hitType": "event",
		    "eventCategory": "button", 
		    "eventAction": "討論",	 
		    "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][點擊討論按鈕]"
		});	
  	},
  	menuClose () {
  		this.menu_isOpen = false;
  		this.handle_lookDemand();
  		this.handle_headerBgc();
		ga("send", {
		    "hitType": "event",
		    "eventCategory": "button", 
		    "eventAction": "打造大人宅",	 
		    "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][打造大人宅]"
		}); 		
  	},
  	playAgain () {
  		this.menu_isOpen = false;
		ga("send", {
		    "hitType": "event",
		    "eventCategory": "button", 
		    "eventAction": "重頭開始",	 
		    "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][重新開始]"
		});
  	},
  	handleEnd () {
  		if(this.comment_isOpen === false) {
  			this.handle_headerTrans()  			
  		} 	
  	}
  },
  created: function () {
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            this.viewHeight = window.innerHeight - 4
        } else {
            this.viewHeight = window.innerHeight
        }
  },
  mounted() {
        window.addEventListener('resize', ()=> {
            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                this.viewHeight = window.innerHeight - 4
            } else {
                this.viewHeight = window.innerHeight
            }
        })  	
  	}
}
</script>

<style lang="scss" scoped>
	header{
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 55px;
		display: flex;
	}
	.logo{
		z-index: 200;
		top: 0;
		left: 0;
		height: 100%;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 0;
		margin-right: auto;
		display: flex;
		opacity: .7;
		order: 0;
		transition: opacity .3s ease-out;
		a{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			img{
				display: block;
				width: 130px;
				max-height: 100%;
			}
		}
	}
	.logo:hover{
		opacity: 1;
	}
	#elderLogo{
		position: absolute;
		z-index: 150;
		top: 5px;
		left: 0;
		width: 100%;
		background-color: transparent;
		img{
			display: block;
			width: 50px;
			height: 50px;
			margin: auto;
		}
	}	
	.blank{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 120;
		width: 100%;
		height: 100%;
		transition: .3s;
	}
	.comment-btn{
		position: relative;
		z-index: 200;
		height: 35px;
		width: 40px;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: auto;
		margin-right: 5px;
		transition: opacity .6s ease-in-out, transform .3s ease-in-out;
		opacity: .7;
		order: 1;
		cursor: pointer;
		&:active{
			transform: scale(.6);
		}
	}
	.cblank{
		width: 100%;
		height: 50px;
		background-color: #fff;
	}
	.comment_Open{
		opacity: .3;
	}
	.commentContainer{
		position: absolute;
		z-index: 50;
		top: 0;
		left: 0;
		width: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		transform: translate(100%, 0);
		transition: .6s;
		// background-color: rgba(black, .2);
		background-color: #fff;
		background-clip: content-box;
	}
	.menu-btn{
		position: relative;
		z-index: 200;
		height: 40px;
		width: 40px;
		cursor: pointer;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 5px;
		margin-right: 5px;
		opacity: .7;
		order: 2;
		span{
			display: block;
			position: absolute;
			left: 4px;
			width: 32px;
			height: 3px;
			background-color: black;
			opacity: 1;
		}
		span:nth-child(1){
			top: 9px;
			transform: translate(0, 0);
			transition: opacity 1s , transform .8s ease-in-out;
		}
		span:nth-child(2),span:nth-child(3){
			top: 18px;
			transform: rotate(0deg);
			transition: .6s ease-in-out;
		}
		span:nth-child(4){
			top: 27px;
			transform: translate(0, 0);
			transition: opacity 1s , transform 1s ease-in-out;
		}
	}
	.menuIcon_isOpen{
		span:nth-child(1){
			transform: translate(100%, 0);
			opacity: 0;
		}
		span:nth-child(2){
			transform: rotate(45deg);
		}	
		span:nth-child(3){
			transform: rotate(-45deg);
		}
		span:nth-child(4){
			transform: translate(100%, 0);
			opacity: 0;
		}
	}	
	.menuContainer{
		position: absolute;
		z-index: 51;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		padding: 50px 0 0 0 ;
		background-clip: content-box;
		background-color: #fff;
		transition: .6s;
		transform: translate(100%, 0);
		ul{
			display: block;
			padding: 15px;
			margin: 0;
			li{
				position: relative;
				width: 100%;
				height: 50px;
				list-style: none;		
				margin: 10px 0;
				border-bottom: .6px solid rgba(black, .2);
				cursor: pointer;
				a{
					position: absolute;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: black;
				}
			}
		}
	}	
	.itemContainer_isOpen{
		transform: translate(0, 0);
	}
	.menu_logo{
		position: relative;
	}
@media screen and (max-width: 374px) {
		.menu_logo{
			padding-left: 0;
		}
	}	
@media screen and (min-width: 1024px) {
	header{
		padding: 0 15px;
	}
	.logo{
		opacity: .5;
	}
	.menuContainer{
		position: relative;
		z-index: 200;
		width: auto;
		height: 100%;
		padding: 0;
		transform: translate(0, 0);
		background-color: transparent;
		ul{
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: 0;
			li{
				width: 80px;
				height: 35px;
				margin-left: 0;
				border-bottom: none;
			}
		}
	}
	.comment-btn{
		width: 40px;
		height: 40px;
		margin-left: 15px;
	}		
	.commentContainer{
		padding-left: 55%;
		background-color: rgba(black, .5);
		.fb-comment-block{
			margin-top: 0;
		}
	}
}
</style>
