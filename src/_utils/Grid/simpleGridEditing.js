import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertSimpleGridCommand from './simpleGridCommand.js'; 

export default class SimpleGridEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }
    init() {
        console.log( 'SimpleGridEditing#init() got called' );

        this._defineSchema();  
        this._defineConverters();   

        this.editor.commands.add( 'insertSimpleGrid', new InsertSimpleGridCommand( this.editor ) );
    }
    _defineSchema() {                                                          // ADDED
        const schema = this.editor.model.schema;

        schema.register( 'simpleGrid', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'simpleGridCol1', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleGrid',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$root'
        } );

        schema.register( 'simpleGridCol2', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleGrid',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.register( 'simpleGridCol3', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleGrid',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( ( context.endsWith( 'simpleGridCol1' ) || context.endsWith( 'simpleGridCol2') ) 
                                            && childDefinition.name == 'simpleGrid' )
            {
                return false;
            }
        } );
    }
    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleGrid',
            view: {
                name: 'section',
                classes: 'simpleGrid'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleGrid',
            view: {
                name: 'section',
                classes: 'simpleGrid'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGrid',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', 
                { 
                  class: 'simpleGrid', 
                  style: "overflow: hidden" 
                } );

                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );
        ///--///
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleGridCol1',
            view: {
                name: 'div',
                classes: 'simpleGridCol1'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleGridCol1',
            view: {
                name: 'div',
                classes: 'simpleGridCol1'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGridCol1',
            view: ( modelElement, { writer: viewWriter } ) => {
                ////Temp worked
                if( sessionStorage.getItem('type') == 444 )
                {
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol1',
                        style: 'float: left; width: 31%'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
                else if ( sessionStorage.getItem('type') == 363 ) {
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol1',
                        style: 'float: left; width: 24%'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
                else if ( sessionStorage.getItem('type') == 66) {
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol1',
                        style: 'float: left; width: 50%'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
                else if ( sessionStorage.getItem('type') == 39) {
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol1',
                        style: 'float: left; width: 24%'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
                else if ( sessionStorage.getItem('type') == 93) {
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol1',
                        style: 'float: left; width: 72%'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleGridCol2',
            view: {
                name: 'div',
                classes: 'simpleGridCol2'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleGridCol2',
            view: {
                name: 'div',
                classes: 'simpleGridCol2'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGridCol2',
            view: ( modelElement, { writer: viewWriter } ) => {
                if ( sessionStorage.getItem('type') == 444)
                {
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol2',
                        style: 'float: left; width: 33%'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
                else if ( sessionStorage.getItem('type') == 363 )
                {
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol2',
                        style: 'float: left; width: 48%'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
                else if ( ( sessionStorage.getItem('type') == 66 ) ||  
                          ( sessionStorage.getItem('type') == 39 ) ||
                          ( sessionStorage.getItem('type') == 93 )
                        ) {
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol2',
                        style: 'overflow: hidden'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleGridCol3',
            view: {
                name: 'div',
                classes: 'simpleGridCol3'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleGridCol3',
            view: {
                name: 'div',
                classes: 'simpleGridCol3'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGridCol3',
            view: ( modelElement, { writer: viewWriter } ) => {
                if( sessionStorage.getItem('type') == 444 ) { 
                    const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol3',
                        style: 'float: left; width: 32%' 
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
                const div = viewWriter.createEditableElement( 'div', 
                    { 
                        class: 'simpleGridCol3',
                        style: 'float: left; width: 24%' 
                    } );
                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}