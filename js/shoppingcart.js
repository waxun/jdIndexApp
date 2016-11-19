/*
* @Author: zhuhw
* @Date:   2016-11-18 19:59:11
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-18 22:33:31
*/

/*
点击按钮：
	1. 点击哪一个进行切换哪一个,给外面的盒子
		切换.jd_icons_checkd
	2. 点击全选按钮，就是将下面的子元素进行全选
	3. 反之继续
	*/
//外面的包括对号和复选框的按钮外层
var checkboxWrap  = document.querySelectorAll('.checkbox_wrap ');
toggleCheckbox();
/**
 * [toggleCheckbox description] 对背景图进行控制选中与否的位置的变换
 * @return {[type]} [description] 因为input可以进行
 */
function toggleCheckbox(){
	for(var i=0;i<checkboxWrap.length;i++){
	checkboxWrap[i].addEventListener('click',function(){
		// alert(1);
		this.classList.toggle('jd_icons_checkd');
	});
	}	
}
/*全选按钮check_all ,下面的子按钮都进行选中或不选中*/
var checkAll = document.querySelector('.check_all '); 
var checkAllInput = checkAll.querySelector('input');
// console.log(checkAllInput);

var cartMainB = document.querySelector('.cart_main_b');
var checkboxWrap  = cartMainB.querySelectorAll('.checkbox_wrap ');
// console.log(checkboxWrap.length);//2
// 获取cart_main_b里的子按钮
var inputList = cartMainB.querySelectorAll('input[type="checkbox"]');
// console.log(inputList);

/*控制全选按钮*/
allChecked();
/**
 * [allChecked description] 全选/反选
 * @return {[type]} [description] 对应的图片和input选中与否
 */
function allChecked(){
	checkAll.addEventListener('click',function(){
	if(checkAll.classList.contains('jd_icons_checkd')){
		for(var i=0;i<checkboxWrap.length;i++){
			//jd_icons_checkd  
			checkboxWrap[i].classList.add('jd_icons_checkd');
			inputList[i].checked = true;
		}
	}else{
		for(var i=0;i<checkboxWrap.length;i++){
			checkboxWrap[i].classList.remove('jd_icons_checkd');
			inputList[i].checked = false;
		}
	}
});
}

/*下面的子按钮都选中的时候，进行全选才进行选中*/
singleChecked();
/**
 * [singleChecked description] 单选按钮控制全选
 * @return {[type]} [description] 直接进行设置图片的位置和对应的index的选中与否
 */
function singleChecked(){
	
	for(var i=0;i<inputList.length;i++){
		var inputlist = inputList[i];
		inputlist.addEventListener('click',function(){
			var flag = true;
			/*去判断所有的按钮有没有被选中*/
			for(var i=0;i<inputList.length;i++){
				/*只要有为没选中的，flag就是false*/
				if(inputList[i].checked==false){
						flag = false;
				}
			}
			
			if(flag ==true){
				checkAll.classList.add('jd_icons_checkd');
				checkAllInput.checked = true;
			}else{
				checkAll.classList.remove('jd_icons_checkd');
				checkAllInput.checked = false;
			}
		});	
	}
}

/*
1.点击del，弹出遮罩层
2.加个缓动效果
*/
var dels = document.querySelectorAll('.del');
var popSrceen = document.querySelector('.pop_srceen');
var popInfo = document.querySelector('.pop_info');
var delT = 0;
// console.log(del_ts.length);
for(var i=0;i<dels.length;i++){
	dels[i].addEventListener('click',function(){
		popSrceen.style.display = 'block';
		/*位置不对，因为my__center中有transform，要在动画里进行也写进去*/
		popInfo.classList.add('mybounceInDown');

		delT = this.querySelector('.del_t');
		/*还会控制垃圾桶盖del_t*/
		delT.style.webkitTransform = 'rotate(-30deg) translateX(-2px) translateY(2px)';
	});
}



/*点击弹出框中的取消，弹出框进行隐藏*/
var exit = popSrceen.querySelector('.exit');
// console.log(exit);

exit.addEventListener('click',function(){
	/*pop_srceen 隐藏*/
	this.parentNode.parentNode.parentNode.style.display = 'none';

	// pop_info 移除 mybounceInDown
	this.parentNode.parentNode.classList.remove('mybounceInDown');
	/*还会控制垃圾桶盖del_t 恢复原位*/
	delT.style.webkitTransform = '';
});



