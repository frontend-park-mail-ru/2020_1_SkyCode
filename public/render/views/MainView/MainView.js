import Component from '../../Component.js';
import BaseView from '../BaseView/BaseView.js';
import MainViewMainArea from '../../blocks/mainVeiwMainArea/MainViewMainArea.js';
import temp from './MainView.hbs';

class MainView extends Component {
    constructor({actionArr, categoryArr, restaurantArr}) {
        super('', {
            BaseView: new BaseView({
                MainArea: new MainViewMainArea({
                    actionArr,
                    categoryArr,
                    restaurantArr,
                }),
            }),
        });

        this.template = temp;
    }
}

export default MainView;
