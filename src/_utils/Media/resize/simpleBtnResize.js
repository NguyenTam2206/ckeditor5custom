import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SimpleBtnResizeButtons from './simplebtnresizeui';
import SimpleBtnResizeEditing from './simplebtnresizeediting';

import './imageresize.css';

export default class SimpleBtnResize extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ SimpleBtnResizeEditing, SimpleBtnResizeButtons ];
	}

	static get pluginName() {
		return 'SimpleBtnResize';
	}
}