import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SimpleBtnStyleCommand from './simplebtnstylecommand';
import { viewToModelStyleAttribute, modelToViewStyleAttribute } from './converters';
import { normalizeImageStyles } from '../toolbar/toolbarIcon';

export default class SimpleBtnStyleEditing extends Plugin {
	static get pluginName() {
		return 'SimpleBtnStyleEditing';
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const data = editor.data;
		const editing = editor.editing;

		// Define default configuration.
		editor.config.define( 'simpleBtn.styles', [ 'full', 'side' ] );

		// Get configuration.
		const styles = normalizeImageStyles( editor.config.get( 'simpleBtn.styles' ) );

		// Allow imageStyle attribute in image.
		// We could call it 'style' but https://github.com/ckeditor/ckeditor5-engine/issues/559.
		schema.extend( 'simpleBtn', { allowAttributes: 'simpleBtnStyle' } );

		// Converters for imageStyle attribute from model to view.
		const modelToViewConverter = modelToViewStyleAttribute( styles );
		editing.downcastDispatcher.on( 'attribute:simpleBtnStyle:simpleBtn', modelToViewConverter );
		data.downcastDispatcher.on( 'attribute:simpleBtnStyle:simpleBtn', modelToViewConverter );

		// Converter for figure element from view to model.
		data.upcastDispatcher.on( 'element:figure', viewToModelStyleAttribute( styles ), { priority: 'low' } );

		// Register imageStyle command.
		editor.commands.add( 'simpleBtnStyle', new SimpleBtnStyleCommand( editor, styles ) );
	}
}
