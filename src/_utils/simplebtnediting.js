import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import {toWidget, toWidgetEditable} from '@ckeditor/ckeditor5-widget/src/utils'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

import InsertSimpleBtnCommand from './simplebtncommand'

export default class SimpleBtnEditing extends Plugin {
    static get requires() {
        return [ Widget ]
    }
    init() {
        console.log(
            'SimpleBoxEditing#init() got called'
        )

        this._defineSchema()
        this._defineConverters()
        
        this.editor.commands.add('insertSimpleBtn' , new InsertSimpleBtnCommand( this.editor ))
    }
    _defineSchema() {
        const schema = this.editor.model.schema

        schema.register('simpleBtn', {
            isObject: true,
            allowWhere: '$block'
        })
    }
    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for('upcast').elementToElement( {
            model: 'simpleBtn',
            view: {
                name: 'div',
                classes: 'my-custom-box'
            }
        } )
        conversion.for('dataDowncast').elementToElement( {
            model: 'simpleBtn',
            view: {
                name: 'div',
                classes: 'my-custom-box'
            }
        } )
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleBtn',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'div', { class: 'my-custom-box' } );

                return toWidget( section, viewWriter, { label: 'simple btn widget' } );
            }
        } );
    }
}
