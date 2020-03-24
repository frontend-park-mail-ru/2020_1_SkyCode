import Component from '../../Component.js';
import category from '../category/category.js';


export default class categoryBar extends Component{
    constructor({categoryArr, classes = 'categoryBar'}) {
        super();
        this.addClasses(classes);

        let categories = [];
        for (let categoryData of categoryArr) {
            categories.push(new category({
                src: categoryData.src,
                text: categoryData.text,
                classes: 'category-bar__category',
            }));
        }

        this.addTemplateData({categories}, true);
    }
}