import SimpleGridEditing from './simpleGridEditing';
import SimpleGridUI from './simpleGridUI';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class SimpleGrid extends Plugin {
    static get requires() {
        return [ SimpleGridEditing, SimpleGridUI ];
    }
}