/*
* @Author: zhuhw
* @Date:   2016-11-18 22:46:15
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-19 22:39:08
*/
/*侧边栏可以拖动的效果
1. touch事件
	1. start get点击的起始点
	2. move 找到move的点，就是可以直接进行拖动的距离
	3. end
*/
/*容器*/
var contentBox = document.querySelector('.content-box');
var contentBoxHeight = contentBox.offsetHeight;
/*ul*/
var lisWrap = contentBox.querySelector('.lis_wrap');
var lis = lisWrap.querySelectorAll('li');
// console.log(lis.length);
var lisWrapHeight = lisWrap.offsetHeight;


/*右侧内容的获取，进行调用触摸事件*/
/*外面容器的高度*/
var categoryMain = document.querySelector(".category_main");
//外面的固定的盒子
var cateRight = categoryMain.querySelector('.right');
// console.log(cateRight);
var cateRightHeight = cateRight.offsetHeight;
/*ul的值*/
/*获得所有右边对应内容的列表*/
var productWraps = document.querySelectorAll('.product_wrap');
// console.log(productWraps.length);
var productWrap = productWraps[0];
/*ul的高度*/
var productWrapHeight = productWrap.offsetHeight;
// console.log(productWrapHeight);

touchEvent(productWrap,productWrapHeight,cateRightHeight);



touchEvent(lisWrap,lisWrapHeight,contentBoxHeight);


/**
 * [touchEvent description]
 * @param  {[type]} lisWrap          [ul  lisWrap 移动的元素]
 * @param  {[type]} lisWrapHeight    [ul 的高度  lisWrapHeight]
 * @param  {[type]} contentBoxHeight [外面容器的高度   contentBoxHeight  ]
 * @return {[type]}                  [description]
 */
function touchEvent(lisWrap,lisWrapHeight,contentBoxHeight){
	var startY = 0,endY = 0,dY = 0,currentY=0,maxV = 100;
		/*让ul进行移动*/
	lisWrap.addEventListener('touchstart',function(e){
		// console.log(e);
		startY = e.touches[0].pageY;

		/*每次开始的时候就清除掉过渡效果*/
		this.classList.remove('transition-all');
	});

	lisWrap.addEventListener('touchmove',function(e){
		e.preventDefault();  
		endY =  e.touches[0].pageY;

		dY = endY - startY;

		/*拉的过程中最多可以拉动的范围
		1. 下拉为正，要小于一定的值可以进行拖动
		2. 上拉为负，要大于一定的值可以进行拖动
			/*当ul>div才可以这样减，否则直接是max的值
			ul  - div +maxV  -----先放下

			UL lisWrapHeight    contentBoxHeight  往上是大
			不是或是且的问题(dY+currentY)>-(lisWrapHeight-contentBoxHeight+maxV)

			dY+currentY

			可以，不用加绝对值



			1.这边出现当ul的高度小于div的时候，还是可以滑动，但是要归入0的位置
		*/

		/*if(dY+currentY<maxV&&(dY+currentY)>-(lisWrapHeight-contentBoxHeight+maxV)){
			//跟着进行移动
			this.style.webkitTransform = 'translateY('+(dY+currentY)+'px)';
			//过渡效果
			this.classList.add('transition-all');
			}
		*/

		if(dY+currentY<maxV&&(dY+currentY)>-(lisWrapHeight-contentBoxHeight+maxV)){
			//阻止滚屏
			 // e.preventDefault();  
			//跟着进行移动
			this.style.webkitTransform = 'translateY('+(dY+currentY)+'px)';
			//过渡效果
			this.classList.add('transition-all');
			}
	});

	lisWrap.addEventListener('touchend',function(){
		currentY = currentY+dY;

		/*结束的时候要移动了多少就回去多少
		直接进行执行
		*/

		/*if((currentY)>0){
			currentY= 0;
			this.classList.add('transition-all');
			this.style.webkitTransform = 'translateY('+currentY+'px)';
		}else if(currentY<-(lisWrapHeight-contentBoxHeight)){	
			// console.log('currentY'+currentY);
			// console.log(-(lisWrapHeight-contentBoxHeight));
			currenY = -(lisWrapHeight-contentBoxHeight);
			// console.log(currenY);
			this.classList.add('transition-all');
			this.style.webkitTransform = 'translateY('+currenY+'px)';
			// console.log(currenY); 就是距离的差，将多出的走到相差的距离
		}*/


		if((currentY)>0||(currentY<0&&lisWrapHeight<=contentBoxHeight)){
			currentY= 0;
			this.classList.add('transition-all');
			this.style.webkitTransform = 'translateY('+currentY+'px)';
		}else /*if(currentY<-(lisWrapHeight-contentBoxHeight)){	*/

			/*
			1. 当现在的当前的位置为负数的情况下
			   1.1 当ul的高度 小于等于 div容器的高度时
			   	   可以下弹一定的距离，但是0 0 点要归位
			   1.2  当ul的高度大于  div的容器
			   		让其可以执行的的当前位置的高度等于差距值
			*/
		    if(currentY<0&&currentY<-(lisWrapHeight-contentBoxHeight)){
				currenY = -(lisWrapHeight-contentBoxHeight);
				this.classList.add('transition-all');
				this.style.webkitTransform = 'translateY('+currenY+'px)';
		}
	});
}


/*
侧边栏点击事件

2. 增加右边的内容也跟着变化
*/
var liHeight = lis[0].offsetHeight;
var liIndex;
var dis = 0;
for(var i=0;i<lis.length;i++){
	lis[i].setAttribute('data-index', i);
	lis[i].addEventListener('click',function(){
		
		liIndex = this.dataset['index'];
		// console.log(liIndex);

		/*如果小于差值，就进行走动*/
		dis = liIndex*liHeight;
		if(dis<lisWrapHeight-contentBoxHeight){
			lisWrap.style.webkitTransform = 'translateY('+-(liIndex*liHeight)+'px)';
		}
		/*新增需求
				productWraps 获取右边的内容的列表，对应的也是下标的值

				进行点击的时候，如果有的话，进行同步右面的值

				就是设置display 显示 和 隐藏

			*/
			//排他
			//无商品相关信息的提示
			var nullInfo = document.querySelector('.null-info');
			for(var i=0;i<productWraps.length;i++){	
				// console.log(productWraps.length);
					productWraps[i].classList.remove('dis-block');	
					productWraps[i].classList.add('dis-none');

			}
			/*做一下处理：  现在是右边的数量不足*/
			if(liIndex<productWraps.length){
				// console.log(liIndex);//  超过2就没有了
				// console.log(productWraps.length);
				//设置当前可以拖动的元素
				productWrap = productWraps[liIndex];
				touchEvent(productWrap,productWrapHeight,cateRightHeight);

				productWraps[liIndex].classList.remove('dis-none');
				productWraps[liIndex].classList.add('dis-block');

				/*提示信息*/
				nullInfo.classList.remove('dis-block');
				nullInfo.classList.add('dis-none');
			}else{
				
				nullInfo.classList.remove('dis-none');
				nullInfo.classList.add('dis-block');
			}
		/*
		排他
			所有的li都进行清除active样式
			当前的设置为active样式
		 */
		for(var i=0;i<lis.length;i++){
			lis[i].classList.remove('active');
		}
		this.classList.add('active');
	});
}
