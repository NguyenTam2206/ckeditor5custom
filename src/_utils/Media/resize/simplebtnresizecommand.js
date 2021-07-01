import Command from '@ckeditor/ckeditor5-core/src/command';
//import { isImage } from '../image/utils';

export default class SimpleBtnResizeCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();

        //tam thoi cho la all true
        this.isEnabled = true
        //should be 
		//this.isEnabled = isImage( element );

		if ( !element || !element.hasAttribute( 'width' ) ) {
			this.value = null;
		} else {
			this.value = {
				width: element.getAttribute( 'width' ),
				height: null
			};
		}
	}

	execute( options ) {
		const model = this.editor.model;
		const imageElement = model.document.selection.getSelectedElement();

		this.value = {
			width: options.width,
			height: null
		};

		if ( imageElement ) {
			model.change( writer => {
				writer.setAttribute( 'width', options.width, imageElement );
			} );
		}
	}
}