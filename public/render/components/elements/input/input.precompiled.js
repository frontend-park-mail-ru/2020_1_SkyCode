(function () {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['input.hbs'] = template({
        'compiler': [8, '>= 4.3.0'], 'main': function (container, depth0, helpers, partials, data) {
            var helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
                alias2 = container.hooks.helperMissing, alias3 = 'function', alias4 = container.escapeExpression,
                lookupProperty = container.lookupProperty || function (parent, propertyName) {
                    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                        return parent[propertyName];
                    }
                    return undefined;
                };

            return '<input class="'
                + alias4(((helper = (helper = lookupProperty(helpers, 'class') || (depth0 != null ? lookupProperty(depth0, 'class') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
                    'name': 'class',
                    'hash': {},
                    'data': data,
                    'loc': {'start': {'line': 1, 'column': 14}, 'end': {'line': 1, 'column': 23}}
                }) : helper)))
                + '" type="'
                + alias4(((helper = (helper = lookupProperty(helpers, 'type') || (depth0 != null ? lookupProperty(depth0, 'type') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
                    'name': 'type',
                    'hash': {},
                    'data': data,
                    'loc': {'start': {'line': 1, 'column': 31}, 'end': {'line': 1, 'column': 39}}
                }) : helper)))
                + '" placeholder="'
                + alias4(((helper = (helper = lookupProperty(helpers, 'placeholder') || (depth0 != null ? lookupProperty(depth0, 'placeholder') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
                    'name': 'placeholder',
                    'hash': {},
                    'data': data,
                    'loc': {'start': {'line': 1, 'column': 54}, 'end': {'line': 1, 'column': 69}}
                }) : helper)))
                + '">';
        }, 'useData': true
    });
})();