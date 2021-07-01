import SimpleMediaEditing from './simpleMediaEditing';
import SimpleMediaUI from './simpleMediaUI';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class SimpleMedia extends Plugin {
    static get requires() {
        return [ SimpleMediaEditing, SimpleMediaUI ];
    }
}