import Component from '../../Component';
import Href from '../../elements/href/Href';
import temp from './Pagination.hbs';

export default class Pagination extends Component {
    constructor({classes, first = 1, last, current, hrefBase}) {
        const hrefs = Pagination.createHrefs(first, last, current, hrefBase);

        super(classes, {
            Hrefs: hrefs,
        }, 'paginatino', temp);
    }

    static createHrefs(first, last, current, hrefBase) {
        if (last < first) last = first;

        const hrefs = [];
        const maxSpace = 9;
        const needLeftShevron = current !== first && last !== first;
        const needRightShevron = current !== last && last !== first;
        let freeSpace = maxSpace - needLeftShevron - needRightShevron;

        const needLeftPoints = !(current - first <= 2);
        const needRightPoints = !(last - current <= 2);

        freeSpace += -needLeftPoints - needLeftPoints
            - needRightPoints - needRightPoints;

        if (needLeftShevron) {
            hrefs.push(new Href({
                text: '<',
                href: hrefBase + String(current - 1),
                classes: 'paginate_href',
                id: 'paginate_left-shevron',
            }));
        }

        if (needLeftPoints) {
            hrefs.push(new Href({
                text: String(first),
                href: hrefBase + String(first),
                classes: 'paginate_href',
                id: 'paginate_first',
            }));
            hrefs.push(new Href({
                text: '...',
                href: '#',
                classes: 'paginate_href paginate_disabled-href',
                id: 'paginate_left-points',
            }));
        }

        const delta = Math.floor((freeSpace - 1) / 2);
        let start = current - delta;
        if (start < first) start = first;

        let stop = current + delta;
        if (stop > last) stop = last;

        for (let i = start; i <= stop; i++) {
            const classes = 'paginate_href'
                + ((i === current) ? ' paginate_current' : '');
            hrefs.push(new Href({
                text: String(i),
                href: hrefBase + String(i),
                id: 'paginate_href-' + String(i),
                classes,
            }));
        }

        if (needRightPoints) {
            hrefs.push(new Href({
                text: '...',
                href: '#',
                classes: 'paginate_href paginate_disabled-href',
                id: 'paginate_right-points',
            }));
            hrefs.push(new Href({
                text: String(last),
                href: hrefBase + String(last),
                classes: 'paginate_href',
                id: 'paginate_last',
            }));
        }

        if (needRightShevron) {
            hrefs.push(new Href({
                text: '>',
                href: hrefBase + String(current + 1),
                classes: 'paginate_href',
                id: 'paginate_right-shevron',
            }));
        }

        return hrefs;
    }
}

