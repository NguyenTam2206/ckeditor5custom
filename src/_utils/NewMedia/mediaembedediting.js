/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media-embed/mediaembedediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


import MediaEmbedCommand from './mediaembedcommand';
import MediaRegistry from './mediaregistry';
import { toMediaWidget, createMediaFigureElement } from './utils';
import { modelToViewUrlAttributeConverter } from './converters';
import './theme/mediaembedediting.css';

/**
 * The media embed editing feature.
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaEmbedEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'MediaEmbedEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'mediaEmbed', {
			providers: [
				{
					name: 'ngn',
					url: /^ntv-api\.ngn\.com\.vn\/media\/(\w+)/,
					html: match => {
						const id = match[ 1 ];
						console.log('im id ', id)
						console.log('im match ', match)
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

		/**
		 * The media registry managing the media providers in the editor.
		 *
		 * @member {module:media-embed/mediaregistry~MediaRegistry} #registry
		 */
		this.registry = new MediaRegistry( editor.locale, editor.config.get( 'mediaEmbed' ) );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const t = editor.t;
		const conversion = editor.conversion;
		const renderMediaPreview = editor.config.get( 'mediaEmbed.previewsInData' );
		const registry = this.registry;

		editor.commands.add( 'mediaEmbed', new MediaEmbedCommand( editor ) );

		// Configure the schema.
		schema.register( 'media', {
			isObject: true,
			isBlock: true,
			allowWhere: '$block',
			allowAttributes: [ 'url' ]
		} );

		// Model -> Data
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'media',
			view: ( modelElement, { writer } ) => {
				const url = modelElement.getAttribute( 'url' );

				return createMediaFigureElement( writer, registry, url, {
					renderMediaPreview: url && renderMediaPreview
				} );
			}
		} );

		// Model -> Data (url -> data-oembed-url)
		conversion.for( 'dataDowncast' ).add(
			modelToViewUrlAttributeConverter( registry, {
				renderMediaPreview
			} ) );

		// Model -> View (element)
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'media',
			view: ( modelElement, { writer } ) => {
				const url = modelElement.getAttribute( 'url' );
				const figure = createMediaFigureElement( writer, registry, url, {
					renderForEditingView: true
				} );
				return toMediaWidget( figure, writer, t( 'media widget' ) );
			}
		} );

		// Model -> View (url -> data-oembed-url)
		conversion.for( 'editingDowncast' ).add(
			modelToViewUrlAttributeConverter( registry, {
				renderForEditingView: true
			} ) );

		// View -> Model (data-oembed-url -> url)
		conversion.for( 'upcast' )
			// Upcast semantic media.
			.elementToElement( {
				view: {
					name: 'oembed',
					attributes: {
						url: true
					}
				},
				model: ( viewMedia, { writer } ) => {
					const url = viewMedia.getAttribute( 'url' );

					if ( registry.hasMedia( url ) ) {
						return writer.createElement( 'media', { url } );
					}
				}
			} )
			// Upcast non-semantic media.
			.elementToElement( {
				view: {
					name: 'div',
					attributes: {
						'data-oembed-url': true
					}
				},
				model: ( viewMedia, { writer } ) => {
					const url = viewMedia.getAttribute( 'data-oembed-url' );

					if ( registry.hasMedia( url ) ) {
						return writer.createElement( 'media', { url } );
					}
				}
			} );
	}
}
