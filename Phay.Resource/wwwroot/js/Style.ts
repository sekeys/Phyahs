/// <reference path="color.ts" />

import {zonic as color} from "./Color"
import {zonic as component } from './Component'

export module zonic {

    export class TransformProperty {
        constructor(value) {
        }
    }
    export class AnimationProperty {
        constructor(value) { }
    }
    export interface IStyleProperty {
        key: string;
        value: string;
        color(): color.IColor;
        transform(): TransformProperty;
        Animation(): AnimationProperty;
    }
    export class StyleProperty implements IStyleProperty {
        key: string;
        value: string;
        color() {
            return new color.Color(this.value);
        }
        transform() {
            return new TransformProperty(this.value);
        }
        Animation() {
            return new AnimationProperty(this.value);
        }
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    export interface IStyleRule {
        add(key, value);
        remove(key);
        get(key): IStyleProperty;
        //apply(dom: HTMLElement);
        apply(component);
        merge(rule: Object);
    }
    export class StyleRule implements IStyleRule{
        private map = {};
        add(key, value) {
            this.map[key] = value;
            return this;
        }
        remove(key) {
            if (key in this.map) { delete this.map[key]; }
            return this;
        }
        get(key) {
            if (key in this.map) { return null; }
            return new StyleProperty(key,this.map[key]);
        }
        apply(component) {
            //dom.s
        }
        merge(rule) {
            for (var i in rule) {
                this.add(i, rule[i] instanceof StyleProperty ?rule[i].value:rule[i]);
            }
        }
    }
}