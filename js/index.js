/*
* @Author: zhuhw
* @Date:   2016-11-17 09:30:33
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-17 21:03:34
*/

/*
jd_header
滚动的高度进行来计算透明度
1.计算规则
	实时滚动的高度/目标的高度 = 变化的透明度/1(到不透明状态)
	*/
	var jdHeader = document.querySelector(".jd_header");
	/*监听window的scroll事件*/
	window.addEventListener("scroll", function(){
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	// console.log(scrollT);
	// /*如果大于600的时候，进行设置不透明*/
	if(scrollT>472){
		jdHeader.style.background = 'rgba(209,56,68,1)';
	}else{
		jdHeader.style.background = 'rgba(209,56,68,'+(scrollT/472)+')';
	}
});


/*

京东快报的轮播
news_list
1. 创建一个假的节点，添加到ul后面
2. 使用定时器进行控制自动上移的步骤
	2.1 设置定时器，
	2.2 在css设置过渡的事件(为了平滑的过渡效果)
	2.3 线判断有没有这个过渡类，没有的话进行添加过渡类；
		设置一个index变量，让变量++；
		ul的高度进行index*一个li的高度(上移)
			-  translateY  进行上移/ 用top应该也可以的吧？？？
3. 当到达index>li.length-1的时候，进行将其index设置成0
	并且将过渡效果进行去掉（这一步可以不做吧？？？）
	*/

	var newsList = document.querySelector(".news_list");
	var lisList = newsList.querySelectorAll("li");
	/*控制走的步骤*/
	var index = 0;

/*
创建一个假的节点
ok  添加上去了
*/
var cloN = lisList[0].cloneNode(true);
newsList.appendChild(cloN);

var lisLen = lisList.length;
//console.log(lisLen);//3
var liH = lisList[0].offsetHeight;
// console.log(liH);//30
var newsTimer = setInterval(function(){
	index++;
	/*先判断有没有过渡类
		是ul在走

		注意 h5中添加类的方法.....
		*/
		if(!newsList.classList.contains('transition-all')){
			newsList.classList.add('transition-all');
		}
		/*webkitTransform */

		newsList.style.webkitTransform = 'translateY('+(-index*liH)+'px)';

	},1000);
/*
是在定时器后面的执行
监听过渡事件走完
*/
newsList.addEventListener("transitionend",function(){
	// console.log(1);
	//当跑到最后一张，进行设置成0
	//就是index值index=lisLen-1  是3-1=2   实际的就是到0 1 2 就是到实际的最后一张
	if(index>lisLen-1){
		if(newsList.classList.contains('transition-all')){
			newsList.classList.remove('transition-all');
		}
		
		newsList.style.webkitTransform  = 'translateY(0px)';
		index = 0;
	}
});



/*
京东轮播
1. 分为left center  right三块区域
2. left=li.length-1  center=0  right =1
*/
var jdFocus = document.querySelector('.jd_focus');
var focusWrap = jdFocus.querySelector(".focus_wrap");
var lisFocus = focusWrap.querySelectorAll("li")
// console.log(lisFocus.length);//3
/*下面的小圆点的个数*/
var focusP = jdFocus.querySelector(".focus_points");
// console.log(focusP);
/*生成小圆点*/
for(var i=0;i<lisFocus.length;i++){
	var li = document.createElement('li');
	// console.log(li);
	if(i==0){
		li.classList.add('active');
	}
	focusP.appendChild(li);
}
var focusPList = focusP.querySelectorAll('li');

focusWrap.style.height = lisFocus[0].offsetHeight+'px';
// var lisW = lisFocus[0].offsetWidth;
var screenWidth = document.documentElement.offsetWidth;
// console.log(lisW);414

//布局排放的位置是左中右 为下面变化的下标值
var left = lisFocus.length-1;
var center = 0;
var right = 1;

/*
初始化
*/
/*移动的是一个li的宽度*/
lisFocus[center].style.webkitTransform = 'translateX(0px)';//0 414 -414
lisFocus[left].style.webkitTransform  = 'translateX('+(-screenWidth)+'px)';


lisFocus[right].style.webkitTransform = 'translateX('+(screenWidth)+'px)';



/*
设置定时器进行控制图片的移动
*/

/*走到下一张的图片函数*/
function nexShow(){
	/*
	先设置一个初始值
	设置的l c r与图片进行相关联用的
	下标值都向左移，最右边的++
	*/
	left = center;
	center = right;
	right ++ ;
	// t  = right++;
	// console.log(t);  1  2  0

	// 极值判断
	if(right > lisFocus.length - 1){
		right = 0;
	}

	/*给加变换类
		谁需要加变化的样式
		left  xuyao？？？
		center过去左边一下要加
		right去中间一下应该加 不加吧   位置不变，就是在隐形的变化图片
		*/
	// console.log(left);//0
	// console.log(center);//1
	// console.log(right);//2   

	lisFocus[left].classList.add('transition-all');
	lisFocus[center].classList.add('transition-all');
	lisFocus[right].classList.remove('transition-all');

	/*这边是图片移动的位置*/
	/*移动的是一个li的宽度*/
	lisFocus[center].style.webkitTransform = 'translateX(0px)';
	/*进行移动x轴的位置*/
	lisFocus[left].style.webkitTransform  = 'translateX('+(-screenWidth)+'px)';


	lisFocus[right].style.webkitTransform = 'translateX('+(screenWidth)+'px)';

	/*这是绑定下面的焦点的*/
	getFous(center);
}
/*走到上一张的图片函数*/

function prevShow(){
	/*
图片向右走的位置的循环

*/

right = center;
center = left;
left--;



	// 极值判断
	// 注意：  这边是走的是左边的值
	if(left < 0){
		left = lisFocus.length - 1;
	}

	/*
	替补的那个进行移除样式
	*/

	lisFocus[left].classList.remove('transition-all');
	lisFocus[center].classList.add('transition-all');
	lisFocus[right].classList.add('transition-all');

	/*这边是图片移动的位置*/
	/*移动的是一个li的宽度*/
	lisFocus[center].style.webkitTransform = 'translateX(0px)';
	/*进行移动x轴的位置*/
	lisFocus[left].style.webkitTransform  = 'translateX('+(-screenWidth)+'px)';


	lisFocus[right].style.webkitTransform = 'translateX('+(screenWidth)+'px)';

	/*这是绑定下面的焦点的*/
	getFous(center);
}


var focusTimer = setInterval(function(){
	nexShow();
},1000);

/*进行将下标和li进行绑定*
这是获取焦点的
*/
function getFous(center){
	for(var i=0;i<focusPList.length;i++){
		focusPList[i].classList.remove('active');
	}
	focusPList[center].classList.add('active');
}



/*
手动滑动
ontouchstart  ontouchmove  ontouchend
1. 事件开始的时候，进行获取开始的位置
	1. 和时间戳
2. 事件move的时候，进行获取位置，
	和start的位置进行相减就是dx
3. 结束的时候
	1.如果已经过了三分之一，就进行下一张
	2. 如果过了-的三分之一，进行上一张
	*/



//1
jdFocus.addEventListener('touchstart', touchstartHandler);
jdFocus.addEventListener('touchmove', touchmoveHandler);
jdFocus.addEventListener('touchend', touchendHandler);
/*触摸开始*/

/*结束距离-开始距离 = 触摸移动的距离*/
var dx = 0;
var startX = 0;
var moveX =0;
var startTime = 0;
var endTime = 0;
function touchstartHandler(e){
	// console.log(e);
	// 获取touch开始的位置
	startX = e.touches[0].pageX;
	// console.log(startX);
	//给个时间戳，后面加入用的到？？？
	startTime = new Date();

	/*开始滑动的时候就清除定时器，不让其继续走*/
	clearInterval(focusTimer);

	/*
	为什么清除这个过渡效果？？？
	手动的时候不需要过渡效果....
	*/

	lisFocus[left].classList.remove('transition-all');
	lisFocus[center].classList.remove('transition-all');
	lisFocus[right].classList.remove('transition-all');
}

/*触摸移动中*/
function touchmoveHandler(e){
	// console.log(e);
	moveX = e.touches[0].pageX;
	// console.log(moveX);
	dx = moveX - startX;

	// console.log('touchmoveHandler'+dx);
	/*
	右滑动是正值
	左滑动是负值
	*/
	// console.log(dx);

	// /*
	// 给个时间戳
	// */
	// endTime = new Date();
	

	/*
	得到这个滑动的距离之后，进行重新计算三个li的位置
	并且去掉过渡
	*/

	
	/*移动的是一个li的宽度
	重新计算li的位置

	要start的时候就先清除过渡的效果
	*/
	lisFocus[center].style.webkitTransform = 'translateX('+(0+dx)+'px)';//0 414 -414
	lisFocus[left].style.webkitTransform  = 'translateX('+(-screenWidth+dx)+'px)';
	lisFocus[right].style.webkitTransform = 'translateX('+(screenWidth+dx)+'px)';
	
}
/*触摸结束*/
function touchendHandler(e){
	// console.log(e);
	// 触摸结束的时候，进行走到shang一张，dx为整数的时候
	//
	/*
	
	补充：
	1. 手滑动负数小于屏幕的三分之一  或者
	2. 开始滑动的时间小于500ms并且距离大于30px时，进行判定成功，到下一张图片去
	3. 
	*/
	var t = new Date() - startTime;
	// console.log(t);
	// console.log(dx);//这边是记录之前的dx，要重新计算现在的dx获得的值
	// console.log(e);
	
	dx = e.changedTouches[0].pageX - startX;
	// console.log('touchendHandler'+dx);// 0

	// console.log(t);
	if(dx<-screenWidth*(1/3) || (t<500&&dx<-30)){
		// 去下一张
		nexShow();
	}else if(dx>screenWidth*(1/3)||(t<500&&dx>30)){
		/*
		手机右滑动大于三分之一的时候
		执行到上一张，
		进行封装上一张的函数
		*/
		/*
		走到上一张的图片
		得到进行封装上一张
		*/
		prevShow();
		
	}else{
		//否则的事件不成功进行恢复原位
		/*
		添加过渡
		*/
		// console.log(111);
	
		lisFocus[left].classList.add('transition-all');
		lisFocus[center].classList.add('transition-all');
		lisFocus[right].classList.add('transition-all');

		
		/*console.log(left);
		console.log(center);
		console.log(right);*/

		lisFocus[center].style.webkitTransform = 'translateX('+0+'px)';//0 414 -414
		lisFocus[left].style.webkitTransform  = 'translateX('+(-screenWidth)+'px)';
		lisFocus[right].style.webkitTransform = 'translateX('+(screenWidth)+'px)';

	}

	/*focusTimer = setInterval(function(){
		nexShow();
	},1000);*/


}


/*
先写倒计时的
1. 获得当前的时间和未来的时间，得到差距的时间戳
2. 将总的时间戳进行将毫秒转换成秒  除以1000 t
3. 将总的毫秒进行算出 时分秒
	3.1   时   t = 60秒*60分*24小时 = 86400  ===  t%86400=得到的剩余的秒 /3600 = h 
	3.2   分钟 
	3.3

	1. var t = Math.floor((newT-nowT)/1000) 得到的秒
		1. 时：t%86400/3600
		2. 分：t%86400%3600/60
		3. 秒杀:t%60
*/
var clockWrap = document.querySelector('.clock_wrap');
var spansClock = clockWrap.querySelectorAll('span');
// console.log(spansClock);//8 个

var nowT = new Date();
var futureT = new Date('Nov 17 2016 21:04:40');
// console.log(+futureT);
// 将毫秒转换成s
var t = Math.floor((futureT - nowT)/1000);
// console.log(t);
/*
将时间进行转换
设置定时器
*/
var h = 0;
var m = 0;
var s = 0;

/*调用一次，得到时分秒(全局的)
进行初始化设置,初始化的时候要先进行判断t大于0
*/

if(t>0){
	h = Math.floor(t%86400/3600);
 	m = Math.floor(t%86400%3600/60);
 	s = Math.floor(t%60);
 // console.log(h+'..'+m+'..'+s);
	/*
	进行将值设置给对应的span显示的内容
	是在定时器中进行变换的
	*/
	spansClock[0].innerHTML = Math.floor(h/10);
	spansClock[1].innerHTML = Math.floor(h%10);

	spansClock[3].innerHTML = Math.floor(m/10);
	spansClock[4].innerHTML = Math.floor(m%10);

	spansClock[6].innerHTML = Math.floor(s/10);
	spansClock[7].innerHTML = Math.floor(s%10);
}



var clockTimer = setInterval(function(){
	
	/*如果等于0的时候，进行清除定时器*/
	
	t--;
	if(t<0){
		clearInterval(clockTimer);
		return false;
	}
	h = Math.floor(t%86400/3600);
 	m = Math.floor(t%86400%3600/60);
 	s = Math.floor(t%60);
 // console.log(h+'..'+m+'..'+s);

	/*
	进行将值设置给对应的span显示的内容
	是在定时器中进行变换的
	*/
	spansClock[0].innerHTML = Math.floor(h/10);
	spansClock[1].innerHTML = Math.floor(h%10);

	spansClock[3].innerHTML = Math.floor(m/10);
	spansClock[4].innerHTML = Math.floor(m%10);

	spansClock[6].innerHTML = Math.floor(s/10);
	spansClock[7].innerHTML = Math.floor(s%10);

}, 1000);
/*
进行将时间进行封装
*/


