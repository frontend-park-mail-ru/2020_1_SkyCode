import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import Input from '../../elements/input/Input.js';

export default class ProfileAvatarArea extends Component {
    constructor({classes, avatar}) {
        super(classes, {
            Image: new Img({
                classes: 'profile-avatar-area__image',
                src: avatar,
            }),
            AvatarInput: new Input({
                classes: 'profile-avatar-area__image-input',
                type: 'file',
            })
        });
    }
}