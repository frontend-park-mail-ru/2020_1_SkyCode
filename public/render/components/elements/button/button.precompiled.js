(function () {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['button.hbs'] = template({
        'compiler': [8, '>= 4.3.0'], 'main': function (container, depth0, helpers, partials, data) {
            var helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
                alias2 = container.hooks.helperMissing, alias3 = 'function', alias4 = container.escapeExpression,
                lookupProperty = container.lookupProperty || function (parent, propertyName) {
                    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                        return parent[propertyName];
                    }
                    return undefined;
                };

            return '<button class="'
                + alias4(((helper = (helper = lookupProperty(helpers, 'classes') || (depth0 != null ? lookupProperty(depth0, 'classes') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
                    'name': 'classes',
                    'hash': {},
                    'data': data,
                    'loc': {'start': {'line': 1, 'column': 15}, 'end': {'line': 1, 'column': 26}}
                }) : helper)))
                + '">'
                + alias4(((helper = (helper = lookupProperty(helpers, 'text') || (depth0 != null ? lookupProperty(depth0, 'text') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
                    'name': 'text',
                    'hash': {},
                    'data': data,
                    'loc': {'start': {'line': 1, 'column': 28}, 'end': {'line': 1, 'column': 36}}
                }) : helper)))
                + '</button>';
        }, 'useData': true
    });
})();