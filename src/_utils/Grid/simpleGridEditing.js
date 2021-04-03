import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
//import DomParser from 'dom-parser';

import InsertSimpleGridCommand from './simpleGridCommand.js';
// import DomParser from 'dom-parser'

export default class SimpleGridEditing extends Plugin {

    static get requires() {                                                    // ADDED
        return [ Widget ];
    }
    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertSimpleGrid', new InsertSimpleGridCommand( this.editor ) );
    }
    _defineSchema() {                                                       // ADDED
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
    _defineConverters() {
        let i = 0;
        let temp = false;
        let countCol1 = 0
        let countCol2 = 0
        let countCol3 = 0
        function remove_first(str, searchstr)       {
            var index = str.indexOf(searchstr);
            if (index === -1) {
                return str;
            }
            return str.slice(0, index) + str.slice(index + searchstr.length);
        }

        //console.log(sessionStorage.getItem('type'))                                                // ADDED
        const conversion = this.editor.conversion;
        function renderDownCastElement() {
            //For Col2
            return ( modelAttributeValue, { writer: viewWriter } ) => {
                const div = viewWriter.createEditableElement( 'div',
                {
                    class: 'simpleGridCol2',
                    style: 'flex: 1'
                } );
                return toWidgetEditable( div, viewWriter );
                // const length = document.getElementsByClassName('simpleGrid').length

                // if(temp == false) {
                //     i = 0
                //     temp = true
                // }
                // if(i < length) {
                //     i++
                // }
                // if(i == length) {
                //     temp = false
                // }
                // //console.log('sesss ' , sessionStorage.getItem('type' + (i)))
                // //console.log('i ' , (i))
                // if ( sessionStorage.getItem('type' + (i)) == 444)
                // {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'flex: 1'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( sessionStorage.getItem('type' + (i)) == 363 )
                // {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'flex: 2'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if(( sessionStorage.getItem('type' + (i)) == 39 )) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'flex: 3'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( ( sessionStorage.getItem('type' + (i)) == 66 )
                //             ||
                //             ( sessionStorage.getItem('type' + (i)) == 93 )
                //         ) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'flex: 1'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // const div = viewWriter.createEditableElement( 'div',
                // {
                //     class: 'simpleGridCol2',
                //     style: 'flex: 1'
                // } );
                // return toWidgetEditable( div, viewWriter );
            }
        }
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleGrid',
            view: {
                name: 'section',
                classes: 'simpleGrid'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleGrid',
            view: renderDownCastForContainer()
            // {
            //     name: 'section',
            //     classes: 'simpleGrid',
            //     style: 'overflow: hidden; display: flex'
            // }
        } );
        function renderDownCastForContainer() {
            return ( modelAttributeValue, { writer: viewWriter } ) => {
                const div = viewWriter.createEditableElement( 'section',
                {
                    class: 'simpleGrid',
                    style: 'overflow: hidden; display: flex'
                } );
                return toWidget( div, viewWriter );
            }
        }
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGrid',
            view: ( modelElement, { writer: viewWriter } ) => {
                i = 0
                temp = true
                const section = viewWriter.createContainerElement( 'section',
                {
                  class: 'simpleGrid',
                  style: "overflow: hidden; display: flex"
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
            view: renderDownCastForCol1()
        } );
        function renderDownCastForCol1() {
            return ( modelAttributeValue, { writer: viewWriter } ) => {
                const div = viewWriter.createEditableElement( 'div',
                {
                    class: 'simpleGridCol1',
                    style: 'flex: 1'
                } );
                return toWidgetEditable( div, viewWriter );
            }
        }
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGridCol1',
            view: ( modelElement, { writer: viewWriter } ) => {
                //For Col1
                const div = viewWriter.createEditableElement( 'div',
                {
                    class: 'simpleGridCol1',
                    style: 'flex: 1'
                } );
                return toWidgetEditable( div, viewWriter );


                // if( sessionStorage.getItem('type') == 444 )
                // {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol1',
                //         style: 'flex: 1'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( sessionStorage.getItem('type') == 363 ) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol1',
                //         style: 'flex: 1'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( sessionStorage.getItem('type') == 66) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol1',
                //         style: 'flex: 1'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( sessionStorage.getItem('type') == 39) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol1',
                //         style: 'flex: 1'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( sessionStorage.getItem('type') == 93) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol1',
                //         style: 'flex: 3'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // const div = viewWriter.createEditableElement( 'div',
                // {
                //     class: 'simpleGridCol1',
                //     style: 'flex: 1'
                // } );
                // return toWidgetEditable( div, viewWriter );
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleGridCol2',
            view: {
                name: 'div',
                classes: 'simpleGridCol2'
            }
        } );
        // conversion.for( 'dataDowncast' ).elementToElement( {
        //     model: 'simpleGridCol2',
        //     view: {
        //         name: 'div',
        //         classes: 'simpleGridCol2'
        //     }
        // } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleGridCol2',
            view: renderDownCastElement()
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGridCol2',
            view: ( modelElement, { writer: viewWriter } ) => {
                // if ( sessionStorage.getItem('type') == 444)
                // {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'float: left; width: 33%'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( sessionStorage.getItem('type') == 363 )
                // {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'float: left; width: 48%'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( ( sessionStorage.getItem('type') == 66 ) ||
                //           ( sessionStorage.getItem('type') == 39 ) ||
                //           ( sessionStorage.getItem('type') == 93 )
                //         ) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'overflow: hidden'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                //--//
                const div = viewWriter.createEditableElement( 'div',
                {
                    class: 'simpleGridCol2',
                    style: 'flex: 1'
                } );
                return toWidgetEditable( div, viewWriter );
                // if ( sessionStorage.getItem('type') == 444)
                // {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'flex: 1'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( sessionStorage.getItem('type') == 363 )
                // {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'flex: 2'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if(( sessionStorage.getItem('type') == 39 )) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'flex: 3'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // else if ( ( sessionStorage.getItem('type') == 66 )
                //            ||
                //           ( sessionStorage.getItem('type') == 93 )
                //         ) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol2',
                //         style: 'flex: 1'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
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
            view: renderDownCastForCol3()
        } );
        function renderDownCastForCol3() {
            return ( modelAttributeValue, { writer: viewWriter } ) => {
                const div = viewWriter.createEditableElement( 'div',
                {
                    class: 'simpleGridCol3',
                    style: 'flex: 1'
                } );
                return toWidgetEditable( div, viewWriter );
            }
        }
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleGridCol3',
            view: ( modelElement, { writer: viewWriter } ) => {
                // if( sessionStorage.getItem('type') == 444 ) {
                //     const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol3',
                //         style: 'float: left; width: 32%'
                //     } );
                //     return toWidgetEditable( div, viewWriter );
                // }
                // const div = viewWriter.createEditableElement( 'div',
                //     {
                //         class: 'simpleGridCol3',
                //         style: 'float: left; width: 24%'
                //     } );
                // return toWidgetEditable( div, viewWriter );
                if( sessionStorage.getItem('type') == 444 ) {
                    const div = viewWriter.createEditableElement( 'div',
                    {
                        class: 'simpleGridCol3',
                        style: 'flex: 1'
                    } );
                    return toWidgetEditable( div, viewWriter );
                }
                const div = viewWriter.createEditableElement( 'div',
                {
                    class: 'simpleGridCol3',
                    style: 'flex: 1'
                } );
                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}
