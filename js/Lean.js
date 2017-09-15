﻿var Lean = {
    
    //绑定事件
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function () {
                handler.call(element);// 解决IE下this意外绑定到window问题
            });
        } else {
            element['on' + type] = handler;
        }
    },
    //移除事件
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    //获得事件对象
    getEvent: function (ev) {
        return ev ? ev : window.event;
    },
    //获得事件目标
    getTarget: function (ev) {
        return ev.target || ev.srcElement;
    },
    //阻止事件冒泡
    stopPropagation: function (ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    //阻止默认行为
    preventDefault: function (ev) {
        if (ev.preventDefault) {
            ev.preventDefault();
        } else {
            ev.returnValue = false;
        }
    },
    //取得鼠标滚轮增量值 上正下负 120
    getWheelDelta: function(ev){
        if (event.wheelDelta)
            return event.wheelDelta;
        else
            // FF 
            return -event.detail * 40;
    },
    //获得键盘字符编码
    getCharCode: function (ev) {
        if (typeof ev.charCode == 'number') {
            return ev.charCode;
        } else {
            return ev.keyCode;//ie- + opera
        }
    },
    //获得剪贴板内容
    getClipboardText: function (ev) {
        var clipboardData = ev.clipboardData || window.clipboardData;
        return clipboardData.getData('text');
    },
    //设置剪贴板内容
    setClipboardData: function (ev, value) {
        if (ev.clipboardData) {
            return ev.clipboardData.setData('text/plain', value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData('text', value);//IE
        }
    },
    //表单序列化  
    serialize(form) {
        var parts = [],
            field = null,
            i, j,
            option,
            optValue;
        
        //遍历表单元素
        for (i = 0; i < form.elements.length; i++) {
            field = form.element[i];
            switch (field.type) {
                // select 元素
                case 'select-one':
                case 'select-multiple':
                    if (field.name.length) {
                        for (j = 0; j < field.options.length; i++){

                            option = field.options[j];
                            //循环获取被选中的选项
                            if (option.selected) {
                                optValue = '';
                                if (option.hasAttribute) {
                                    optValue = option.hasAttribute['value'] ?
                                               option.value : option.text;
                                } else {
                                    // IE 
                                    optValue = option.attributes['value'].specified ?
                                               option.value : option.text;
                                }
                                parts.push(encodeURIComponent(field.name) + '=' +
                                           encodeURIComponent(optValue));
                            }
                        }
                    }
                    break;
                case undefined:
                case 'file':
                case 'submit':
                case 'reset':
                case 'button':
                    break;
                case 'radio':
                case 'checkbox':
                    // 仅获取勾选的内容
                    if (!field.checked) break;
                default:
                    if (field.name.length) {
                        parts.push(encodeURIComponent(field.name) + '=' +
                                   encodeURIComponent(field.value));
                    }
            }

        }

        return parts.join('&');
    },
    //获取指定范围内随机数字
    getRandomNumber: function(min, max) {
        return (Math.random() * (max - min + 1) + min) << 0;
    },
    //获取随机颜色
    getRandomColor: function () {
        var r = Math.random() * 0x1000000 << 0;
        while(s == this.lastColor) 
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    },
    //获取行间样式
    getStyle: function(element, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    },
    //类名选择器
    getByClass: function(oParent, sClass) {
        var aLi = oParent.getElementsByTagName('*');
        var reClass = new RegExp("(^| )" + sClass + "( |$)");
        var res = [];
        for (var i = 0; i < aLi.length; i++) {
            reClass.test(aLi[i].className) && res.push(aLi[i]);
        }
        return res;
    },
    //css样式设置
    css: function (attr, value) {
        if (arguments.length == 2) {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style[attr] = value;
            }
        } else {
            if (typeof attr == 'string') {
                return getStyle(this.elements[0], attr);
            } else {
                //json
                for (i = 0; i < this.elements.length; i++) {
                    for (var k in attr) {
                        this.elements[i].style[k] = attr[k];
                    }
                }
            }      
        }
    },
    //documen.hidden属性
    getHiddenProp: function(){
        var prefixes = ['webkit','moz','ms','o'];

        if ('hidden' in document) return 'hidden';

        for (var i = 0; i < prefixes.length; i++){
            if ((prefixes[i] + 'Hidden') in document) 
                return prefixes[i] + 'Hidden';
        }
        return null;
    },
    //document.visibilityState属性
    getVisibilityState: function () {
        var prefixes = ['webkit', 'moz', 'ms', 'o'];
        if ('visibilityState' in document) return 'visibilityState';

        for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'VisibilityState') in document)
                return prefixes[i] + 'VisibilityState';
        }

        return null;
    },
    //深拷贝
    deepCopy: function(p, o){
        var o = o || {};
        for(var i in p){
            if(typeof p[i] === 'object'){
                o[i] = (p[i].constructor === Array) ? [] : {};
                deepCopy(p[i], o[i]);
            }else{
                o[i] = p[i];
            }
        }
        return o;
    }
};