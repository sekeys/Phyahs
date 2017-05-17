
import {zonic as helper} from './Zonic.base';
import {zonic as style} from  './Style';
import {zonic as emitter} from './emitter';
import {zonic as zcomp} from  './IComponent';

export module zonic {
    export class Component implements zcomp.IComponent {
        protected selected: any[];
        attr (name, value?) {
            if (arguments.length < 2) {
                if (typeof name === "string") {
                    var node = this.node();
                    name = Component.DOM.qualify(name);
                    if (!node.getAttribute) { return ""; }
                    return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
                }
                for (value in name)
                    this.each(Component.DOM.attr(value, name[value]));
                return this;
            }
            return this.each(Component.DOM.attr(name, value));
        }
        static DOM = {
            getUnitType: function (property) {
                if (/^(rotate|skew)/i.test(property)) {
                    return "deg";
                } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
                    return "";
                } else {
                    return "px";
                }
            },
            getUnitFormatType: function (property) {
                if (/^(rotate|skew)/i.test(property)) {
                    return property + "({0}deg)";
                } else if (/(^(alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
                    return "{0}";
                } else if (/^(scale|scaleX|scaleY|scaleZ)/.test(property)) {
                    return property + "({0})";
                } else {
                    return "{0}px";
                }
            },
            getDisplayType: function (element) {
                var tagName = element && element.tagName.toString().toLowerCase();

                if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
                    return "inline";
                } else if (/^(li)$/i.test(tagName)) {
                    return "list-item";
                } else if (/^(tr)$/i.test(tagName)) {
                    return "table-row";
                } else if (/^(table)$/i.test(tagName)) {
                    return "table";
                } else if (/^(tbody)$/i.test(tagName)) {
                    return "table-row-group";
                    /* Default to "block" when no match is found. */
                } else {
                    return "block";
                }
            },
            parseProperty: function (property) {
                var s = property.split("-"), i = 0, l = s.length, p = "";
                for (; i < l; i++) {
                    if (i === 0) {
                        p = s[i].toLowerCase();
                    } else {
                        p += s[i].charAt(0).toUpperCase() + s[i].slice(1);
                    }
                }
                return p;
            },
            extractValue: function (value, property) {
                return parseFloat(value);
            },
            getHeightWidth: function (dom, prop) {
                var v = "", p;
                if ((v = dom.css(prop)) == "auto" && (v = dom.css("max-" + prop), v != "auto" ? dom.property("_animation_toggle_fix", (p = {} || dom.property("_animation_toggle_fix"))["max-" + prop] = v != "auto" ? v : "") : "") == "auto") {
                    this.getHeightWidth(dom.parent(), prop);
                } else {
                    return v;
                }
            },
            nsPrefix: {
                svg: "http://www.w3.org/2000/svg",
                xhtml: "http://www.w3.org/1999/xhtml",
                xlink: "http://www.w3.org/1999/xlink",
                xml: "http://www.w3.org/XML/1998/namespace",
                xmlns: "http://www.w3.org/2000/xmlns/"
            },
            qualify: function (name) {
                var i = name.indexOf(":"), prefix = name;
                if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
                    name = name.slice(i + 1);
                return this.nsPrefix.hasOwnProperty(prefix) ? {
                    space: this.nsPrefix[prefix],
                    local: name
                } : name;
            },
            camelCase: function (string) {
                return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, "");
            },
            _getStyle: function (elem) {
                // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
                // IE throws on elements created in popups
                // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"

                if (elem.ownerDocument && elem.ownerDocument.defaultView.opener) {
                    return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
                }
                return window.getComputedStyle(elem, null);
            },
            attr: function (name, value) {
                name = Component.DOM.qualify(name);
                function attrNull() {
                    this.removeAttribute(name);
                }
                function attrNullNS() {
                    this.removeAttributeNS(name.space, name.local);
                }
                function attrConstant() {
                    this.setAttribute(name, value);
                }
                function attrConstantNS() {
                    this.setAttributeNS(name.space, name.local, value);
                }
                function attrFunction() {
                    var x = value.apply(this, arguments);
                    if (x === null)
                        this.removeAttribute(name);
                    else
                        this.setAttribute(name, x);
                }
                function attrFunctionNS() {
                    var x = value.apply(this, arguments);
                    if (x === null)
                        this.removeAttributeNS(name.space, name.local);
                    else
                        this.setAttributeNS(name.space, name.local, x);
                }
                return value === null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
            }
        }
        static landingline  (config) {
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
            var t = Component.select(Component.parseHtml("<div style='height:1px;'></div>"));
            t.append(Component.parseHtml(thtmlStyle)); t.append(Component.parseHtml(thtml));
            t["isappended"] = false;
            config.callback ? config.callback.call(t, config.parent) : null;
            if (config.parent && !t["isappended"]) {
                t.appendTo(config.parent);
            }
            return t;
        }
        static drag =function (moveDom, bindDom, opacity?) {
            var bindDom = typeof bindDom === "string" ? Component.select(bindDom) : bindDom || this._ns;
            var opacity = opacity ? opacity : 1;
            var moveDom = moveDom ? typeof moveDom === "string" ? Component.select(moveDom) : moveDom : bindDom;
            var resumPointer = "";
            function parseInt1(o) {
                var i = parseInt(o);
                return isNaN(i) ? 0 : i;
            }
            var me = this;
            var listen = function () {
                Component.select(bindDom).on("mousedown", function (a) {
                    var o = moveDom.node ? moveDom.node() : moveDom;
                    var d = document; if (!a) a = window.event;
                    if (!a.pageX) a.pageX = a.clientX;
                    if (!a.pageY) a.pageY = a.clientY;
                    var x = a.pageX, y = a.pageY;
                    if (o.setCapture)
                        o.setCapture();
                    else if (window.captureEvents)
                        window.captureEvents.call(window, Event["MOUSEMOVE"] | Event["MOUSEUP"]);
                    var backData = { x: moveDom.css("top"), y: moveDom.css("left") };
                    resumPointer = moveDom.css("cursor");
                    moveDom.css({ "cursor": "pointer" });
                    function move(a) {
                        if (!a) a = window.event;
                        if (!a.pageX) a.pageX = a.clientX;
                        if (!a.pageY) a.pageY = a.clientY;
                        var tx = a.pageX - x + parseInt1(moveDom.css("left")), ty = a.pageY - y + parseInt1(moveDom.css("top"));
                        moveDom.css({ left: tx + "px", top: ty + "px" });
                        x = a.pageX;
                        y = a.pageY;
                    }
                    function up(a) {
                        if (!a) a = window.event;
                        if (o.releaseCapture)
                            o.releaseCapture();
                        else if (window.captureEvents)
                            window.captureEvents.call(window, Event["MOUSEMOVE"] | Event["MOUSEUP"]);
                        d.onmousemove = null;
                        d.onmouseup = null;
                        if (!a.pageX) a.pageX = a.clientX;
                        if (!a.pageY) a.pageY = a.clientY;
                        if (!document.body["pageWidth"]) document.body["pageWidth"] = document.body.clientWidth;
                        if (!document.body["pageHeight"]) document.body["pageHeight"] = document.body.clientHeight;
                        setTimeout(function () { moveDom.css({ "cursor": resumPointer }); }, 0);
                        Component.select(d).off("mousemove", move);
                        Component.select(d).off("mouseup", up);
                    }
                    Component.select(d).on("mousemove", move);
                    Component.select(d).on("mouseup", up);
                });
            }
            if (bindDom) {
                listen();
            }
        }
        static Layer(conf) {
            if (!conf) {
                conf = { title: "Popup Layer 弹出框", iconClass: ".fa .fa-dialog", loading: false, left: "13.5%", top: "240px", height: "280px;", width: "60%", titleCss: "" };
            }
            var layer = {
                title: conf.title || "Popup Layer 弹出框",
                css: {
                    left: conf.left || "13.5%",
                    top: conf.top || "240px",
                    height: conf.height || "280px;",
                    width: conf.width || "60%",
                    bottom: conf.bottom || "auto",
                    right: conf.right || "auto",
                },
                icon: conf.icon || "fa-vcard",
                titleCss: conf.titleCss || {},
                loading: conf.loading == null || conf.loading == undefined ? true : !!conf.loading,
                drag: conf.drag == null || conf.drag == undefined ? true : conf.drag,
                enableLanding: conf.enableLanding == null || conf.enableLanding == undefined ? true : !!conf.enableLanding,
                //dispatch: emitter({}),//.dispatch("modechanged", "drag"),
                status: conf.status || "simple",
                render: null,
                min: null,
                restore: null,
                max: null,
                close: null,
                show: null, hide: null, html: null, mode: "hided", content: "", context: null, emit: null,
            }
            emitter.Emitter.mixin(this);
            if (conf.css) {
                layer.css = helper.merge(layer.css, conf.css);
            }
            var htmltemplate = '<div class="pop-lay" style="display:none;  position:fixed; min-height:280px; background-color:white;  border-color:#e0e0e0; border-width:0.1px;border-style:solid;box-shadow:gray 0 0 30px;"><div class="layer-landing" style=" margin-bottom:1px;"></div><div class="info-bar" style="cursor:pointer;border-left-color:rgb(0,156,204); border-left-width:3px; border-left-style:solid; margin-left:0px; cursor:pointer; height:19px;"><div class="info-title" style="cursor:pointer; text-overflow:ellipsis; line-height:18px; font-size:12px; cursor:auto; margin-left:1px; float:left; padding-left:3px; color:#808080;margin-top:3px;"><span class="info-title-icon fa" style="font-size:14px; width:15px; height:15px; line-height:15px;"></span><span class="info-title-content" style=" font-size:14pxheight:15px; line-height:15px;margin-left:5px;"></span></div><div class="top_layer_menu_icon" style="float:left;font-size:11px;"><div class="hover-color screen-close" style="height:15px;width:15px;float:right;font-size:12px; margin-right:5px; cursor:pointer;"><i class="fa fa-close" style="width:15px;height:15px;text-align:center;line-height:15px;"></i></div><div class="hover-color window-maximize" style="display:none; height:15px;width:15px;float:right; margin-right:5px; cursor:pointer;"><i class="fa fa-expand" style="width:15px;height:15px;text-align:center;line-height:15px;"></i></div><div class="hover-color window-minimize" style=" display:none; height:15px;width:15px;float:right; margin-right:5px; cursor:pointer;"><i class="fa fa-compress" style="width:15px;height:15px;text-align:center;line-height:15px;"></i></div></div><div style=" clear:both;"></div></div><div class="layer-content"></div></div>';

            layer.render=function  (fn) {

                var context = Component.select(Component.parseHtml(htmltemplate));
                if (layer.drag) {
                    Component.drag(context, context.find(".info-title"));
                }
                if (layer.enableLanding) {
                    layer["landing"] = Component.landingline({ parent: context.find(".layer-landing") });
                    if (!layer.loading) {
                        layer["landing"].hide();
                    }
                }
                layer.mode = "normal";
                context.css(layer.css);
                if (layer.title) {
                    context.find(".info-title-content").html(layer.title);
                }
                if (fn instanceof Function) {
                    fn.call(context, layer, context.find(".layer-content"));
                }
                else if (fn instanceof String) {
                    context.find(".layer-content").html(fn);
                }
                context.find(".screen-close").show().on("click", function () {
                    layer.close();
                });
                if (layer.status != "simple") {
                    context.find(".window-minimize").on("click", function () {
                        layer.min();
                    });
                    context.find(".window-maximize").show().on("click", function () {
                        layer.max();
                    });
                }
                if (layer.icon) {
                    context.find(".info-title-icon").addClass(layer.icon);
                }
                context.appendTo("body"); layer.mode = "hided";
                layer.context = context;
                if (layer.content) {
                    layer.context.find(".layer-content").append(Component.parseHtml(layer.content));
                }
                return layer;
            }
            layer.min = function () {
                var premode = layer.mode;
                layer.mode = "min";

                if (premode == "closed") {
                    layer.render();
                }
                layer.hide();
                //layer.dispatch.modechanged.call(layer, layer.mode, premode);
                layer.emit("modechanged", layer.mode, premode);
                return layer;
            }
            layer.restore = function () {
                var premode = layer.mode;
                if (premode == "closed") {
                    layer.render();
                    layer.mode = "normal";
                    layer.show();
                } else if (premode == "hided") {
                    layer.show();
                    layer.mode = "normal";
                }
                layer.context.css(layer.css);
                //layer.dispatch.modechanged.call(layer, layer.mode, premode);
                layer.emit("modechanged", layer.mode, premode);
                return layer;
            }
            layer.max = function () {
                var premode = layer.mode;
                layer.mode = "normal";
                if (premode == "closed") {
                    layer.render();
                }
                layer.context.css({ width: "100%", height: "100%", left: 0, top: 0, right: 0, bottom: 0 });
                //layer.dispatch.modechanged.call(layer, layer.mode, premode);
                layer.emit("modechanged", layer.mode, premode);
                return layer;
            }
            layer.close = function () {
                var premode = layer.mode;
                layer.mode = "closed";
                //if (premode == "closed") {
                //    layer.render();
                //}
                layer.context.remove();
                //delete layer.context;

                //layer.dispatch.modechanged.call(layer, layer.mode, premode);
                layer.emit("modechanged", layer.mode, premode);
                return layer;
            }
            layer.show = function () {
                var premode = layer.mode;
                if (premode == "closed") {
                    layer.render();
                }
                layer.context.show();
                layer.mode = "showed";

                var w = layer.context.find(".info-bar").getBoundingWidth();
                var w2 = layer.context.find(".top_layer_menu_icon").getBoundingWidth();
                layer.context.find(".info-title").css({ width: (w - w2 - 10) + "px" });
                //top_layer_menu_icon
                //layer.dispatch.modechanged.call(layer, layer.mode, premode);
                layer.emit("modechanged", layer.mode, premode);
                return layer;
            }
            layer.hide = function () {
                var premode = layer.mode;
                layer.mode = "hided";
                layer.context.hide();
                //layer.dispatch.modechanged.call(layer, "hided", premode);
                layer["emit"]("modechanged", layer.mode, premode);
                return layer;
            }
            layer.html = function (html) {
                if (html) {
                    layer.content = html;
                    if (layer.content) {
                        layer.context.find(".layer-content").append(Component.parseHtml(layer.content));
                    }
                    return this;
                }
                return this;
            }
            return layer;
        }
        Rectangle() {
            return this.first().node().getBoundingClientRect()
                || { width: 0, top: 0, bottom: 0, height: 0, left: 0, right: 0 };
        }
        outHtml  (pos?) {
            return this.calling(function (d) {
                return this.node().outerHTML;
            }, pos || 0);
        }
        tag  (pos) {
            return this.calling(function (d) {
                return this.node().tagName;
            }, pos);
        }
        is(exp, pos) {
            var me = this;
            if (pos != null) {
                return this.selectionMatchs(this.node(pos), exp);
            }
            var b = true;
            this.selected.forEach(function (d) {
                b = b && me.selectionMatchs(d, exp);
            });
            return b;
        }
        first  () {
            return this.at(0);
        };
        lt  (pos) {
            this.selected = this.selected.slice(0, pos);
            return this;
        };
        gt  (pos) {
            this.selected = this.selected.slice(pos);
            return this;
        };
        odd  () {
            var r = [];
            this.selected.forEach(function (d, i) {
                if (i % 2 !== 0) {
                    r.push(d);
                }
            });
            this.selected = r;
            return this;
        };
        eve  () {
            var r = [];
            this.selected.forEach(function (d, i) {
                if (i % 2 === 0) {
                    r.push(d);
                }
            });
            this.selected = r;
            return this;
        };
        last  () {
            return this.at(this.selected.length - 1);
        };
        at  (pos) {
            this.selected = [this.selected[pos]];
            return this;
        };
        eq  (eq) {
            if (typeof eq === "number") {
                return this.at(eq);
            } else if (typeof eq === "string") {
                return this.filter(eq);
            } else {
                return eq.call(this, null);
            }
        };
        filter  (exp) {
            if (exp instanceof Function) {
                return this.each(exp);
            }
            var b = [];
            var me = this;
            this.selected.forEach(function (d) {
                if (me.selectionMatchs(d, exp)) {
                    b.push(d);
                }
            });
            this.selected = b;
            return this;
        };
        next  (exp, pos) {
            var rs = [];
            this.call(function (d) {
                Component.next(d).forEach(function (d) {
                    if (d)
                        rs.push(d);
                });
            }, pos);
            this.selected = rs;
            return exp ? this.filter(exp) : this;
        };
        prev  (exp, pos) {
            var rs = [];
            this.call(function (d) {
                Component.prev(d).forEach(function (d) {
                    if (d)
                        rs.push(d);
                });
            }, pos);
            this.selected = rs;
            return exp ? this.filter(exp) : this;
        };
        children  (exp, pos) {
            var rs = [];
            var rns = new Component();
            this.call(function (d) {
                Component.children(d).forEach(function (d) {
                    if (d)
                        rs.push(d);
                });
            }, pos);
            rns.selected = rs;
            return exp ? rns.filter(exp) : rns;
        };
        parent  (exp, pos) {
            var rs = [];
            this.call(function (d) {
                rs.push(d.parentNode);
            }, pos);
            this.selected = rs;
            return exp ? this.filter(exp) : this;
        };
        insertBefore  (dom, after) {
            var node = dom instanceof Component ? dom.node() : Component.parseHtml(dom);
            this.each(function () {
                if (this.insertBefore) {
                    this.insertBefore(node, after);
                }
            });
            return this;
        };
        append  (name) {
            if (name instanceof Component) {
                var me = this;
                name.each(function () {
                    var self = this;
                    me.each(function () {
                        this.appendChild(self);
                    });
                });
                return this;
            } else if (name.nodeType) {
                this.each(function () {
                    this.appendChild(name);
                });
            } else if (name.length && name[0].length && "string" !== typeof name) {
                var me = this;
                name.each(function () {
                    var self = this;
                    me.each(function () {
                        this.appendChild(self);
                    });
                });
                return this;
            } else {
                name = Component.parseHtml(name);
                return this.each(function () {
                    return this.appendChild(name);
                });
            }
        };
        appendTo  (name) {
            var me = this;
            if (name instanceof Component) {
                name.each(function () {
                    var self = this;
                    me.each(function () {
                        self.appendChild(this);
                    });
                });
                return this;
            } else {
                name = Component.select(name);
                name.each(function () {
                    var self = this;
                    me.each(function () {
                        self.appendChild(this);
                    });
                });
            }
            return this;
        };
        empty  () {
            this.html("");
            return this;
        };
        has  (node) {
            if (!arguments.length || !this.selected.length) { return false; }
            if (node.forEach) {
                var self = this;
                var b = true;
                node.forEach(function (item) {
                    self.each(function (j) {
                        b = b && item.isEqualNode ? item.isEqualNode(j) : item === j;
                    });
                });
                return b;
            } else {
                var b = false;
                for (var i = 0; i < this.selected.length; i++) {
                    b = b || node.isEqualNode ? node.isEqualNode(this.selected[i]) : node === this.selected[i];
                    if (b) { break }
                }
                return b;
            }
        }
        static select = function (exp, context?): zcomp.IComponent {
            return new Component().select(exp, context);
        }
        static parseHtml = function (tag): any {
            if (typeof tag !== "string") {
                return tag;
            }
            var obj = null;
            tag = tag.trim();
            if (/^\S*<tr/i.test(tag)) {
                obj = document.createElement("tbody");
                obj.innerHTML = tag;
            } else if (/^\S*<td/i.test(tag)) {
                obj = document.createElement("tr");
                obj.innerHTML = tag;
            } else if (/^\S*<li/i.test(tag)) {
                obj = document.createElement("ul");
                obj.innerHTML = tag;
            } else if (/^(altGlyph|altGlyphDef|altGlyphItem|animate|animateColor|animateMotion|animateTransform|circle|clipPath|color\-profile|cursor|definition\-src|defs|desc|ellipse|feBlend|feColorMatrix|feComponentTransfer|feComposite|feConvolveMatrix|feDiffuseLighting|feDisplacementMap|feDistantLight|feFlood|feFuncA|feFuncB|feFuncG|feFuncR|feGaussianBlur|feImage|feMerge|feMergeNode|feMorphology|feOffset|fePointLight|feSpecularLighting|feSpotLight|feTile|feTurbulence|filter|font|font\-face|font\-face\-format|font\-face\-name|font\-face\-src|font\-face\-uri|foreignObject|g|glyph|glyphRef|hkern|image|line|linearGradient|marker|mask|metadata|missing\-glyph|mpath|path|pattern|polygon|polyline|radialGradient|rect|set|stop|svg|switch|symbol|text|textPath|title|tref|tspan|use|view|vkern)/i.test(tag)) {
                var xmlnames = {
                    ns: 'http://www.w3.org/2000/svg',
                    xmlns: 'http://www.w3.org/2000/xmlns/',
                    xlink: 'http://www.w3.org/1999/xlink'
                };
                var element = document.createElementNS(xmlnames.ns, tag);
            } else if (/^\S*</.test(tag)) {
                obj = document.createElement("div");
                obj.innerHTML = tag;
            } else {
                return document.createElement(tag);
            }
            return obj.children[0];
        };
        static next = function (d) {
            var r = d, rs = [];
            while ((r = r.nextSibling) != null) {
                rs.push(r);
            }
            return rs;
        };
        static children = function (d) {
            var rs = [];
            var cs = d.children;//window.document.children
            for (var i = 0; i < cs.length; i++) {
                rs.push(cs[i]);
            }
            return rs;
        };
        static prev = function (d) {
            var r = d, rs = [];
            while ((r = r.previousSibling) != null) {
                rs.push(r);
            }
            return rs;
        };
        node(pos?) {
            if (pos != null) {
                return this.selected[pos];
            } else {
                if (this.selected.length == 1) {
                    return this.selected[0];
                }
                return this.selected;
            }
        }
        find (exp): any {
            if (typeof exp === "string") {
                if (/^</.test(exp)) {
                    return Component.select(Component.parseHtml(exp));
                } else {
                    return new Component().queriesSelection(exp, this);
                }
            } else if (exp instanceof Component) {
                return new Component().select(exp);
            } else if (exp.nodeType) {
                return new Component().select(exp);
            }
        }
        hide  () {
            return this.css({ "opacity": "0", display: "none" });
        }
        text  (txt?, pos?):any {
            if (txt != null) {
                this.call(function (d) {
                    if (this.node instanceof Function) {
                        this.node(0).innerText = txt;
                    } else {
                        this.innerText = txt;
                    }
                }, pos);
                return this;
            }
            return this.calling(function (d) {
                return this.node(0).innerText;
            }, this.selected.length > 1 ? pos : 0);
        }
        value  (val?, pos?) {
            if (val != null) {
                this.call(function (d) {
                    if (this.node instanceof Function) {
                        this.node().value = val;
                    } else {
                        this.value = val;
                    }
                }, pos);
                return this;
            }
            return this.calling(function (d) {
                return this.node().value;
            }, pos);
        }
        html  (html?, pos?) {
            if (html != null) {
                this.call(function (d) {
                    this.innerHTML = html;
                }, pos);
                return this;
            }
            return this.calling(function (d) {
                return this.node(0).innerHTML;
            }, this.selected.length > 1 ? pos : 0);
        }
        prop (name, value?) {
            if (!value) {
                var node = this.node();
                return node[name];
            }
            node[name] = value;
            return this;
        }
        show  () {
            return this.each(function (item) { Component.select(this).css({ "opacity": 1, display: Component.DOM.getDisplayType(this) }); });
        }
        render(dom): zcomp.IComponent {
            if (dom instanceof Element) {
                new Component(dom).html(this.html());
            } else if (!dom) {
                document.writeln(this.html());
            } else {
                Component.select(dom).append(this);
            }
            return this;
        }
        remove  () {
            this.each(function () {
                this.parentNode ? this.parentNode.removeChild(this) : null;
            });
            return this;
        }
        class  (cls) {
            return this.attr("class", cls);
        }
        addClass  (cls) {
            if (!cls) {
                return this;
            }
            var r = false, j = 0, value;
            this.each(function () {
                if ((value = this.classList) && value.add) {
                    value.add(cls);
                } else {
                    value = this.getAttribute("class");

                    this.setAttribute("class", value + " " + cls);
                }
                j++;
            });
            return this;
        }
        css (prop: any, value?): any {
            var cssProperty = function (prop, value) {
                var p = prop;
                if (prop === "float") {
                    p = this.style.cssFloat ? "cssFloat" : "styleFloat";
                }
                if (prop === "opacity") {
                    //"opacity:" + p + ";filter:alpha(opacity=" + p * 100 + ");";
                    p = "opacity";

                    cssProperty.call(this, "filter", "filter:alpha(opacity=" + parseFloat(value) * 100 + ")");
                }
                var curElSty = this.currentStyle || Component.DOM._getStyle(this), elSty = this.style;
                p = Component.DOM.parseProperty(p);
                try {
                    if (p in curElSty) {
                        try {
                            curElSty[p] = value;
                        } catch (ex) {
                        }
                    }
                    curElSty.setProperty(p, value);
                } catch (ex) {
                    try {
                        if (p in elSty) {
                            try {
                                elSty[p] = value;
                            } catch (ex) {
                            }
                        }
                        elSty.setProperty(p, value);
                    } catch (ex) {
                        try {
                            elSty.cssText += ";" + prop + ":" + value + ";";
                        } catch (ex) {
                            console.log("don't allow to modify the css");
                        }
                    }
                }
            }, cssgetProperty = function (prop) {
                var curElSty = this.currentStyle || window.getComputedStyle(this, null), elSty = this.style;
                if (prop === "float") {
                    var p = this.style.cssFloat ? "cssFloat" : "styleFloat";
                }
                if (prop === "opacity") {
                    return elSty.opacity || curElSty.opacity || (elSty.filters && elSty.filters.alpha ? elSty.filters.alpha.opacity : 100) / 100;
                }
                return elSty[prop] || curElSty[prop];
            }, me = this;

            if (arguments.length === 1) {
                if (typeof prop === "string") {
                    return cssgetProperty.call(this.node(), Component.DOM.parseProperty(prop));
                } else {
                    for (var p in prop)
                        this.each(function () {
                            cssProperty.call(this, p.trim(), prop[p]);
                        });
                }
            } else if (arguments.length === 2) {
                if (typeof prop === "string") {
                    cssProperty.call(this.node(0), prop, value);
                } else if (typeof value === "function") {
                    for (var p in prop)
                        this.each(function () {
                            value.call(this, [p.trim(), prop[p]]);
                        });
                }
            }
            return this;
        }
        style  (prop, value?) {
            //elSty.cssText += ";" + prop + ":" + value + ";";
            var style = this.attr("style") || "";
            if (arguments.length === 1) {
                if (typeof prop === "string") {
                    style += ";" + prop;
                } else {
                    var c = "";
                    for (var p in prop)
                        c += p + ":" + prop[p] + ";";
                    style += ";" + c;
                }
            } else if (arguments.length === 2) {
                style += ";" + prop + ":" + value;
            }
            this.attr("style", style);
            return this;
        }
        static scrollTop = function () {
            var scrollPos;
            if (window.pageYOffset) {
                scrollPos = window.pageYOffset;
            } else if (document.compatMode && document.compatMode != 'BackCompat') {
                scrollPos = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollPos = document.body.scrollTop;
            }
            return scrollPos;
        }
        drag  (moveDom, bindDom, opacity) {
            var bindDom = typeof bindDom === "string" ? Component.select(bindDom) : bindDom;
            var opacity = opacity ? opacity : 1;
            var moveDom = moveDom ? typeof moveDom === "string" ? Component.select(moveDom) : moveDom : bindDom;
            var resumPointer = "";
            function parseInt1(o) {
                var i = parseInt(o);
                return isNaN(i) ? 0 : i;
            }
            var me = this;
            var listen = function () {
                Component.select(bindDom).on("mousedown", function (a) {
                    var o = moveDom.node ? moveDom.node() : moveDom;
                    var d = document; if (!a) a = window.event;
                    if (!a.pageX) a.pageX = a.clientX;
                    if (!a.pageY) a.pageY = a.clientY;
                    var x = a.pageX, y = a.pageY;
                    if (o.setCapture)
                        o.setCapture();
                    else if (window.captureEvents)
                        window.captureEvents.call(window, Event["MOUSEMOVE"] | Event["MOUSEUP"]);
                    var backData = { x: moveDom.css("top"), y: moveDom.css("left") };
                    resumPointer = moveDom.css("cursor");
                    moveDom.css({ "cursor": "pointer" });
                    function move(a) {
                        if (!a) a = window.event;
                        if (!a.pageX) a.pageX = a.clientX;
                        if (!a.pageY) a.pageY = a.clientY;
                        var tx = a.pageX - x + parseInt1(moveDom.css("left")), ty = a.pageY - y + parseInt1(moveDom.css("top"));
                        moveDom.css({ left: tx + "px", top: ty + "px" });
                        x = a.pageX;
                        y = a.pageY;
                    }
                    function up(a) {
                        if (!a) a = window.event;
                        if (o.releaseCapture)
                            o.releaseCapture();
                        else if (window.captureEvents)
                            window.captureEvents.call(window, Event["MOUSEMOVE"] | Event["MOUSEUP"]);
                        d.onmousemove = null;
                        d.onmouseup = null;
                        if (!a.pageX) a.pageX = a.clientX;
                        if (!a.pageY) a.pageY = a.clientY;
                        if (!document.body["pageWidth"]) document.body["pageWidth"] = document.body.clientWidth;
                        if (!document.body["pageHeight"]) document.body["pageHeight"] = document.body.clientHeight;
                        setTimeout(function () { moveDom.css({ "cursor": resumPointer }); }, 0);
                        Component.select(d).off("mousemove", move);
                        Component.select(d).off("mouseup", up);
                    }
                    Component.select(d).on("mousemove", move);
                    Component.select(d).on("mouseup", up);
                });
            }
            if (bindDom) {
                listen();
            }
        }
        parseHtml (tag) {
            this.selected = [];
            this.selected.push(Component.parseHtml(tag));
            return tag;
        }
        each(fn, args?) {
            this.selected.forEach(function (val, index, arry) {
                fn.apply(val, [val, index, arry].concat(args));
            });
            return this;
        }
        eaching  (fn, args?) {
            var r = [];
            this.selected.forEach(function (val, index, arry) {
                var rs = fn.apply(this, [val, index, arry].concat(args));
                if (rs) {
                    r.push(rs);
                }
            });
            return r;
        }
        call  (fn, pos?, args?) {
            if (pos != null && pos > 0) {
                return fn.call(this.at(pos), args);
            } else {
                return this.each(fn, args);
            }
        }
        on  (evn, fn, args?) {
            if (!evn) {
                return this;
            }
            return this.each(function () {
                try {
                    this.addEventListener(evn, fn, false);
                } catch (e) {
                    try {
                        this.attachEvent('on' + evn, fn);
                    } catch (e) {
                        this['on' + evn] = fn;
                    }
                }
            });
        }
        off  (evn, fn) {
            if (!evn) {
                return this;
            }
            return this.each(function () {
                try {
                    this.removeEventListener(evn, fn, false);
                } catch (e) {
                    try {
                        this.detachEvent('on' + evn, fn);
                    } catch (e) {
                        delete this['on' + evn];
                    }
                }
            });
        }
        bind(evn, fn, args?) { return this.on(evn, fn, args); }
        unbind(evn, fn) { return this.off(evn, fn); }
        calling (fn, pos?, args?) {
            if (this.selected.length == 1) {
                pos = 0;
            }
            if (pos != null && pos > -1) {
                return fn.call(this.at(pos), args);
            } else {
                return this.eaching(fn, args);
            }
        }
        emit  (evn, ...args) {
            if (!evn) {
                return this;
            }
            return this.each(function () {
                if (this.dispatchEvent && document.createEvent) {
                    var e = document.createEvent("MouseEvents");
                    e.initEvent(evn, true, true);
                    this.dispatchEvent(e);
                } else if (document.all) {
                    this[evn]();
                }
            });
        }
        removeClass  (cls) {
            var r = false, j = 0, value, clses = cls.split(/\s+/), i = 0, n = clses.length;
            this.each(function () {
                if (value = this.classList) {
                    while (i < n) {
                        if (value.contains(clses[i])) {
                            value.remove(clses[i]);
                        }
                        i++;
                    }
                } else {
                    value = this.getAttribute("class");
                    while (i < n) {
                        value = value.replace(new RegExp("(?:^|\\s+)" + helper.requote(clses[i]) + "(?:\\s+|$)", "g"), "");
                        i++;
                    }
                    this.setAttribute("class", value);
                }
                j++;
            });
            return this;
        }
        hasClass  (cls) {
            var r = true, j = 0, value, clses = cls.split(/\s+/), i = 0, n = clses.length;
            this.each(function () {
                if (value = this.classList) {
                    while (i < n) {
                        if (!value.contains(clses[i])) {
                            r = false;
                            return true;
                        }
                        i++;
                    }
                } else {
                    value = this.getAttribute("class");
                    while (i < n) {
                        //value = value.replace(, "");
                        if (!new RegExp("(?:^|\\s+)" + helper.requote(clses[i]) + "(?:\\s+|$)", "g").test(value)) {
                            r = false;
                            break;
                        }
                        i++;
                    }
                    this.setAttribute("class", value);
                }
                j++;
            });
            return r;
        }
        trigger(evn) { return this.emit(evn); }
        private parseNodeList(col?) {
            if (!this.selected) { this.selected = []; }
            for (var i = 0; i < col.length; i++) {
                this.selected.push(col[i]);
            }
        }
        private queriesSelection(exp, context?): any {
            if (!context || !context.querySelectorAll) {
                if (context instanceof Component) {
                    var me = this;
                    context.each(function () {
                        me.parseNodeList(this.querySelectorAll(exp));
                    });
                    return this;
                }
                this.parseNodeList(document.querySelectorAll(exp));
                return this;
            }
            this.parseNodeList(context.querySelectorAll(exp));
            return this;
        }
        
        select(exp: any, context?): any {
            this.selected = [];
            if(!exp){return this;}
            if (typeof exp === "string") {
                if (/^</.test(exp)) {
                    return this.select(Component.parseHtml(exp));
                } else if (/create:/i.test(exp)) {
                    return this.select(Component.parseHtml(exp.substr(7)));
                } else {
                    return this.queriesSelection(exp, context);
                }
            } else if (exp instanceof Component) {
                this.selected = exp.selected;
                return this;
            } else if (exp.selected && exp.selected.length) {
                this.selected = exp.selected;
                return this;
            } else if (exp.nodeType) {
                this.selected.push(exp);
                return this;
            } else if (helper.isArray(exp)) {
                var self = this;
                exp.forEach(function (x) { x.nodeType ? self.selected.push(x) : ""; });
            }
            return this;
        }
        private selectionMatchs(n?, s?):any {
            var obj = document.createElement("div"), selectMatcher = obj["matches"] /*|| obj[temp_vendorSymbolFunc(obj, "matchesSelector")]*/, selectMatches = function (n, s) {
                return selectMatcher.call(n, s);
            };
            return selectMatches(n, s);
        }
        constructor(exp?: any, context?) { 
            this.select(exp, context); 
            this["if"]=function (exp, fn1, fn2) {
                        if (arguments.length == 0) { return this; }
                        if (arguments.length == 1) { return exp; }
                        else { if (exp) { return fn1.call(this, null); } else { return helper.isFunction(fn2) ? fn2.call(this, null) : this; } }
                    };
        }
        active() { }
    }
}