$(function(){

	//页面切换模块
	(function(){

		var aNav = $('.nav a');
		var aItem = $('.item');
		var oMain = $('.main');
		var w = $(window).width();
		var aHash = []; //存储页面hash

		$(window).resize(function(event) {
			w = $(window).width();
			aNav.each(function(index, el) {
				aItem.eq(index).css('width', w);
			});
		});


		//监听hashchange 实现前端路由
		$(window).on('hashchange load', hashChangeHandler);

		//注册resize事件防止resize时页面错乱
		$(window).on('resize', hashChangeHandler);

		//注册键盘事件 页面左右切换
		$(document).keyup(function(ev) {
			var index = aHash.indexOf(location.hash || '#/Welcome');
			switch(ev.which){
				case 37:
					if(!index) return;
					location.hash = aHash[index-1].slice(1);
					break;
				case 39:
					if(index == aHash.length-1)	return;
					location.hash = aHash[index+1].slice(1);
					break;
				default:
					break;
			}
			ev.stopPropagation();
		});


		aNav.each(function(idx, el){
			aHash.push($(el).attr('href'));
		});

		function changePage(index){
			aItem.css('overflow', 'hidden');
			$('.main').animate({ left: -w * index }, 1000, function(){
				aItem.eq(index).css('overflow', 'auto');
			});
		}

		function hashChangeHandler(){
			if(aHash.indexOf(location.hash) == -1 ) return;
			var curHash = location.hash || '#/Welcome';
			var index = aHash.indexOf(curHash);
			changePage(index);
		};

	})();

	//welcome 页面模块
	(function(){
		var arrTips = ['虽然有点Hello-World', '这是我的博客', 'FreeCodeCamp编程挑战', '这里存放代码段'];
		var oWelcome = $('.welcome'),
			oBtnWrap = $('.btns-wrap'),
			oIcon = $('.welcome .icon'),
			oInfo = $('.info'),
			aBtn = $('.btns a'),
			oTips = $('.tips');



		//首页动画效果
		oIcon.click(function(event) {

			if (oIcon.hasClass('close')) {
				
				oIcon.removeClass('close');
				oInfo.fadeOut('fast');
				oBtnWrap.animate({ paddingTop: 80 }, 300, function(){
					oBtnWrap.find('h1').animate({'fontSize': '3.75em'});
				});
			} else {
				oIcon.addClass('close');
				oBtnWrap.find('h1').animate({'fontSize': '2.5em'}, 300, function(){
					oBtnWrap.animate({ paddingTop: 0 }, function(){
						oInfo.fadeIn();
					});
				});
			}

		});

		//按钮hover交互
		aBtn.hover(function() {
			var idx = aBtn.index($(this));
			oTips.hide().html(arrTips[idx]).stop().fadeIn();			
		}, function() {
			oTips.stop().fadeOut();
		});

	})();

	//portfolio 模块
	(function(){
		var aBtn = $('.list i');
		var aUl = $('.list ol');
		var aLi = $('.list li');
		var flag = true, iHeight;

		aBtn.click(function(){
			var idx = aBtn.index($(this));
			var oUl = $(this).parent().next('ol');
			if(oUl.css('display') == 'block'){
				$(this).css('transform', 'rotateZ(0deg)');
				aUl.eq(idx).css('display', 'none');
			}else{
				$(this).css('transform', 'rotateZ(135deg)');
				aUl.eq(idx).css('display', 'block');
			}

		});

	})();





})