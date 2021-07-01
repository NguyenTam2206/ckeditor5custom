import covidEditing from './covidEditing';
import SimpleBtnUI from './covidUI'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Covid extends Plugin {
    static get requires() {
        return [ covidEditing ];
    }
}