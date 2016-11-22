/*
* @Author: zhuhw
* @Date:   2016-11-18 22:46:15
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-22 21:02:09
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


/*document.body.ontouchmove=function(e){
	// alert(1);
    e.preventDefault();
}
*/
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
  // 阻止触摸事件的默认行为，即阻止滚屏
    // event.preventDefault();
		endY =  e.touches[0].pageY;

		dY = endY - startY;

		if(dY+currentY<maxV&&(dY+currentY)>-(lisWrapHeight-contentBoxHeight+maxV)){
			//阻止滚屏
			 e.preventDefault();  
			   // e.stopPropagation();
    //停止冒泡
			//跟着进行移动
			this.style.webkitTransform = 'translateY('+(dY+currentY)+'px)';
			//过渡效果
			this.classList.add('transition-all');
			}
	});

	lisWrap.addEventListener('touchend',function(){
		currentY = currentY+dY;

		if((currentY)>0||(currentY<0&&lisWrapHeight<=contentBoxHeight)){
			currentY= 0;
			this.classList.add('transition-all');
			this.style.webkitTransform = 'translateY('+currentY+'px)';
		}else if(currentY<0&&currentY<-(lisWrapHeight-contentBoxHeight)){
				currenY = -(lisWrapHeight-contentBoxHeight);
				this.classList.add('transition-all');
				this.style.webkitTransform = 'translateY('+currenY+'px)';
		}
	});
}


/*
侧边栏点击事件
*/
var liHeight = lis[0].offsetHeight;
var liIndex;
var dis = 0;
for(var i=0;i<lis.length;i++){
	lis[i].setAttribute('data-index', i);
	lis[i].addEventListener('click',function(){
		
		liIndex = this.dataset['index'];
		
		dis = liIndex*liHeight;
		if(dis<lisWrapHeight-contentBoxHeight){
			lisWrap.style.webkitTransform = 'translateY('+-(liIndex*liHeight)+'px)';
		}
			//无商品相关信息的提示
			var nullInfo = document.querySelector('.null-info');
			for(var i=0;i<productWraps.length;i++){	
				
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
		/*当前的tab添加样式*/
		for(var i=0;i<lis.length;i++){
			lis[i].classList.remove('active');
		}
		this.classList.add('active');
	});
}
