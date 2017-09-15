$(function(){
	//搜索框
	(function(){
		var oTxt=$('.search_input');
		var oHover = $('.search_hover');
		var timer = null;

		oTxt.hover(function(){
			oHover.css('display', 'block');
		},function(){
			//延时消失
			timer = setTimeout(function(){
				oHover.fadeOut();
			}, 2000);
			
		});

		oHover.hover(function(){
			clearTimeout(timer);
			$(this).show();
		}, function(){
			$(this).fadeOut();
		});
		
	})();

	//nav
	(function(){
		var oTri=$('#nav').find('.tri');
		var oDrop=$('#nav').find('.nav_drop');
		oDrop.hide();
		oTri.click(function(){
			var index=oTri.index(this);
			if ($(this).attr('class')=='tri') {
				oDrop.eq(index).show();
				$(this).removeClass('tri').addClass('tri_up');
			}else{
				oDrop.eq(index).hide();
				$(this).removeClass('tri_up').addClass('tri');
			}
			
		});

		$('.nav_first li').hover(function() {
			$(this).addClass('active');
		}, function() {
			$(this).removeClass('active');
		});
	})();

	//main nav
	(function(){
		$('.main_nav li').hover(function(){
			$(this).addClass('active').siblings().removeClass();
		});
		
	})();
});
