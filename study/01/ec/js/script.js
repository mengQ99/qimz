$(function(){

	//搜索切换模块
	(function(){

		var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var index=0;
		var oText=$('#search').find('.text');
		oText.val(arrText[0]);

		$('.menu li').click(function(){
			index=$('.menu li').index(this);
			$(this).attr('class','active').siblings().attr('class', 'gradient')
			.parents('.bar').next().find('.text').val(arrText[index]);
		});

		oText.focus(function(){
			if ($(this).val()==arrText[index]) {
				$(this).val('');
			}
		});
		oText.blur(function() {
			if($(this).val()==''){
				$(this).val(arrText[index]);
			}
		});
	})();

	//update 模块
	(function(){
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'豆豆', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'短短', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
			{ 'name':'段段', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'扣扣', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'欢欢', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'丽丽', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
		];

		var oUl=$('.update ul');
		var str='';
		var timer=null;

		for(var i=0;i<arrData.length;i++){
			str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong> <span>'+arrData[i].time+'分钟前</span> 写了一篇新文章：'+arrData[i].title+'</a></li>';
		}
		oUl.html(str);

		var oLi=$('.update li');
		var iHeight=oLi.height();

		$('#downBtn').click(function() {
			downMove();
		});
		$('#upBtn').click(function(){
			upMove();
		});
		function downMove(){
			if(oUl.position().top==0){
				oUl.stop(true,true).animate({'top':-iHeight*(oLi.length-1)}, 500)
			}else{
				oUl.stop(true,true).animate({'top':'-='+-iHeight}, 500);
			}			
		}
		function upMove(){
			if(oUl.position().top==-iHeight*(oLi.length-1)){
				oUl.stop(true,true).animate({'top':0}, 500);
			}else{
				oUl.stop(true,true).animate({'top':'+='+-iHeight}, 500);
			}
		}
		function autoPlay(){
			timer= setInterval(function(){
				upMove();
			}, 3000);
		}
		oUl.hover(function() {
			clearInterval(timer);
		}, autoPlay);
		autoPlay();
	})();

	//tab选项卡
	(function(){
		
		fnTab($('.tabNav1'),$('.tabCon1'),'click');
		fnTab($('.tabNav2'),$('.tabCon2'),'click');
		fnTab($('.tabNav3'),$('.tabCon3'),'mouseover');
		fnTab($('.tabNav4'),$('.tabCon4'),'mouseover');
		function fnTab(oNav, aCon, sEvent ){
			var aEle=oNav.children();
			aCon.hide().eq(0).show();
			aEle.on(sEvent, function(){
				var index=aEle.index(this);
				aEle.removeClass('active').addClass('gradient')
				.find('i').removeClass('tri_down_red').addClass('tri_down_grey');

				$(this).removeClass('gradient').addClass('active')
				.find('i').removeClass('tri_down_grey').addClass('tri_down_red');

				aCon.hide().eq(index).show();
			});
		}
	})();

	//焦点图
	(function(){
		var aSmall=$('#fade').next().children();
		var index=0;
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];

		$('#fade').find('img').eq(0).css('zIndex',2);
		aSmall.click(function () {
			index=aSmall.index(this);
			$(this).addClass('active').siblings().removeClass('active');
			$('#fade').find('img').fadeOut().css('zIndex',1)
			.eq(index).fadeIn().css('zIndex',2);
			$('#fade').next().next().html(arr[index]);
		});
	})();

	//日历
	(function(){
		var aImg=$('.calendar .img');
		var oTip=$('.today_info');
		var oStrong=oTip.find('strong');
		var oPass=oTip.find('p');
		var oImg=oTip.find('img');
		var aSpan=$('.calendar h3 span');
		aImg.hover(function() {
			var iTop=$(this).parent().position().top-30;
			var iLeft=$(this).parent().position().left+55;
			var index = $(this).parent().index() % aSpan.length;

			oTip.show().css({'top': iTop,'left': iLeft});
			oStrong.text(aSpan.eq(index).text());
			oImg.attr('src', $(this).attr('src'));
			oPass.text($(this).attr('info'));

		}, function() {
			oTip.hide();
		});
	})();

	//bbs
	(function(){
		$('.items li').hover(function() {
			$(this).addClass('active').siblings().removeClass('active')
		});
	})();

	
});