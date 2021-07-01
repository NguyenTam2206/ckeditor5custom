import Command from '@ckeditor/ckeditor5-core/src/command';
//import { isImage } from '../image/utils';

export default class SimpleBtnStyleCommand extends Command {
	constructor( editor, styles ) {
		super( editor );

		this.defaultStyle = false;

		this.styles = styles.reduce( ( styles, style ) => {
			styles[ style.name ] = style;

			if ( style.isDefault ) {
				this.defaultStyle = style.name;
			}

			return styles;
		}, {} );
	}

	/**
	 * @inheritDoc
	 */
	refresh() {
        function isImage( modelElement ) {
            return !!modelElement && modelElement.is( 'element', 'simpleBtn' );
        }
		const element = this.editor.model.document.selection.getSelectedElement();

		this.isEnabled = isImage( element );
		if ( !element ) {
			this.value = false;
		} 
		else if ( element.hasAttribute( 'simpleBtnStyle' ) ) {
			const attributeValue = element.getAttribute( 'simpleBtnStyle' );
			this.value = this.styles[ attributeValue ] ? attributeValue : false;
		} else {
			this.value = this.defaultStyle;
		}
	}
	execute( options ) {
		const styleName = options.value;

		const model = this.editor.model;
		const imageElement = model.document.selection.getSelectedElement();

		model.change( writer => {
			if ( this.styles[ styleName ].isDefault ) {
				writer.removeAttribute( 'simpleBtnStyle', imageElement );
			} else {
				writer.setAttribute( 'simpleBtnStyle', styleName, imageElement );
			}
		} );
	}
}