import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertSimpleMediaCommand from './simpleMediaCommand'
import MediaRegistry from '../NewMedia/mediaregistry';
import { toMediaWidget, createMediaFigureElement } from './../NewMedia/utils';
import { modelToViewUrlAttributeConverter } from './../NewMedia/converters';
import '../NewMedia/theme/mediaembedediting.css'

export default class SimpleMediaEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }
    constructor( editor ) {
		super( editor );

		editor.config.define( 'mediaEmbed', {
			providers: [
				{
					name: 'ngn',
					url: /^ntv-api\.ngn\.com\.vn\/media\/(\w+)/,
					html: match => {
						const id = match[ 1 ];
						return (
							'<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
								`<iframe src="http://ntv-api.ngn.com.vn/media/${ id }.mp4" ` +
									'style="position: absolute; width: 50%; height: 50%; top: 0; left: 0;" ' +
									'frameborder="0" width="480" height="270" allowfullscreen controls allow="autoplay">' +
								'</iframe>' +
							'</div>'
						);
					}
				},
			]
		} );
		this.registry = new MediaRegistry( editor.locale, editor.config.get( 'mediaEmbed' ) );
	}
    init() {
        const registry = this.registry
        this._defineSchema()
        this._defineConverters(registry)

        this.editor.commands.add( 'insertSimpleMedia', new InsertSimpleMediaCommand( this.editor ) );
        
    }
    _defineSchema() {                                                          // ADDED
        const schema = this.editor.model.schema;

        schema.register( 'simpleMedia', {
            //isObject: true,
            //allowWhere: '$block'
            isObject: true,
			isBlock: true,
			allowWhere: '$block',
			allowAttributes: [ 'url' ]
        } );

        schema.register( 'simpleMediaWrapper', {
            isLimit: true,
            allowIn: 'simpleMedia',
            allowContentOf: '$block'
        } );
        schema.register( 'simpleMediaWrapperContent', {
            isLimit: true,
            allowIn: 'simpleMediaWrapper',
            allowContentOf: '$block'
        } );
        schema.register( 'simpleMediaContent', {
            isLimit: true,
            allowIn: 'simpleMediaWrapperContent',
            allowContentOf: '$block'
        } );

        schema.register( 'simpleMediaDescription', {
            isLimit: true,
            allowIn: 'simpleMedia',
            allowContentOf: '$block'
        } );
    }
    _defineConverters(registry) {   
        let i = 0;
        let temp = false;

        const t = this.editor.t;                                        // ADDED
        const conversion = this.editor.conversion;
        const renderMediaPreview = this.editor.config.get( 'mediaEmbed.previewsInData' );
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleMedia',
            view: {
                name: 'figure',
                classes: 'simpleMedia media'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleMedia',
            view: renderContainerVideoDowncast()
        } );
        function renderContainerVideoDowncast() {
            return ( modelAttributeValue, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'figure', { 
                    class: 'simpleMedia media',
                    style: 'margin-right: 10px'
                } );
                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        }
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMedia',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'figure', { 
                    class: 'simpleMedia media',
                    style: ''
                } );
                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );
        ////--WrapperVideo--////
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleMediaWrapper',
            view: {
                name: 'div',
                classes: 'simpleMediaWrapper ck-media__wrapper'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleMediaWrapper',
            view: {
                name: 'div',
                classes: 'simpleMediaWrapper ck-media__wrapper'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMediaWrapper',
            view: ( modelElement, { writer: viewWriter } ) => {
                //const section = viewWriter.createContainerElement( 'div', { class: 'simpleMediaWrapper ck-media__wrapper' } );
                const section = viewWriter.createAttributeElement( 'div', { class: 'simpleMediaWrapper ck-media__wrapper' } );
                return toWidgetEditable( section, viewWriter, { label: 'simple box widget' } );
            }
        } );
        ////--WrapperVideoContent--////
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleMediaWrapperContent',
            view: {
                name: 'div',
                classes: 'simpleMediaWrapperContent'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleMediaWrapperContent',
            view: {
                name: 'div',
                classes: 'simpleMediaWrapperContent'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMediaWrapperContent',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'div', 
                { 
                    class: 'simpleMediaWrapperContent',
                    style: ''
                } );

                return toWidgetEditable( section, viewWriter, { label: 'simple box widget' } );
            }
        } );
        ////--VideoContent--////
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleMediaContent',
            view: {
                name: 'iframe',
                classes: 'simpleMediaContent'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleMediaContent',
            view:  renderDownCastForVideo()
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMediaContent',
            view: ( modelElement, { writer: viewWriter } ) => {
                i = 0
                temp = true
                const section = viewWriter.createContainerElement( 'iframe', 
                { 
                    class: 'simpleMediaContent',
                    src: 'http://ntv-api.ngn.com.vn/media/600a7b1b664f986be2c54dd7_2021-01-22%2014-12-17.mp4',
                    url: true,
                    allowfullscreen: true,
                    controls: true,
                    allow: 'autoplay'
                } );
                return toWidgetEditable( section, viewWriter, { label: 'simple222 box widget' } );
            }
        } );
        ////--Description--////
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
                classes: 'text-caption',
            }
        } )
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleMediaDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createEditableElement( 'div', 
                { 
                    class: 'text-caption', 
                    style: "text-align: center;"
                });

                return toWidgetEditable( section, viewWriter);
            }
        } );

        function renderDownCastForVideo() {
            return ( modelAttributeValue, { writer } ) => {
                const length = document.getElementsByClassName('simpleMedia').length
                for(let k = 0; k < document.getElementsByClassName('simpleMedia').length; k++) {
                    if(document.getElementsByClassName('simpleMediaContent')[k].src == "http://ntv-api.ngn.com.vn/media/600a7b1b664f986be2c54dd7_2021-01-22%2014-12-17.mp4") {
                        sessionStorage.setItem('allocationOfNewVid', k)
                    }
                }
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
                if(document.getElementsByClassName('simpleMediaContent')[i - 1] == undefined) {
                    return writer.createContainerElement( 'iframe', {
                        src: '',
                        class: 'simpleMediaContent'
                    } , { priority: 7 })
                }
                // return writer.createAttributeElement( 'img', {
                //     src: document.getElementsByClassName('image-inside')[i - 1].src,
                //     style: `width:${document.getElementsByClassName('image-inside')[i - 1].style.width};
                //             height:${document.getElementsByClassName('image-inside')[i - 1].style.height};`,
                //     class: 'image-inside'
                // } , { priority: 7 })
                return writer.createContainerElement( 'iframe', {
                    src: document.getElementsByClassName('simpleMediaContent')[i - 1].src,
                    // style: `height: 100%; width: 100%; object-fit: contain`,
                    class: 'simpleMediaContent'
                } , { priority: 7 })
            }
        }    
    }
}