;(function($){
	var Tab = function(tab, option){
		var _this = this;

		this.tab = tab;

		//默认配置参数
		this.config = {
			"eventType": "mouseover", //选项卡触发类型 click/mouseover
			"effect": "default", //内容切换效果 defalut/fade
			"invoke": "1", //默认显示第几个选项卡 
			"auto": false //是否自动播放 false/时间间隔
		};

		//扩展配置参数 传参数和设置data-config皆可 
		//如果两者同时设置 以传参为准
		if(option && option !== null){
			$.extend(this.config, option);
		}else{
			$.extend(this.config, this.getConfig());			
		}


		//获取选项列表与内容列表
		this.tabItems = this.tab.find('.tab-nav li');
		this.conItems = this.tab.find('.con-wrap div');

		var conf = this.config;

		if(conf.eventType === 'click'){
			this.tabItems.on(conf.eventType, function(){
				_this.init($(this));
			});			
		}
		else if(conf.eventType === 'mouseover'){
			this.tabItems.on(conf.eventType, function(event){
				_this.init($(this));
				                         //tabItems上绑定的mouseover事件会冒泡到this.tab的mouseover事件上
				event.stopPropagation(); //导致内容只切换一次就停止 因此阻止冒泡

			});
		}else{
			this.tabItems.on('click', function(){
				_this.init($(this));
			});
		}

		//设置自动播放
		if(conf.auto){

			this.timer = null;
			this.loop = conf.invoke - 1;
			this.autoPlay();

		}

		//鼠标移入停止自动播放
		this.tab.hover(function(e) {
			window.clearInterval(_this.timer);
		}, function() {
			_this.autoPlay();
		});

		//显示默认内容
		if(conf.invoke > 1){
			this.init(this.tabItems.eq(conf.invoke - 1));
		}else{
			this.init(this.tabItems.eq(0));
		}
		
	};

	window.Tab = Tab;

	Tab.prototype = {
		//获取配置参数
		getConfig: function(){
			var config = this.tab.attr('data-config');

			if(config && config !== '')
				return JSON.parse(config);
			else
				return null;
		},
		//事件触发函数
		init: function(curTab){
			var idx = curTab.index();

			curTab.addClass('active').siblings().removeClass('active');

			var effect = this.config.effect;
			var conItems = this.conItems;

			if(effect === 'default'){
				conItems.eq(idx).show().siblings().hide();
			}else if(effect === 'fade'){
				conItems.eq(idx).stop().fadeIn().siblings().stop().fadeOut();
			}else{
				conItems.eq(idx).show().siblings().hide();
			}

			if(this.config.auto) this.loop = idx;

		},
		//自动播放函数
		autoPlay: function(){
			var _this = this,
				conf = this.config,
				tabItems = this.tabItems,
				tabLen = tabItems.length;

			this.timer = window.setInterval(function(){

				_this.loop++;

				if(_this.loop == tabLen){
					_this.loop = 0;
				}

				tabItems.eq(_this.loop).trigger(conf.eventType);

			}, conf.auto);

		}
	};

	$.fn.extend({
		tab: function(option){
			this.each(function() {
				new Tab($(this), option || null);
			});
			return this;
		}
	});

})(jQuery);
