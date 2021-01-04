import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { getSelectedImageWidget } from './checkSelected';
import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository';

export default class SimpleBtnToolbar extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ WidgetToolbarRepository ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SimpleBtnToolbar';
	}

	/**
	 * @inheritDoc
	 */
	afterInit() {
		const editor = this.editor;
		const t = editor.t;
		const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

		widgetToolbarRepository.register( 'simpleBtn', {
			ariaLabel: t( 'Image toolbar' ),
			items: editor.config.get( 'simpleBtn.toolbar' ) || [],
			getRelatedElement: getSelectedImageWidget
		} );
	}
}
