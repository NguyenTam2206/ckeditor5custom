import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import { normalizeImageStyles } from '../toolbar/toolbarIcon'

import '../style.css';

export default class SimpleBtnStyleUI extends Plugin {
	static get pluginName() {
		return 'SimpleBtnStyleUI';
	}

	get localizedDefaultStylesTitles() {
		const t = this.editor.t;

		return {
			'Full size image': t( 'Full size image' ),
			'Side image': t( 'Side image' ),
			'Left aligned image': t( 'Left aligned image' ),
			'Centered image': t( 'Centered image' ),
			'Right aligned image': t( 'Right aligned image' )
		};
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const configuredStyles = editor.config.get( 'simpleBtn.styles' );
		const translatedStyles = translateStyles( normalizeImageStyles( configuredStyles ), this.localizedDefaultStylesTitles );

		for ( const style of translatedStyles ) {
			this._createButton( style );
		}
	}

	/**
	 * Creates a button for each style and stores it in the editor {@link module:ui/componentfactory~ComponentFactory ComponentFactory}.
	 *
	 * @private
	 * @param {module:image/imagestyle/imagestyleediting~ImageStyleFormat} style
	 */
	_createButton( style ) {
		const editor = this.editor;

		const componentName = `simpleBtnStyle:${ style.name }`;
		editor.ui.componentFactory.add( componentName, locale => {
			const command = editor.commands.get( 'simpleBtnStyle' );
			const view = new ButtonView( locale );

			view.set( {
				label: style.title,
				icon: style.icon,
				tooltip: true,
				isToggleable: true
			} );

			view.bind( 'isEnabled' ).to( command, 'isEnabled' );
			view.bind( 'isOn' ).to( command, 'value', value => value === style.name );

			this.listenTo( view, 'execute', () => {
				editor.execute( 'simpleBtnStyle', { value: style.name } );
				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}

function translateStyles( styles, titles ) {
	for ( const style of styles ) {
		// Localize the titles of the styles, if a title corresponds with
		// a localized default provided by the plugin.
		if ( titles[ style.title ] ) {
			style.title = titles[ style.title ];
		}
	}

	return styles;
}