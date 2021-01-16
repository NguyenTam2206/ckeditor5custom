import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertSimpleMediaCommand from './simpleMediaCommand'

export default class SimpleMediaEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }
    init() {
        this._defineSchema()
        this._defineConverters()

        this.editor.commands.add( 'insertSimpleMedia', new InsertSimpleMediaCommand( this.editor ) );
    }
    _defineSchema() {                                                          // ADDED
        const schema = this.editor.model.schema;

        schema.register( 'simpleMedia', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'simpleMediaWrapper', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleMedia',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );
        schema.register( 'simpleMediaContent', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleMediaWrapper',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );

        schema.register( 'simpleMediaDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleMedia',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block'
        } );
    }
    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleMedia',
            view: {
                name: 'div',
                classes: 'simpleMedia'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleMedia',
            view: {
                name: 'div',
                classes: 'simpleMedia'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMedia',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'div', { class: 'simpleMedia' } );

                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleMediaWrapper',
            view: {
                name: 'video',
                classes: 'simpleMediaWrapper'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleMediaWrapper',
            view: {
                name: 'video',
                classes: 'simpleMediaWrapper'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMediaWrapper',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'video', 
                { 
                    class: 'simpleMediaWrapper',
                    //style: 'width: 500px; height:500px',
                    //controls
                } );

                return toWidgetEditable( section, viewWriter, { label: 'simple box widget' } );
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleMediaContent',
            view: {
                name: 'source',
                classes: 'simpleMediaContentWebm'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleMediaContent',
            view: {
                name: 'source',
                classes: 'simpleMediaContentWebm'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMediaContent',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'source', 
                { 
                    class: 'simpleMediaContentWebm',
                    src: 'sth',
                    type: 'video/webm'
                } );

                return toWidgetEditable( section, viewWriter, { label: 'simple box widget' } );
            }
        } );

        conversion.for('upcast').elementToElement( {
            model: 'simpleMediaDescription',
            view: {
                name: 'div',
                classes: 'text-caption'
            }
        } )
        conversion.for('dataDowncast').elementToElement( {
            model: 'simpleMediaDescription',
            view: {
                name: 'div',
                classes: 'text-caption'
            }
        } )
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMediaDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createEditableElement
                ( 'div', 
                { 
                    class: 'text-caption', 
                    style: "text-align: center;"
                });

                return toWidgetEditable( section, viewWriter);
            }
        } );
    }
}