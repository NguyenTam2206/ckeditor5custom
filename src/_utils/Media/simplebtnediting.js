import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import {toWidget, toWidgetEditable} from '@ckeditor/ckeditor5-widget/src/utils'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

import InsertSimpleBtnCommand from './simplebtncommand'

export default class SimpleBtnEditing extends Plugin {
    static get requires() {
        return [ Widget ]
    }

    init() {
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
            allowAtrributes: [ 'style' ],
            allowContentOf: '$block'
        })
        schema.register('captionImage' , {
            isLimit: true,
            isObject: true,
            
            allowIn: 'simpleBtn',
            
            allowContentOf: '$block'
        })
    }
    _defineConverters() {
        let i = 0;
        let temp = false;
        let j = document.getElementsByClassName('my-custom-box').length;
        const conversion = this.editor.conversion;
        function renderUpcastAttribute( styleAttr ) {
            return viewElement =>  viewElement.getStyle( styleAttr );
        }
        function renderDowncastElement( ) {
            return ( modelAttributeValue, { writer } ) => {
                const length = document.getElementsByClassName('my-custom-box').length

                // if(i < length) {
                //     i++
                // }
                // else i--

                //Attempt
                if(temp == false) {
                    i = 0
                    temp = true
                }
                if(i < length) {
                    i++
                }
                if(i == length) {
                    temp = false
                }

                if(document.getElementsByClassName('image-inside')[i - 1] == undefined) {
                    return writer.createAttributeElement( 'img', {
                        src: '',
                        style: `width:'';
                                height:'';`,
                        class: 'image-inside'
                    } , { priority: 7 })
                }
                return writer.createAttributeElement( 'img', {
                    src: document.getElementsByClassName('image-inside')[i - 1].src,
                    style: `width:${document.getElementsByClassName('image-inside')[i - 1].style.width};
                            height:${document.getElementsByClassName('image-inside')[i - 1].style.height};`,
                    class: 'image-inside'
                } , { priority: 7 })
                
            };
        }
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
                const section = viewWriter.createContainerElement( 
                'div', { class: 'my-custom-box' , style: "display:inline-block"});

                return toWidget( section, viewWriter, { label: 'simple btn widget' } );
            }
        } );
        conversion.for('upcast').elementToElement( {
            model: 'contentImage',
            view: {
                name: 'img',
                classes: 'image-inside'
            }
        } )

        conversion.for('dataDowncast').elementToElement( {
            model: 'contentImage',
            view: renderDowncastElement()
        } )
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'contentImage',
            view: ( modelElement, { writer: viewWriter } ) => {
                i = 0
                temp = true
                console.log('i in edit ', i)
                const section = viewWriter.createAttributeElement
                ( 'img', 
                { class: 'image-inside' , 
                src: null,
                style: `width:'';
                        height:''`});
                return toWidgetEditable( section, viewWriter);
            },
            triggerBy: {
                attributes: [ 'style' ]
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
