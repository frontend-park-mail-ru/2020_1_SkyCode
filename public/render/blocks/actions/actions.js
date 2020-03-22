import Block from '../../Block.js';

export default class actions extends Block{
    constructor({classes = 'actions', actions}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({actions}, false);
    }
}