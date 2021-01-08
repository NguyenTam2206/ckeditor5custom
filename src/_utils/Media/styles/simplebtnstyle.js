import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SimpleBtnStyleEditing from './simplebtnstyleediting';
import SimpleBtnStyleUI from './simplebtnstyleui';

export default class SimpleBtnStyle extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ SimpleBtnStyleEditing, SimpleBtnStyleUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SimpleBtnStyle';
	}
}
