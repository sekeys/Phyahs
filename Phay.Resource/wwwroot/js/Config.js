require.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        Component: 'Component',
        component: 'Component',
        Emitter: "Emitter",
        emitter:"Emitter",
        UI: "UI",
        ui: "UI",
        Style:"Style",
        "Zonic.base": "Zonic.base",
        "zonic.base": "Zonic.base"
    }
});

if (!("exports" in window)) {
    zonic=window.exports  = {}; 
}