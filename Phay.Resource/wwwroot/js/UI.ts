import {zonic as helper} from './Zonic.base'
import {zonic as emitter} from './Emitter'
import {zonic as zui} from './Component'


export module ui {
    export class ui extends zui.Component {
        constructor(exp?, context?) {
            super();
            this.selected = [];
            if (/^create:/i.test(exp)) {
                this.select(zui.Component.parseHtml(exp.substr(7)));
            } else {
                this.select(exp, context);
            }
        }
        render(dom?):any { 
            if(dom){
                this.appendTo(zui.Component.select(dom));
            }
            return this; 
        }
        extends(...args){
            if(args.length>1){
            var me=this;
            args.forEach(function(d){
                me.extends(d);
            });
        }else{
            var d=args[0];
            for(var i in d){
                this[i]=d[i];
            }
            }
        }
        initialize(conf?) { return this; }
        static landingline(config) {
            if (typeof config === "function") { config = { callback: config }; }
            if (!config) { config = {}; }
            if (config instanceof String) { config = { parent: config }; }
            config.time = config.time || 3;
            config.width = config.width || 5;
            config.background = config.backround || "#886ed7";
            config.height = config.height || 1;
            config.delay = config.delay || 0;
            var thtmlStyle = " <style>@-webkit-keyframes landingline_animate { 0% { margin-left: 0;} 5% { margin-left: 4%;} 50% { margin-left:" + (50 - config.width) + "%;}100% { margin-left: " + (100 - config.width) + "%;}} @keyframes landingline_animate { 0% { margin-left: 0;}5% { margin-left: 4%;} 50% { margin-left:" + (50 - config.width) + "%;}100% { margin-left: " + (100 - config.width) + "%;}}</style>";
            var thtml = "<div style='height: " + config.height + "px; width: " + config.width + "%; margin: 0px;, float: left; background-color: " + config.background + "; animation: landingline_animate " + config.time + "s infinite; -webkit-animation: landingline_animate " + config.time + "s infinite animation-delay:" + config.delay + "s; -webkit-animation-delay: " + config.delay + "s: " + (config.csstext || ";") + "\'></div>"
            var t = zui.Component.select(zui.Component.parseHtml("<div style='height:1px;'></div>"));
            t.append(zui.Component.parseHtml(thtmlStyle)); t.append(zui.Component.parseHtml(thtml));
            t["isappended"] = false;
            config.callback ? config.callback.call(t, config.parent) : null;
            if (config.parent && !t["isappended"]) {
                t.appendTo(config.parent);
            }
            return t;
        }
        static effacee = function (conf) {
            if (!conf) { conf = {}; }
            var u = new ui("create:span")
            u.css({ "height": "100%", "width": "100%", "z-index": "1", "position": "absolute", "top": "0px", "left": "0px", "overflow": "hidden", "pointer-events": "none" })
                .addClass("zonic-effacee");
            u["cascade"] = function (ob) {
                ob = ob instanceof ui || ob instanceof zui.Component ? ob : new zui.Component(ob);
                u.find("div").remove();
                u.appendTo(ob);
                ob.bind("mousedown", function () {
                    var el = zui.Component.select(this),
                        height = el.Rectangle().height;
                    var w = el.Rectangle().width;
                    el.append(new zui.Component(zui.Component.parseHtml("div")).css({ "position": "absolute", "top": -w + "px", "left": "-2.26525px", "height": (w * 3) + "px", "width": (w * 3) + "px" || "100%", "border-radius": "100%", "background-color": conf.background || "rgba(0, 0, 0, 0.870588)", "opacity": "1", "transform": "scale(0)", "transition": "all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms" })
                        .bind(whichTransitionEvent, function () {
                            zui.Component.select(this).remove();
                        }));
                    setTimeout(function () {
                        el.find("div").css({ opacity: 0, "transform": "scale(1)" });
                    }, 0);

                });
            }
            if (conf.cascade) {
                u["cascade"](conf.cascade);
            }
            return u;
        }
    }
    export class Layer extends ui {
        constructor(conf?) {
            super();
            this.selected = [zui.Component.parseHtml("div")];
        }
        zindex=10;
        initialize(conf?) {
            conf = conf || {};
            var me = this;
            this.zindex=conf.zindex||10;
            this.style({ top: "0px", left: "0px", opacity: "0",  position: conf.position || "absolute;", "z-index": this.zindex, width: conf.width || "40%"
            , height: conf.height || "300px" }).addClass(conf.mode == "hover" ? "zonic-section-layer-hover" : (conf.mode == "mask" ? "zonic-section-mask" : "zonic-section-layer"));
            if(conf.mode=="mask"){
                this.style({left:"0px",right:"0px",top:"0px",bottom:"0px",width:window.screen.availWidth+"px",height:window.screen.height+"px",opacity:0.4,position:"fixed"});
            }
            if("D3" in conf){
                this.attr("layer-box-3D","D3");
            }
            if (conf.center) {
                window.setTimeout(function () {
                    var r = me.Rectangle(), width = r.width, height = r.height;
                    me.style({
                        opacity:conf.mode=="mask"?0.45: 1,
                        top: ((conf.top || window.screen.availHeight / 2) - height/1.8) + "px", left: ((conf.left || window.screen.availWidth / 2) - width / 2) + "px"
                    });
                }, 0);
            }
            else { window.setTimeout(function () { me.style({ opacity: conf.mode=="mask"?0.45: 1 }); }, 0); }
            if (!helper.hasProp(conf, "dragable") || conf.dragable) zui.Component.drag(this, this, 0.3);
            return this;
        }
        layout(css) {
            return this.style(css);
        }
        render(dom){
           this.appendTo(dom||zui.Component.select("body"));
           return this;
        }
    }
    export interface ITemplate{
        render();
        bind(item);
        parse(exp);
    }
    export class Template implements ITemplate{
        items:[any];
        expressionComponent:any;
        private itemExpressionFunc:any;
        private templateString:string;
        render(){

        }
        bind(item){

        }
        //{path="",expression}
        Expression(itemFunc,exp){
            exp=exp.trim('{').trim('}');
            //path="" expression=""
        }
        private attrs(ele:Element){
            var attrs=[];
            for(var i=0;i<ele.attributes.length;i++){
                var item=ele.attributes.item(i);
                var prop={name:item.nodeName||item.name||item.localName, type:"attribute",func:null,field:""}
                if(/^\{\}$/.test(item.nodeValue)){
                   this.Expression(prop,item.nodeValue);
                }
            }
            return attrs;
        }
        private parseCore(){
            //this.expressionComponent.forEach(element => {
                //zui.Component.select(element).
            //});
        }
        parse(exp){
            if(exp instanceof zui.Component){
                this.templateString=exp.outHtml();
                this.expressionComponent=exp;
            }else if(typeof exp ==="string"){
                this.templateString=exp;
                this.expressionComponent=new zui.Component(exp);
            }else if(exp instanceof Element){
                this.expressionComponent=new zui.Component(exp);
                this.templateString=this.expressionComponent.outHtml();
            }
            
            return this;
        }
    }
    export class List extends ui {
        constructor() {
            super();
            this.selected = [zui.Component.parseHtml("ul")];
            this.addClass("zonic-list");
            emitter.Emitter.mixin(this);
        }
        public multi = false;
        additem(data) {
            var me = this;
            if (helper.isArray(data)) { data.forEach(function (i) { me.additem(i); }); return me; }
            return (function () {
                var d = data;
                var item = new ui(zui.Component.parseHtml("li"));
                item["uiParent"] = this;
                item.on("click", function (e) {
                    if (item.attr("disabled")) { return; }
                    if (!me.multi) {
                        me.find(".zonic-list-item[selected='true']").attr({ "selected": "false" });
                    }
                    if (item.attr("selected") == "true") {
                        item.attr({ "selected": "false" });
                    } else {
                        item.attr({ "selected": "true" });
                    }
                    me.emit("selectchanged", e, data, item);
                }).bind("mouseenter", function (e) {
                    me.emit("hoveritem", e, data, item);
                }).addClass("zonic-list-item").attr({ "selected": "false", }).appendTo(me).if(typeof data !== "object", function () {
                        return item.html(data);
                    }).if(data.text || data.html, function () {
                        return item.html(data.text || data.html);
                    }).if(data.value, function () {
                        return item.attr("value",data.value);
                    }).css(me.itemCss || {});
                return item;
            })();
        }
        binddata(conf, data) {
            if (arguments.length = 1) {
                data = conf.data;
                conf = conf.conf;
            }
            return this;
        }
        initialize(conf?) {
            if (conf) {
                this.itemCss = conf.itemCss || {};
                this.dragable = helper.hasProp(conf, "dragable") ? conf.dragable : false;
            }
            return this;
        }
        render(dom){
            if(dom){
                this.appendTo(zui.Component.select(dom));
            }
        }
        itemCss = null;
        dragable = false;
    }
    var whichTransitionEvent =
        (function () {
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd',
                'MsTransition': 'msTransitionEnd'
            }
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        })();
    var whichAdnimationEvent =
        (function () {
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'animation': 'animationend',
                'OAnimation': 'oAnimationEnd',
                'MozAnimation': 'animationend',
                'WebkitAnimation': 'webkitAnimationEnd',
                'MsAnimation': 'msAnimationEnd'
            }
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        })();
    export class Text extends ui {
        constructor() {
            super();
            this.selected = [zui.Component.parseHtml("div")];
        }
        label: any;
        height: number;
        width: number;
        placeholder: any;
        type = "text";
        hint: any;
        hintColor: any;
        labelColor: any;
        _value: any;
        initialize(conf?) {
            conf = conf || {};
            conf.labelColor = conf.labelColor || "rgba(0, 0, 0, 0.298039)";
            this.height = conf.height || 72;
            this.width = conf.width || 256;
            this._value=conf.value;
            this.label=conf.label||"";
            this.hintColor=conf.hintColor;
            this.hint=conf.hint;
            this.type=conf.type;
            this.placeholder=conf.placeholder;
            if(!conf.label && conf.placeholder){ this.label=conf.placeholder; }
            return this;
        }
        render(dom) {
            var me = this;
            this.style("font-size: 16px; line-height: " + (this.height * 0.39) + "px; width: " + this.width + "px; height: " + this.height + "px; display: inline-block; position: relative; background-color: transparent; font-family: Roboto, sans-serif; transition: height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; cursor: auto;")
                .append(new zui.Component(zui.Component.parseHtml("label")).style("position: absolute; line-height: " + (this.height * 0.55) + "px; top: " + (this.height * 0.55) + "px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; z-index: 1; transform: scale(1) translate(0px, 0px); transform-origin: left top 0px; pointer-events: none; user-select: none; color: rgba(0, 0, 0, 0.298039);").addClass("label").html(me.label || ""))
                .append(new zui.Component(zui.Component.parseHtml("div")).style("position: absolute; opacity: 0; color: rgba(0, 0, 0, 0.298039); transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; bottom: " + (me.height * 0.17) + "px;").addClass("placeholder").html(me.placeholder || ""))
                .append(new zui.Component(zui.Component.parseHtml("input")).attr({ type: me.type || "text" }).style("padding: 0px; position: relative; width: 100%; border: none; outline: none; background-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0.870588); cursor: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); height: 100%; box-sizing: border-box; margin-top: " + (me.height * 0.19) + "px;").bind("focus", function () {
                    me.find("hr.hover-for-text").css({ transform: "scaleX(1)" });
                    if (!me.getValue() && me.hint) {
                        me.find("div.placeholder").css({ opacity: 1 });
                        me.find("label.label").css({ transform: "scale(0.75) translate(0px, -" + (me.height * 0.56) + "px)","font-szie":"15px", color: me.hintColor || me.labelColor });
                    }
                }).bind("blur", function () {
                    me.find("hr.hover-for-text").css({ transform: "scaleX(0)" });
                    if (!me.getValue() && me.hint) {
                        me.find("div.placeholder").css({ opacity: 0 });
                        me.find("label.label").css({ transform: "scale(1) translate(0px, 0px)", color: me.labelColor });
                    }
                }).bind("keydown", function () {
                    if (me.getValue()) {
                        me.find("div.placeholder").css({ opacity: 0 });
                    }
                }).bind("keyup", function () {
                    if (me.getValue()) {
                        me.find("div.placeholder").css({ opacity: 0 });
                    }
                }).value(me._value || ""))
                .append((function () {
                    return new zui.Component(zui.Component.parseHtml("div"))
                        .append(new zui.Component(zui.Component.parseHtml("hr")).style("border-top: none rgb(224, 224, 224); border-left: none rgb(224, 224, 224); border-right: none rgb(224, 224, 224); border-bottom: 1px solid rgb(224, 224, 224); bottom: " + (me.height * 0.01) + "px; box-sizing: content-box; margin: 0px; position: absolute; width: 100%;"))
                        .append(new zui.Component(zui.Component.parseHtml("hr")).style("border-top: none rgb(0, 188, 212); border-left: none rgb(0, 188, 212); border-right: none rgb(0, 188, 212); border-bottom: 2px solid rgb(0, 188, 212); bottom: " + (me.height * 0.01) + "px; box-sizing: content-box; margin: 0px; position: absolute; width: 100%; transform: scaleX(0); transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;").addClass("hover-for-text"))
                        ;
                })())
                ;
            if (this.getValue() || !me.hint) {
                this.find("div.placeholder").css({ opacity: 0 });
                this.find("label.label").css({ transform: "scale(0.75) translate(0px, -" + (me.height * 0.56) + "px)", color: me.hintColor || me.labelColor });
            }
            if(dom){
                super.render(dom);
            }
            return this;
        }
        getValue = function () {
            return this.find("input").value();
        }
    }

    export class Select extends ui {
        constructor() {
            super();
            this.selected = [zui.Component.parseHtml("div")];
            this.txt="";
        }
        label: any;
        height: number;
        width: number;
        placeholder: any;
        type = "text";
        hint: any;
        hintColor: any;
        labelColor: any;
        val: any;
        txt:any;
        horizontal: string;
        vertical: string;
        initialize(conf?) {
            conf = conf || {};
            conf.labelColor = conf.labelColor || "rgba(0, 0, 0, 0.298039)";
            this.height = conf.height || 72;
            this.width = conf.width || 256;
            this.label=conf.label||"";
            this.hintColor=conf.hintColor;
            this.hint=conf.hint;
            this.type=conf.type;
            this.placeholder=conf.placeholder;
            if(!conf.label && conf.placeholder){ this.label=conf.placeholder; }
            this.list=new List();
            return this;
        }
        list: List;
        layerHeight: number;
        layer: Layer;
        render(dom) {
            var u = this;
            var height = this.height;
            u.style("transition:height 200ms cubic-bezier(0.23, 1, 0.32, 1); width: " + (u.width || 256) + "px; height: " + (u.height || 256) + "px; line-height: " + (u.height * 0.33) + "px; font-family: Roboto,sans-serif; font-size: 16px; display: inline-block; position: relative; cursor: auto; background-color: transparent;")
                .append(new ui(zui.Component.parseHtml("label")).style("transition:450ms cubic-bezier(0.23, 1, 0.32, 1); top: " + (u.height * 0.605) + "px; color: rgba(0, 0, 0, 0.3); line-height: " + (u.height * 0.405) + "px; position: absolute; z-index: 1; pointer-events: none; transform: scale(1) translate(0px, 0px); transform-origin: left top 0px;").addClass("label").html(u.label || "&nbsp;"))
                //.append(new element(element.parseHtml("label")).css({ "margin": (height * 0.1) + "px 0px 0px 1px","position": "absolute", "line-height": (height * 0.45) + "px", "top": (height * 0.385) + "px","padding":"0px 0px 0px 2px", "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms", "z-index": "1", "transform": "scale(1) translate(0px, 0px)", "transform-origin": "left top 0px", "pointer-events": "none", "user-select": " none", "color": "rgba(0, 0, 0, 1)" }).addClass("zonic-select-label").html(conf.text || ""))
                .append(new ui(zui.Component.parseHtml("div")).style('font:inherit; padding: 0px; outline: invert; border: medium; transition:450ms cubic-bezier(0.23, 1, 0.32, 1); border-image: none; width: 100%; height: 100%; color: rgba(0, 0, 0, 0.87); margin-top: ' + (u.height * 0.2) + 'px; display: block; position: relative; cursor: inherit; box-sizing: border-box; font-size-adjust: none; font-stretch: inherit; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); background-color: rgba(0, 0, 0, 0)')
                    .call(function () {
                        new ui(zui.Component.parseHtml("div")).css({ "padding-left": "5px", cursor: "pointer", height: "100%", position: "relative", width: "100%" })
                            .append(new zui.Component(zui.Component.parseHtml("div")).style("box-sizing:border-box;content: \" \";display:table;"))
                            .append(new zui.Component(zui.Component.parseHtml("div")).style("top: " + (height * 0.21) + "px; color: rgba(0, 0, 0, 0.87); line-height: " + (height * 0.8) + "px; overflow: hidden; padding-right: 56px; padding-left: 0px; white-space: nowrap; position: relative;text-overflow: ellipsis; opacity: 1;").addClass("zonic-select-area").html(u.txt || "&nbsp;"))
                            .append(new zui.Component(zui.Component.parseHtml("button")).attr({ type: "button" }).css({ "border": (height * 0.117) + "px", " box-sizing": "border-box", "display": "inline-block", "font-family": " Roboto, sans-serif", " -webkit-tap-highlight-color": " rgba(0, 0, 0, 0)", " cursor": " pointer", " text-decoration": " none", " margin": " 0px", "padding": (height * 0.1067) + "px", "outline": " none", "font-size": " 0px", "font-weight": " inherit", "position": "absolute", "z-index": " 1", "overflow": " visible", "transition": " all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms", " width": (height * 0.76067) + "px", " height": (height * 0.76067) + "px", " fill": " rgb(224, 224, 224)", " right": " 0px", " top": (height * 0.30) + "px", " background": " none" }).html('<div><svg viewBox="0 0 ' + (height * 0.33) + ' ' + (height * 0.33) + '" style="display: inline-block; color: rgba(0, 0, 0, 0.870588); fill: inherit; height: ' + (height * 0.33) + 'px; width: ' + (height * 0.33) + 'px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;"><path d="M7 10l5 5 5-5z"></path></svg></div>'))
                            .append(new zui.Component(zui.Component.parseHtml("div")).css({ "border-top": "none", "bottom": "1px", left: "0px", margin: "-1px 24px", right: "0px", position: "absolute" }))
                            .append(new zui.Component(zui.Component.parseHtml("div")).style("box-sizing:border-box;content: \" \";display:table;clear: both;"))
                            .appendTo(this);
                    }).bind("click", function () {
                        if (u.layer) { return; }
                        var rect = u.Rectangle();
                        var top = u.selected[0].offsetTop;
                        u.layer = new Layer();
                        u.layer.initialize({D3:true, position: "fixed", dragable: false, width: "0px", height: "0px" }).addClass("zonic-select").
                            style("transition:height 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;").style("width: " + (u.width || rect.width) + "px;height:" + (u.layerHeight || 160) + "px;border-radius:2px; left: " + (rect.left + (u.horizontal == "right" ? rect.width : (u.horizontal == "middle" ? rect.width / 2 : 0))) + "px; top: " + (rect.top + u.height * 0.2 + (u.vertical == "top" ? 0 : (u.vertical == "center" ? rect.height / 2 : rect.height))) + "px;");
                        u.find("label.label").css({ transform: "scale(0.75) translate(0px, " + (-u.height * 0.10) + "px)", color: u.labelColor || "rgba(0, 0, 0, 0.298039)" });
                        //u.find("label.")
                        u.list = new List().on("selectchanged", function (e, data, item) {
                            if (!helper.isObject(data)) {
                                u.selectedValue = u.selectedText = data; u.find(".zonic-select-area").html(data).attr({ "zonic-selected-value": data });
                            } else {
                                u.selectedValue = data.value; u.selectedText = data.text; u.find(".zonic-select-area").html(data.text).attr({ "zonic-selected-value": data.value });
                            }
                            if(!u.selectedValue){ //如果没有选择值则 复原
                                u.find("label.label").css({ transform: "scale(1) translate(0px, 0px)", color: u.labelColor });
                            }
                            u.emit("selectchanged", helper.slice(arguments));
                        });
                        u.list.additem(u.items);
                        u.list.appendTo(u.layer);
                        u.layer.render("body");
                    })
                    .append((function () {
                        return new zui.Component(zui.Component.parseHtml("div")).html('<hr style="border-width: medium medium 1px; border-style: none none solid; border-color: rgb(224, 224, 224); margin: 0px; width: 100%; bottom:' + (u.height * 0.06) + 'px; position: absolute; box-sizing: content-box;">')
                            //.append(new element(element.parseHtml("hr")).css({ "border-width":"medium medium 1px","border-style":"none none solid","border-color":"rgb(224, 224, 224)","margin":"0px","width":"100%","bottom":(height*0.06)+"px","position":"absolute","box-sizing":"content-box" }))
                            ;
                    })())
                );
            zui.Component.select("body").on("click", function (e) {
                var e = e || window.event;
                if (u.selected[0].isEqualNode(e.target) ||
                    u.find("*").has(e.target)) {
                    return;
                }
                u.layer.remove();
                u.layer = null;
            });
            if(dom){
                super.render(dom);
            }
            return this;
        }
        selectedValue = "";
        selectedText = "";
        items=[]
        additem () {
            //this.list.additem.apply(this.list, helper.slice(arguments))
            this.items= this.items.concat(helper.slice(arguments));
            return this;
        }
    }
    export class NavigationLayer extends Layer{
        mask:Layer;
        constructor (){
            super();
            this.mask=new Layer().initialize({mode:"mask"});
        }
        href:string
        ignoreFrame=true;
        size="L"
        initialize(conf){
            conf=conf||{};
            conf.mode=conf.mode?conf.mode:"hover";
            conf.center=true;
            conf.width=conf.width||"75%";
            conf.height=conf.height||"450px";
            conf.position="absolute";
            conf.background=conf.bgcolor||"white";
            conf.zindex=(this.mask.zindex||10)+1;
            this.size=conf.size||"L";
            super.initialize(conf);
            this.href=conf.href;
            if("ignoreFrame" in conf){
                this.ignoreFrame=conf.ignoreFrame;
            }
            var me=this;
            this.append(new zui.Component(zui.Component.parseHtml("div")).style({cursor:"pointer"})
                .append(new zui.Component(zui.Component.parseHtml("div")).addClass("zonic-poper-layer-header").attr("zonic-size",me.size||"L")
                    .append(new zui.Component(zui.Component.parseHtml("div"))
                        .append(new zui.Component(zui.Component.parseHtml("span")).text(conf.text||"Navigation Dialog"))
                    )
                    .append(new zui.Component(zui.Component.parseHtml("div")).addClass("menu")
                        //.append(new zui.Component(zui.Component.parseHtml("button")).attr({"type":"button"}).text(conf.text||"Navigation Dialog"))
                        .call(function(){
                            if(conf.menuHtml){
                                new zui.Component(this).html(conf.menuHtml);
                            }else{
                                new zui.Component(this).append(new zui.Component(zui.Component.parseHtml("button")).attr({"type":"button"}).append(
                                    new zui.Component(zui.Component.parseHtml("i")).addClass("fa").addClass("fa-close")).on("click",function(){
                                        me.remove();
                                    }));
                            }
                        })
                    )
                )
            )
            .append(new zui.Component(zui.Component.parseHtml("div")).addClass("navigation-loading").attr("zonic-size",me.size||"L").style({width:"100%",display:"none"})
                .append(new zui.Component(zui.Component.parseHtml("div")).addClass("loading-barx5-12")))
            .append(new zui.Component(zui.Component.parseHtml("iframe")).on("load",function(){
                me.hideloading();
            }).addClass("navigation-window").attr("zonic-size",me.size||"L"));
            if("showLoading" in conf && conf.showLoading==true){
                this.find(".navigation-loading").show();
            }
            if(conf.href){
                this.href=conf.href||this.href;
            }
            return this;
        }
        isModelDialog:false;
        showloading(){
                this.find(".navigation-loading").show();
        }
        hideloading(){
                this.find(".navigation-loading").hide();
        }
        remove(){
            this.mask.remove();
            super.remove();
            return this;
        }
        close(){
            return this.remove();
        }
        show2Top=true;
        render(dom?){
            var me=this;
            this.mask.layout({overflow:"hidden"}).on("click",function(){
               if(!me.isModelDialog)me.remove();
            }).render(new zui.Component("body",helper.Document(this.show2Top)));
            super.render(new zui.Component("body",helper.Document(this.show2Top)));
            var r=this.Rectangle();
            var h=r.height;
            this.find("iframe.navigation-window").style({height:(this.size=="L"?h-56:(this.size=="N"?h-39:h-26))+"px"});
            this.showloading();
            this.find("iframe.navigation-window").attr({src:this.href});
            return this;
        }
    }
    export class Dialog extends Layer {
        constructor() {
            super();
            this.mask=new Layer().initialize({mode:"mask"});
            this.selected = [zui.Component.parseHtml("div")];
        }
        mask: Layer
        zindex:10
        _remove: any
        initialize(conf?) {
            conf=conf||{};
            conf.mode=conf.mode?conf.mode:"hover";
            conf.center=true;
            conf.width=conf.width||"45%";
            conf.height=conf.height||"250px";
            conf.position="absolute";
            conf.background=conf.bgcolor||"white";
            conf.center=true;
            this.zindex=(this.mask.zindex||conf.zindex||10)+1;
            if("modelDialog" in conf && conf.modelDialog==true){
                this.modelDialog=conf.modelDialog;
            }
            super.initialize(conf);
            return this;
        }
        listen = function () {
            var u = this;
            u.find("[ns-command]").bind("click", function (e) {
                var el = zui.Component.select(this), cmd = el.attr("ns-command");
                u.emit(cmd, e, this);
            });
            return this;
        }
        remove(){
            this.mask.remove();
            super.remove();
            return this;
        }
        close(){
            return this.remove();
        }
        show2Top=true;
        modelDialog=false;
        render(html,dom?){
            if(html){
                if(helper.isFunction(html)){
                    html.call(this,dom);
                }else{
                    this.append(html);
                }
            }
            var me=this;
            this.mask.layout({overflow:"hidden"}).on("click",function(){
                if(!me.modelDialog) me.remove();
            }).render(new zui.Component("body",helper.Document(this.show2Top)));
            super.render(new zui.Component("body",helper.Document(this.show2Top)));
            return this;
        }
        static alert(conf, okfn?: Function) {
            if (typeof conf === "string") {
                conf = { text: conf };
            }
            if (helper.isFunction(okfn)) { conf.ok = okfn; }
            conf.mask = true;
            conf.height=conf.height||"190px";
            var u = new Dialog().initialize(conf);
            u.append(new zui.Component(zui.Component.parseHtml('<h3 style="margin: 0px; padding: 24px 24px 20px; color: rgba(0, 0, 0, 0.87); line-height: 32px; font-size: 22px; font-weight: 400; border-bottom-color: currentColor; border-bottom-width: medium; border-bottom-style: none;">' + (conf.title || "Alert Dialog") + '</h3>')))
                .append(new zui.Component(zui.Component.parseHtml('<div class="zonic-dialog-text" style="padding: 0px 24px 24px; color: rgba(0, 0, 0, 0.6); font-size: 16px; overflow-y: hidden; max-height: 123px; box-sizing: border-box;">' + (conf.text || "") + '</div>')))
                .append(new zui.Component(zui.Component.parseHtml('<div class="zonic-dialog-buttons" style="padding: 8px; width: 100%; text-align: right; margin-top: 0px; border-top-color: currentColor; border-top-width: medium; border-top-style: none; box-sizing: border-box; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div>')))
                ;

                u.find(".zonic-dialog-buttons").append('<button tabindex="3" ns-command="close" class="zonic-button" type="button"><div><span>' + (conf.closeText || "CLOSE") + '</span></div></button>')
                    .append('<button tabindex="1" ns-command="cancel" class="zonic-button" type="button"><div><span>' + (conf.cancelText || "CANCEL") + '</span></div></button>')
                    .append('<button tabindex="2" ns-command="ok" class="zonic-button" type="button"><div><span>' + (conf.okText || "OK") + '</span></div></button>')
                    ;
            ui.effacee({ cascade: u.find("[ns-command] div") });
            u.on("ok", function () {
                if (helper.isFunction(conf.ok)) { if(conf.ok.apply(u, helper.slice(arguments))===true){ return;} }
                u.remove();

            }).on("cancel",function(){
                if (helper.isFunction(conf.cancel)) { if(conf.cancel.apply(u, helper.slice(arguments))===true){ return;} }
                u.remove();
            }).on("close",function(){
                if (helper.isFunction(conf.close)) { if(conf.close.apply(u, helper.slice(arguments))===true){ return;} }
                u.remove();
            });
            if(conf.hover){
                u.find(".zonic-dialog-buttons [ns-command="+conf.hover+"]").attr("1","2");
            }
            if(conf.disabledCancel){
                u.find(".zonic-dialog-buttons [ns-command=cancel]").hide();
            }
            if(conf.disabledClose){
                u.find(".zonic-dialog-buttons [ns-command=close]").hide();
            }
            if(conf.disabledOk){
                u.find(".zonic-dialog-buttons [ns-command=ok]").hide();
            }
            u.html=function(html){
                return html?u.find(".zonic-dialog-text").html(html):(u.find(".zonic-dialog-text").html()?this:this);
            }
            u.listen();
            return u;
        }
        static confirm(conf, okfn?: Function) {
            conf.modelDialog=true;
            return Dialog.alert(conf,okfn);
        }
    }
export class Checkbox extends ui{
    //<div style="cursor: pointer; position: relative; overflow: visible; display: table; height: auto; width: 100%;"><!-- react-empty: 13004 --><input type="radio" value="on" style="position: absolute; cursor: inherit; pointer-events: all; opacity: 0; width: 100%; height: 100%; z-index: 2; left: 0px; box-sizing: border-box; padding: 0px; margin: 0px;"><div style="display: flex; width: 100%; height: 100%;"><div style="transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; float: left; position: relative; display: block; flex-shrink: 0; width: 24px; margin-right: 16px; margin-left: 0px; height: 24px;"><div><svg viewBox="0 0 24 24" style="display: inline-block; color: rgba(0, 0, 0, 0.870588); fill: rgba(0, 0, 0, 0.870588); height: 24px; width: 24px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; position: absolute; opacity: 0; transform: scale(0);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg><svg viewBox="0 0 24 24" style="display: inline-block; color: rgba(0, 0, 0, 0.870588); fill: rgb(0, 188, 212); height: 24px; width: 24px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; position: absolute; opacity: 1; transform: scale(1); transform-origin: 50% 50% 0px;"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg></div><div><span style="height: 200%; width: 200%; position: absolute; top: -12px; left: -12px; overflow: hidden; pointer-events: none; color: rgb(0, 188, 212);"></span></div><div style="position: absolute; overflow: hidden; height: 100%; width: 100%; top: 0px; left: 0px;"></div></div><label style="float: left; position: relative; display: block; width: calc(100% - 60px); line-height: 24px; color: rgba(0, 0, 0, 0.870588); font-family: Roboto, sans-serif;">Center</label></div></div>
    
}
export class Popup extends Layer {
        constructor() {
            super();
            this.selected = [zui.Component.parseHtml("div")];
        }
        zindex:10
        _remove: any
        initialize(conf?) {
            conf=conf||{};
            conf.mode=conf.mode?conf.mode:"hover";
            conf.center=true;
            conf.width=conf.width||"210px";
            conf.height=conf.height||"60px";
            conf.position="absolute";
            conf.background=conf.bgcolor||"white";
            conf.center=true;
            this.zindex=conf.zindex;
            super.initialize(conf);
            return this;
        }
        close(){
            return this.remove();
        }
        static popups=[];
        show2Top=true;
        speed=300;
        render(html,dom?){
            if(html){
                if(helper.isFunction(html)){
                    html.call(this,dom);
                }else{
                    this.append(html);
                }
            }
            var me=this;
            super.render(new zui.Component("body",helper.Document(this.show2Top)));
            return this;
        }
        show(speed?){

            return this;
        }
    }
    export class Liner extends ui{
        constructor() {
            super("create:div");
        }
        initialize(conf?) {
            var u = this;
            conf = conf || {};
                u.style('left:' + (conf.left || "0px") + ';width:' + (conf.width || "60px") + ' ;display: block;background-color: ' + (conf.background || "rgb(255, 64, 129)") + ';height: ' + (conf.height || "2px") + ';margin-top: -' + (conf.height || "2px") + 'px;position: relative;transition: left 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;');
            return u;
        }
        left = function (w) {
            return this.style("width:" + w);
        }
    }
    export class Tab extends ui {
        constructor() { super(); }
        liner:Liner
        initialize(conf) {
            conf = conf || {};
            this.selected = [zui.Component.parseHtml("div")];
            emitter.Emitter.mixin(this);
            var u = this;
            u.append(new zui.Component("create:div").style('box-sizing: border-box; content: " "; display: table;'))
                .append(
                new zui.Component(zui.Component.parseHtml("div"))
                    .append(new zui.Component("create:div").style("width: 100%; background-color:" + (conf.headBackground || "rgb(0, 188, 212)") + "; white-space: nowrap; display: flex;height:" + (conf.headHeight || "30px") + ";line-height:" + (conf.headHeight || "30px") + ";").addClass("zonic-tab-head-container"))
                    .append(new zui.Component("create:div").style("width: 100%; ").call(function () { u.liner = new Liner().initialize({ width: "0px", background: conf.linerBackground || "" }); u.liner.appendTo(this); return this; }))
                    .append(new zui.Component("create:div").style("width: 100%; ").addClass("zonic-tab-item-container"))
                ).append(new zui.Component("create:div").style('box-sizing: border-box; content: " "; display: table;'))
                ;
            this.itemwidth = conf.itemwidth || this.itemwidth;
            if (/px$/i.test(u.itemwidth)) {
                u._itemwidth = parseFloat(u.itemwidth.substr(0, u.itemwidth.length - 2)) || 100;
            }
            if (conf.items) {
                u.additem(conf.items);
                u.find(".zonic-tab-head").eq(0).trigger("click");
            }
            return this;
        }
        _itemwidth = 100;
        itemwidth = "100px";
        additem = function (data) {
            var u = this;
            if (helper.isArray(data)) { data.forEach(function (it) { u.additem(it); }); return this; }
            return (function () {
                var d = { uiParent: null, head: null, item: null };
                var children = u.find(".zonic-tab-head");
                if (u.itemwidth === "percent" || u.itemwidth === "%") {
                    u._itemwidth = 100 / (children.selected.length + 1);
                    children.style("width:" + (u._itemwidth * (children.selected.length + 1)) + "%;");
                }
                var item = new zui.Component("create:button").attr({ "tabindex": 0, "type": "button" }).style("width:" + (u.itemwidth === "percent" || u.itemwidth === "%" ? u._itemwidth * (children.selected.length + 1) + "%" : (u._itemwidth + "px")) + ";height:100%;border: 10px; box-sizing: border-box; display: inline-block; font-family: Roboto, sans-serif; -webki-tap-highlight-color: rgba(0, 0, 0, 0); cursor: pointer; text-decoration: none; margin: 0px; padding: 0px; outline: none; font-size: 14px; font-weight: 500; position: relative; z-index: 1; color: rgb(255, 255, 255); text-transform: uppercase; background: none; ").html('<div><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 48px; "></div></div>')
                var itembody = new zui.Component("create:div").addClass("zonic-tab-item").style("width: 100%; position: relative; text-align: initial;opacity:0;min-height:" + (this.minHeight || "120px") + ";").call(function () {
                    if (helper.isFunction(data.body)) { data.body.call(this, u, data); } else if (typeof data.body === "string") { zui.Component.select(this).html(data.body); } else if (data.body) { zui.Component.select(this).append(data.body); } return this;
                }).appendTo(u.find(".zonic-tab-item-container"));
                d.uiParent = u;
                d.head = item;
                d.item = itembody;
                u.liner.style("width:" + (u.itemwidth === "percent" || u.itemwidth === "%" ? (u._itemwidth) + "%" : (u._itemwidth + "px")));
                item.bind("click", function (e) {
                    if (item.attr("disabled")) { return; }
                    u.find(".zonic-tab-head[selected='true']").attr({ "selected": "false" });
                    item.attr({ "selected": "true" });
                    u.find(".zonic-tab-item").hide();
                    itembody.show();
                    u.emit("tabchanged", e, data, d, item);
                }).bind("mouseenter", function (e) {
                    var index = u.find(".zonic-tab-head").selected.indexOf(this);
                    u.liner.style("left:" + (u._itemwidth * index) + (u.itemwidth === "percent" || u.itemwidth === "%" ? "%" : "px"));
                    u.emit("hoverinitem", e, data, d, item);
                }).bind("mouseout", function (e) {
                    var index = u.find(".zonic-tab-head").selected.indexOf(u.find(".zonic-tab-head[selected='true']").selected[0]);
                    u.liner.style("left:" + (u._itemwidth * index) + (u.itemwidth === "percent" || u.itemwidth === "%" ? "%" : "px"));
                    u.emit("hoveroutitem", e, data, d, item);
                }).addClass("zonic-tab-head").attr({ "selected": "false", }).appendTo(u.find(".zonic-tab-head-container")).html(data.headText);
                return item;
            })();
        }

    }
}
