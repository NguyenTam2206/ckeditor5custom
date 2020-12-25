import SimpleBtnEditing from './simplebtnediting'
import SimpleBtnUI from './simplebtnui'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class SimpleBtn extends Plugin {
    static get requires() {
        return [ SimpleBtnEditing, SimpleBtnUI ]
    }
}