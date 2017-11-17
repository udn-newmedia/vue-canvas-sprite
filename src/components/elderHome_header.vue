<template>
	<header>
		<div class="logo">
			<a href="./index.html"><img :src="udnLogo" alt="聯合報" title="聯合報"></a>
			<a slot="logo" href="./index.html" class="hidden-xs hidden-sm"><img src="https://udn.com/upf/newmedia/image/nmd-logo.svg" alt="新媒體中心" title="新媒體中心"></a>
		</div>
		<div class="blank"></div>
		<div class="menu-btn hidden-lg" :class="{menuIcon_isOpen : menu_isOpen}" @click="menuOpen">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>			
		<nav class="menuContainer" :class="{itemContainer_isOpen: menu_isOpen}">
			<ul>
				<li v-for="menuItem in menuItems">
					<p><a :href="menuItem.link">{{menuItem.title}}</a></p>
				</li>
			</ul>
			<div class="menu_logo hidden-lg hidden-md">
				<Logo/>
			</div>			
		</nav>
		<div class="comment-btn hidden-lg" @click="commentOpen" :class="{comment_Open: comment_isOpen}">
			<img :src="commentIcon" title="comment">
		</div>			
		<div class="commentContainer hidden-lg" :class="{itemContainer_isOpen: comment_isOpen}">
			<FBComment href="https://udn.com/upf/newmedia/2017_data/farewell/index.html"/>
		</div>
	</header>
</template>

<script>
import Logo from '../components/Logo.vue'
import udnLogo from '../assets/udn-logo_black.png'
import commentIcon from '../assets/ic_textsms_black_24px.svg'
import commentIcon2 from '../assets/ic_textsms_white_24px.svg'
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
    	menuItems: [
    		{
    			"link": ".",
    			"title": "再玩一次"
    		},
    		{
    			"link": ".",
    			"title": "需求解密"
    		}
    	],
    }
  },
  methods: {
  	menuOpen () {
  		this.comment_isOpen ? this.comment_isOpen = false : this.comment_isOpen = false;
  		this.menu_isOpen ? this.menu_isOpen = false : this.menu_isOpen = true;
  	},
  	commentOpen () {
  		this.comment_isOpen ? this.comment_isOpen = false : this.comment_isOpen = true;
  		this.menu_isOpen ? this.menu_isOpen = false : this.menu_isOpen = false;
  	},
  },
  mounted: function() {
  	console.log(this)
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
		height: 50px;
		display: flex;
		background-color: red;
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
		order: 0;
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
	.blank{
		position: absolute;
		z-index: 120;
		width: 100%;
		height: 100%;
		background-color: #FFF;
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
		transition: .6s ease-in-out;
		order: 1;
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
		height: 100vh;
		background-color: #FFF;
		overflow: scroll;
		transform: translate(100%, 0);
		transition: .6s;
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
				width: 100%;
				height: 50px;
				list-style: none;
				display: flex;
				justify-content: center;
				align-items: center;					
				border: 1px solid black;
				border-radius: 6px;
				margin: 10px 0;
				p{
					margin: 0;
					a{
						color: black;
					}
				}	
			}
		}
	}	
	.itemContainer_isOpen{
		transform: translate(0, 0);
	}
	.menu_logo{
		position: absolute;
		left: 10%;
		bottom: 15px;
		width: 80%;
	}
@media screen and (min-width: 1024px) {
	header{
		height: 80px;
		top: calc(100% - 80px);
		border-top: 2px solid black;
	}
	.menuContainer{
		position: relative;
		z-index: 200;
		width: auto;
		height: 100%;
		padding: 0;
		transform: translate(0, 0);
		ul{
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: 15px;
			li{
				float: left;
				width: 120px;
				margin-left: 15px;
			}
		}
	}		
}
</style>
