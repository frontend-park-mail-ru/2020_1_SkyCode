import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import Input from '../../elements/input/Input.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class ProfileAvatarArea extends Component {
    constructor({classes, data}) {
        super(classes, {
            Image: new Img({
                classes: 'profile-avatar-area__image',
                src: `/images/${data.User.profile_photo}`,
            }),
            AvatarInput: new Input({
                classes: 'profile-avatar-area__image-input',
                id: 'profile-avatar-area__image-input',
                type: 'file',
                value: 'xxx',
            })
        });

    }

    bind() {
        this.context.AvatarInput.domElement.addEventListener('change', () => {
            const img = this.context.AvatarInput.domElement.files[0];
            console.log(img);
            let formData = new FormData();
            formData.append('avatar', img);
            EventBus.publish('avatar-update', formData);
        });
    }
}