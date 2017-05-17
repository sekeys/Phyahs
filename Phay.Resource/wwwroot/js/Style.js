/// <reference path="color.ts" />
define(["require", "exports", "./Color"], function (require, exports, Color_1) {
    "use strict";
    exports.__esModule = true;
    var zonic;
    (function (zonic) {
        var TransformProperty = (function () {
            function TransformProperty(value) {
            }
            return TransformProperty;
        }());
        zonic.TransformProperty = TransformProperty;
        var AnimationProperty = (function () {
            function AnimationProperty(value) {
            }
            return AnimationProperty;
        }());
        zonic.AnimationProperty = AnimationProperty;
        var StyleProperty = (function () {
            function StyleProperty(key, value) {
                this.key = key;
                this.value = value;
            }
            StyleProperty.prototype.color = function () {
                return new Color_1.zonic.Color(this.value);
            };
            StyleProperty.prototype.transform = function () {
                return new TransformProperty(this.value);
            };
            StyleProperty.prototype.Animation = function () {
                return new AnimationProperty(this.value);
            };
            return StyleProperty;
        }());
        zonic.StyleProperty = StyleProperty;
        var StyleRule = (function () {
            function StyleRule() {
                this.map = {};
            }
            StyleRule.prototype.add = function (key, value) {
                this.map[key] = value;
                return this;
            };
            StyleRule.prototype.remove = function (key) {
                if (key in this.map) {
                    delete this.map[key];
                }
                return this;
            };
            StyleRule.prototype.get = function (key) {
                if (key in this.map) {
                    return null;
                }
                return new StyleProperty(key, this.map[key]);
            };
            StyleRule.prototype.apply = function (component) {
                //dom.s
            };
            StyleRule.prototype.merge = function (rule) {
                for (var i in rule) {
                    this.add(i, rule[i] instanceof StyleProperty ? rule[i].value : rule[i]);
                }
            };
            return StyleRule;
        }());
        zonic.StyleRule = StyleRule;
    })(zonic = exports.zonic || (exports.zonic = {}));
});
