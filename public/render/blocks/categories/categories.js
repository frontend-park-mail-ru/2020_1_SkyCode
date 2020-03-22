import Block from '../../Block.js';


export default class categories extends Block{
    constructor({categories, classes = 'categories'}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({categories}, false);
    }
}