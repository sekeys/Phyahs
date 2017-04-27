;
(function () {
    zonic.loadModule = function (href,data) {
        zonic.loadHtml(href, data, function (d) {
            zonic("#module_area").html(d);
        });
    }
    zonic("#main-menu li").on("click", function (e) {
        e = window.event || e;
        var ah = zonic(this).find("a");
        var href = ah.attr("href");
        zonic.loadModule(href, null);
        e.preventDefault();

        if (e && e.preventDefault) {
            e.preventDefault();

        } else {
            e.returnValue = false;
        }
        return false;
    });
    zonic.serialize = function (exp) {
        var obj = {};
        zonic(exp).find("input,textarea,select").each(function () {
            var zt = zonic(this);
            if (this.tagName == "input") {
                obj[zt.attr("name")]=zt.value();
            } else if (this.tagName == "textarea") {
                obj[zt.attr("name")] = zt.value();
            } else if (this.tagName == "select") {
                obj[zt.attr("name")] = zt.value();
            }
        });
        return obj;
    }
})();
