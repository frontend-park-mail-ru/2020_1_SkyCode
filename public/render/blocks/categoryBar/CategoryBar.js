import Component from '../../Component.js';
import Category from '../category/Category.js';


export default class CategoryBar extends Component {
    constructor({categoryArr, classes = 'categoryBar'}) {
        super();
        this.addClasses(classes);

        const categories = [];
        for (const categoryData of categoryArr) {
            categories.push(new Category({
                src: categoryData.src,
                text: categoryData.text,
                classes: 'category-bar__category',
            }));
        }

        this.addContextData({categories}, true);
    }
}
