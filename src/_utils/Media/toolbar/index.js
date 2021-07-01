import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import BalloonPanelView from '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview'
import { getSelectedImageWidget } from './checkSelected'
import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository'

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
			getRelatedElement: getSelectedImageWidget,
		} );
		// widgetToolbarRepository.register( 'image', {
		// 	ariaLabel: t( 'Image toolbar' ),
		// 	items: editor.config.get( 'image.toolbar' ) || [],
		// 	getRelatedElement: getSelectedImageWidget,
		// } );
	}
}
// export function repositionContextualBalloon( editor ) {
// 	const balloon = editor.plugins.get( 'ContextualBalloon' );
// 	if ( getSelectedImageWidget( editor.editing.view.document.selection ) ) {
// 		const position = getBalloonPositionData( editor );

// 		balloon.updatePosition( position );
// 	}
// }

// export function getBalloonPositionData( editor ) {
// 	const editingView = editor.editing.view;
// 	const defaultPositions = BalloonPanelView.defaultPositions;

// 	return {
// 		target: editingView.domConverter.viewToDom( editingView.document.selection.getSelectedElement() ),
// 		positions: [
// 			defaultPositions.northArrowSouth,
// 			defaultPositions.northArrowSouthWest,
// 			defaultPositions.northArrowSouthEast,
// 			defaultPositions.southArrowNorth,
// 			defaultPositions.southArrowNorthWest,
// 			defaultPositions.southArrowNorthEast
// 		]
// 	};
// }