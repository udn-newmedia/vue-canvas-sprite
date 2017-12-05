<template>
	<div class="demand">
		<h2 class="demandTitle">需求解密</h2>	
		<article class="explain">
			<p>國民健康署調查顯示，近六成長輩，最近一次發生跌傷的地點，都是在家裡。其中跌倒最常見的三個地點，就包括浴廁、臥室與客廳，跌倒當下，多是因純粹在室內走動。</p>
			<p><br/></p>
			<p>跌倒除造成外傷，也讓銀髮族因害怕再跌倒，自我限制行動，導致老化加速，也惡化原有的慢性疾病等，提早預防，不僅減少跌倒發生率，也維持長輩日常生活品質。</p>										
		</article>		
		<div class="forShare">
			<Share href="../../index.html"/>	
		</div>
		<div class="shopping"
			 v-for="(product, index) in products">
			<div class="shopCategory">
				<img :src="product.cataImg" alt="">
				<h2>{{product.catagory}}</h2>
			</div>
			<div class="shopWindow">
				<ul :style="{transform: 'translate('+ product.shopSlideIndex* -100 +'%, 0)'}"
					@touchstart="handleTouchStart(index)"
					@touchend="handleTouchEnd(index)"
					@transitionend="handleTransitionEnd"
				>
					<li v-for="item in product.productItem">
						<div class="itemImg">
							<img :src="item.itemImg"/>
							<span>{{item.itemSpec}}</span>
						</div>	
						<div class="itemTitle">
							<h3>{{item.itemName}}</h3>
							<p>{{item.itemDescrip}}</p>
						</div>
						<a class="shoppingNow" target="_blank"
						   :href="item.itemLink"
						>快來買</a>
					</li>											
				</ul>
				<div class="slideNav">
					<span class="leftArrow" 
						@click.stop="handleLeft(index)" 
						:style="{transform: 'translate('+ isSlide * -100 +'%, 0)', opacity: product.noLast}">﹤</span>
					<span class="rightArrow"
						@click.stop="handleRight(index)"
						:style="{transform: 'translate('+ isSlide * 100 +'%, 0)', opacity: product.noNext}">﹥</span>
				</div>				
			</div>
			<hr>
		</div>
	</div>
</template>

<script>
import contentContainer from '../components/ContentContainer.vue'
import Share from '../components/Share.vue'
import U009319399 from '../assets/product/U009319399.jpg'
import U009677586 from '../assets/product/U009677586.jpg'
import U009545836 from '../assets/product/U009545836.jpg'
import U009922689 from '../assets/product/U009922689.jpg'
import U008118875 from '../assets/product/U008118875.jpg'
import U009959102 from '../assets/product/U009959102.jpg'
import U006403778 from '../assets/product/U006403778.jpg'
import U003843329 from '../assets/product/U003843329.jpg'
import U004171556 from '../assets/product/U004171556.jpg'
import U006494015 from '../assets/product/U006494015.jpg'
import U004267546 from '../assets/product/U004267546.jpg'
import U010038120 from '../assets/product/U010038120.jpg'


export default {

  name: 'elderHome_demand',
  components: {
  	Share,
  },
  data () {
    return {
    	isSlide: 0,
    	forTouchStartCX: 0,
    	forTouchEndCX: 0,
    	forTouchStartCY: 0,
    	forTouchEndCY: 0,
    	products: [
    		{
    			'shopSlideIndex': 0,
    			'noLast': .3,
    			'noNext': 1,
    			'catagory': '臥室',
    			'cataImg': 'https://i.imgur.com/nhgYU4J.png',
    			'productItem': [
    				{
    					'itemName': '大字幕體脂計',
    					'itemImg': U009319399,
    					'itemDescrip': '中文字幕自動儲存功能',
    					'itemSpec': '一年保固',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_030_007',
    				},
    				{
    					'itemName': '三段式起身扶手',
    					'itemImg': U009677586,
    					'itemDescrip': '輕巧材質專為年長者設計',
    					'itemSpec': '暢銷日本',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_028_035_003',
    				},
    				{
    					'itemName': '床邊護欄',
    					'itemImg': U009545836,
    					'itemDescrip': '可高度調整協助支撐',
    					'itemSpec': '安全100%',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_027_016_004',
    				}    				    				
    			],
    		},
    		{
    			'shopSlideIndex': 0,
    			'noLast': .3,
    			'noNext': 1,    			
    			'catagory': '用餐',
    			'cataImg': 'https://i.imgur.com/nhgYU4J.png',
    			'productItem': [
    				{
    					'itemName': '成人防水圍兜',
    					'itemImg': U009922689,
    					'itemDescrip': '頸部氈黏設計穿脫輕鬆方便',
    					'itemSpec': '台灣製造',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_028_001_002',
    				},
    				{
    					'itemName': '電子鹽度計',
    					'itemImg': U008118875,
    					'itemDescrip': '監測鹽分濃度7段式顯示',
    					'itemSpec': '人氣商品',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_028_001',
    				},
    				{
    					'itemName': '餐具8件組',
    					'itemImg': U009959102,
    					'itemDescrip': '減化進食過程符合人本設計',
    					'itemSpec': '安全無毒',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_038_006',
    				}    				    				
    			],
    		},
    		{
    			'shopSlideIndex': 0,
    			'noLast': .3,
    			'noNext': 1,    			
    			'catagory': '戶外(助行)',
    			'cataImg': 'https://i.imgur.com/nhgYU4J.png',
    			'productItem': [
    				{
    					'itemName': '休閒手杖',
    					'itemImg': U006403778,
    					'itemDescrip': '單手可操作調整手杖高度',
    					'itemSpec': '暢銷日本',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_029_014',
    				},
    				{
    					'itemName': '折疊助行器',
    					'itemImg': U003843329,
    					'itemDescrip': '多段調整高度輕量好收納',
    					'itemSpec': '防滑扶手',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_029_023',
    				},
    				{
    					'itemName': '購物助步車',
    					'itemImg': U004171556,
    					'itemDescrip': '附安全警示燈行走更安全',
    					'itemSpec': '暢銷日本',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_029_013',
    				}    				    				
    			],
    		},
    		{
    			'shopSlideIndex': 0,
    			'noLast': .3,
    			'noNext': 1,    			
    			'catagory': '浴廁',
    			'cataImg': 'https://i.imgur.com/nhgYU4J.png',
    			'productItem': [
    				{
    					'itemName': 'V字型扶手',
    					'itemImg': U006494015,
    					'itemDescrip': '穩固耐用浮突設計不滑手',
    					'itemSpec': '安心扶壓',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_029_002',
    				},
    				{
    					'itemName': '防滑洗澡椅',
    					'itemImg': U004267546,
    					'itemDescrip': '椅盤可旋式可多段升降',
    					'itemSpec': '椅腳止滑',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_029_001',
    				},
    				{
    					'itemName': '浴室防滑貼片',
    					'itemImg': U010038120,
    					'itemDescrip': '專利防滑背膠好撕不留痕',
    					'itemSpec': '安全止滑',
    					'itemLink': 'http://shopping.udn.com/mall/cus/cat/Cc1c01.do?dc_cateid_0=H_008_029_012',
    				}    				    				
    			],
    		},    			    		    		
    	],
    }
  },
  methods: {
  	handleLeft(index) {
  		this.products[index].shopSlideIndex === 0 ?
  			(this.products[index].shopSlideIndex = 0):
  			(this.products[index].shopSlideIndex -- , this.isSlide = 1, this.products[index].noLast = 1)

  	},
  	handleRight(index) {
  		this.products[index].shopSlideIndex === 2 ?
  			(this.products[index].shopSlideIndex = 2):
  			(this.products[index].shopSlideIndex ++ , this.isSlide = 1, this.products[index].noNext = 1)
  	},
  	handleTouchStart(index) {
  		this.forTouchStartCX = Math.round(event.changedTouches[0].clientX)
  		this.forTouchStartCY = Math.round(event.changedTouches[0].clientY)
  	},
  	handleTouchEnd(index) {
  		this.forTouchEndCX = Math.round(event.changedTouches[0].clientX)
  		this.forTouchEndCY = Math.round(event.changedTouches[0].clientY)
  		const touchRangeY = Math.abs(this.forTouchStartCY - this.forTouchEndCY) 
  		if(touchRangeY < 20) {
  			if(this.forTouchEndCX > this.forTouchStartCX){
  				this.handleLeft(index)
  			} else if (this.forTouchEndCX < this.forTouchStartCX){
  				this.handleRight(index)
  			}	
  		}
  	},
  	handleTransitionEnd() {
  		this.isSlide = 0
  	}
  },
  updated() {
  	for(let i = 0; i < this.products.length; i++){
  		this.products[i].shopSlideIndex === 0 ?
  			this.products[i].noLast = .3 :
  			this.products[i].noLast = 1;
  		this.products[i].shopSlideIndex === 2 ?
  			this.products[i].noNext = .3 :
  			this.products[i].noNext = 1;
  	}
  }
}
</script>

<style lang="scss" scoped>
.demand{
	flex-shrink: 0;
	position: relative;
	z-index: 50;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	background-color: #fff;	
}
.demandTitle{
	margin-top: 30px;
	width: 100%;
	text-align: center;
}
.explain{
	width: 100%;
	padding: 0 15px;
}
.forShare{
	padding: 0 15px;
	margin-bottom: 10px;
}
.shopping{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 25px;
	h2{
		text-align: center;
	}
	hr{
		margin: 0 15px;
		width: auto ;
		border-color: black;
	}		
}
.shopCategory{
	margin: 0 auto;
	padding-top: 15px;
	width: 60%;
	height: 30%;
	img{
		width: 100%;
		height: 60%;
	}
}
.shopWindow{
	width: 100%;
	height: 70%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	z-index: 0;
	overflow: hidden;
	ul{
		width: 70%;
		height: 100%;
		padding: 0;
		margin: 0 auto;
		display: flex;
		// justify-content: space-around;
		align-items: center;
		transition: transform .7s ease-in-out;
		li{
			position: relative;
			flex: 1 0 auto;
			list-style: none;
			width: 100%;
			height: 100%;
			transform: translate(0, 0);
			transition: transform .7s ease-in-out;
			padding-bottom: 80px;
		}
	}
}
.itemImg{
	position: relative;
	width: 100%;
	height: 75%;
	img{
		display: block;
		height: 100%;
		width: auto;
		margin: auto;				
	}
	span{
		position: absolute;
		right: 10px;
		bottom: 0;
		background-color: rgba(235, 135, 0, 0.8);
		box-shadow: 0 0 2px 1px rgba(0,0,0,0.3);
		color: #fff;
		font-size: 18px;
		padding: 5px 10px;
	}
}
.itemTitle{
	width: 100%;
	height: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;	
	h3{
		margin: 0;
	}
	p{
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}	
}
.slideNav{
	position: absolute;
	z-index: 10;
	bottom: 70px;
	width: 100%;
	height: 20%;
	padding: 0 40px;
	transition: opacity .2s ease-in-out;
	span{
		position: absolute;
		height: 100%;
		width: 40px;
		font-size: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background-color: #fff;
		transition: transform .4s ease-in-out;
	}
	.leftArrow{
		top: 0;
		left: 0;
	}
	.rightArrow{
		top: 0;
		right: 0;
	}
}

.shoppingNow{
	position: absolute;
	bottom: 15px;
	left: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	width: 120px;
	height: 40px;
	margin-left: -60px;
	border: 1px solid rgba(black, .2);
	color: rgba(black, .2);
	&:hover{
		color: rgba(black, 1);
	}
}
@media screen and (min-width: 1024px) {
	.demandTitle{
		margin-top: 125px;
		width: 100%;
		text-align: center;	
	}
	.explain{
		margin-top: 50px;
		width: 880px;
		margin: 0 auto;
	}
	.forShare{
		width: 880px;
		margin: 20px auto;		
	}
	.shopping{
		height: 45%;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 5%;
		padding-bottom: 0;		
		flex-direction: row;
		hr{
			display: none;
		}
	}
	.shopCategory{
		// margin: 0 auto;
		padding-top: 0;
		width: 25%;
		height: 100%;
		img{
			width: 100%;
			height: 60%;
		}
		h2{
			margin: 0;
			height: 40%;
			display: flex;
			justify-content: center;
			padding-top: 10%;
		}
	}	
	.shopWindow{
		width: 60%;
		height: 100%;
		margin: 0 auto;
		margin-left: 0;
		ul{
			width: 100%;
			height: 100%;
			li{
				position: relative;
				flex: 1 0 auto;
				list-style: none;
				width: 33%;
				height: 100%;
				padding-bottom: 0;
				display: flex;
				flex-direction: column;
			}
		}
	}
	.itemImg{
		height: 60%;
	}
	.itemTitle{
		border-top: 1px solid black;
		padding: 5px;
		height: 25%;
	}
	.shoppingNow{
		position: relative;
		bottom: 0;
		left: 0;
		margin-left: auto;
		margin-right: auto;
	}	
	.slideNav{
		display: none;
	}
}
</style>