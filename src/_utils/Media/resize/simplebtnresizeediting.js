import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SimpleBtnResizeCommand from './simplebtnresizecommand';

export default class SimpleBtnResizeEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SimpleBtnResizeEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'simpleBtn', {
			resizeUnit: '%',
			resizeOptions: [ {
				name: 'simpleBtnResize:original',
				value: null,
				icon: 'original'
			},
			{
				name: 'simpleBtnResize:25',
				value: '25',
				icon: 'small'
			},
			{
				name: 'simpleBtnResize:50',
				value: '50',
				icon: 'medium'
			},
			{
				name: 'simpleBtnResize:75',
				value: '75',
				icon: 'large'
			} ]
		} );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const command = new SimpleBtnResizeCommand( editor );

		this._registerSchema();
		this._registerConverters();

		editor.commands.add( 'simpleBtnResize', command );
	}

	/**
	 * @private
	 */
	_registerSchema() {
		this.editor.model.schema.extend( 'simpleBtn', { allowAttributes: 'simpleBtnStyle' } );
		this.editor.model.schema.setAttributeProperties( 'width', {
			isFormatting: true
		} );
	}

	/**
	 * Registers image resize converters.
	 *
	 * @private
	 */
	_registerConverters() {
		const editor = this.editor;

		// Dedicated converter to propagate image's attribute to the img tag.
		editor.conversion.for( 'downcast' ).add( dispatcher =>
			dispatcher.on( 'attribute:simpleBtnStyle:simpleBtn', ( evt, data, conversionApi ) => {
				if ( !conversionApi.consumable.consume( data.item, evt.name ) ) {
					return;
				}

				const viewWriter = conversionApi.writer;
				const figure = conversionApi.mapper.toViewElement( data.item );

				if ( data.attributeNewValue !== null ) {
					viewWriter.setStyle( 'width', data.attributeNewValue, figure );
					viewWriter.addClass( 'image_resized', figure );
				} else {
					viewWriter.removeStyle( 'width', figure );
					viewWriter.removeClass( 'image_resized', figure );
				}
			} )
		);

		editor.conversion.for( 'upcast' )
			.attributeToAttribute( {
				view: {
					name: 'figure',
					styles: {
						width: /.+/
					}
				},
				model: {
					key: 'width',
					value: viewElement => viewElement.getStyle( 'width' )
				}
			} );
	}
}