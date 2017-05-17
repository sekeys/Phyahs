import  {zonic as style} from  './Style';

export module zonic{

    export interface IComponent {
        Rectangle();
        render(dom, id: string): IComponent;
        css(style?, value?: string);
        attr(attr:any, value?: string);
        prop(prop: any, value?):any;
        on(eventName, func: Function, args?: any): IComponent;
        off(eventName: string, fn: Function): IComponent;
        append(component:any);
        appendTo(component: any);
        remove();
        addClass(cls);
        removeClass(cls);
        hasClass(cls);
        empty();
        style(prop, vlaue?);
        find(exp): IComponent;
        select(exp: any): IComponent;
        active();
        html(html?, pos?);
        show();
        hide();
    }
}