import MainView from '../MainView/MainView.js';
import {actions, categories} from '../../../mocks.js';

const mv = new MainView({actionArr: actions, categoryArr: categories});
document.body.innerHTML = (mv.HTML());
mv.bind();
