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
            isBlock: true,
            allowWhere: '$block',
            allowAtrributes: [ 'style' ]
        })
        schema.register('contentImage' , {
            isLimit: true,
            isBlock: true,
            isObject: true,

            allowIn: 'simpleBtn',

            allowContentOf: '$block'
        })
        // schema.register('captionImage' , {
        //     isLimit: true,
        //     isBlock: true,
        //     isObject: true,

        //     allowIn: 'simpleBtn',

        //     allowContentOf: '$block'
        // })
        schema.register('captionImage' , {
            isLimit: true,
            isObject: true,
            
            allowIn: 'simpleBtn',

            allowContentOf: '$block'
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
                const section = viewWriter.createContainerElement( 'div', { class: 'my-custom-box' , style: "display:inline-block"});

                return toWidget( section, viewWriter, { label: 'simple btn widget' } );
            }
        } );
        conversion.for('upcast').elementToElement( {
            model: 'contentImage',
            view: {
                name: 'div',
                classes: 'image-inside'
            }
        } )
        conversion.for('dataDowncast').elementToElement( {
            model: 'contentImage',
            view: {
                name: 'div',
                classes: 'image-inside'
            }
        } )
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'contentImage',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createAttributeElement
                ( 'div', 
                { class: 'image-inside' , 
                style: "background-size: cover; background-repeat: no-repeat; background-position: center center"});

                return toWidgetEditable( section, viewWriter);
            }
        } )

        conversion.for('upcast').elementToElement( {
            model: 'captionImage',
            view: {
                name: 'div',
                classes: 'text-caption'
            }
        } )
        conversion.for('dataDowncast').elementToElement( {
            model: 'captionImage',
            view: {
                name: 'div',
                classes: 'text-caption'
            }
        } )
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'captionImage',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createEditableElement
                ( 'div', 
                { class: 'text-caption' , 
                style: "text-align: center;"});

                return toWidgetEditable( section, viewWriter);
            }
        } );
    }
}
