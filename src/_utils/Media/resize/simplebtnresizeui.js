import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import SimpleBtnResizeEditing from './simplebtnresizeediting';
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import DropdownButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/dropdownbuttonview';

import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

import CKEditorError from '@ckeditor/ckeditor5-utils/src/ckeditorerror';

import iconSmall from '@ckeditor/ckeditor5-core/theme/icons/object-size-small.svg';
import iconMedium from '@ckeditor/ckeditor5-core/theme/icons/object-size-medium.svg';
import iconLarge from '@ckeditor/ckeditor5-core/theme/icons/object-size-large.svg';
import iconFull from '@ckeditor/ckeditor5-core/theme/icons/object-size-full.svg';

const RESIZE_ICONS = {
	small: iconSmall,
	medium: iconMedium,
	large: iconLarge,
	original: iconFull
};

export default class SimpleResizeButtons extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ SimpleBtnResizeEditing ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SimpleResizeButtons';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		this._resizeUnit = editor.config.get( 'simpleBtn.resizeUnit' );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const options = editor.config.get( 'simpleBtn.resizeOptions' );
		const command = editor.commands.get( 'simpleBtnResize' );

		this.bind( 'isEnabled' ).to( command );
        //const options = [null, '50%', '75%']
		for ( const option of options ) {
			this._registerImageResizeButton( option );
		}

		this._registerImageResizeDropdown( options );
	}

	/**
	 * A helper function that creates a standalone button component for the plugin.
	 *
	 * @private
	 * @param {module:image/imageresize/imageresizebuttons~ImageResizeOption} resizeOption A model of the resize option.
	 */
	_registerImageResizeButton( option ) {
		const editor = this.editor;
		const { name, value, icon } = option;
		const optionValueWithUnit = value ? value + this._resizeUnit : null;
        
		editor.ui.componentFactory.add( name, locale => {
			const button = new ButtonView( locale );
			const command = editor.commands.get( 'simpleBtnResize' );
			const labelText = this._getOptionLabelValue( option, true );

			if ( !RESIZE_ICONS[ icon ] ) {
				throw new CKEditorError(
					'imageresizebuttons-missing-icon',
					editor,
					option
				);
			}

			button.set( {
				label: labelText,
				icon: RESIZE_ICONS[ icon ],
				tooltip: labelText,
				isToggleable: true
			} );

			button.bind( 'isEnabled' ).to( this );
			button.bind( 'isOn' ).to( command, 'value', getIsOnButtonCallback( optionValueWithUnit ) );

			this.listenTo( button, 'execute', () => {
				editor.execute( 'simpleBtnResize', { width: optionValueWithUnit } );
			} );

			return button;
		} );
	}

	_registerImageResizeDropdown( options ) {
		const editor = this.editor;
		const t = editor.t;
		const originalSizeOption = options.find( option => !option.value );
        // originalSizeOption = {
        //     name: "simpleBtnResize:original",
        //     value: null
        // }
		// Register dropdown.
		editor.ui.componentFactory.add( 'simpleBtnResize', locale => {
			const command = editor.commands.get( 'simpleBtnResize' );
			const dropdownView = createDropdown( locale, DropdownButtonView );
			const dropdownButton = dropdownView.buttonView;

			dropdownButton.set( {
				tooltip: t( 'Chỉnh cỡ ảnh' ),
				commandValue: originalSizeOption.value,
				icon: iconMedium,
				isToggleable: true,
				label: this._getOptionLabelValue( originalSizeOption ),
				withText: true,
				class: 'ck-resize-image-button'
			} );

			dropdownButton.bind( 'label' ).to( command, 'value', commandValue => {
				if ( commandValue && commandValue.width ) {
					return commandValue.width;
				} else {
					return this._getOptionLabelValue( originalSizeOption );
				}
			} );
			dropdownView.bind( 'isOn' ).to( command );
			dropdownView.bind( 'isEnabled' ).to( this );

			addListToDropdown( dropdownView, this._getResizeDropdownListItemDefinitions( options, command ) );

			dropdownView.listView.ariaLabel = t( 'Danh sách cỡ ảnh' );

			// Execute command when an item from the dropdown is selected.
			this.listenTo( dropdownView, 'execute', evt => {
				editor.execute( evt.source.commandName, { width: evt.source.commandValue } );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}

	_getOptionLabelValue( option, forTooltip ) {
		const t = this.editor.t;

		if ( option.label ) {
			return option.label;
		} else if ( forTooltip ) {
			if ( option.value ) {
				return t( 'Chỉnh kích cỡ về %0', option.value + this._resizeUnit );
			} else {
				return t( 'Chỉnh về kích cỡ gốc' );
			}
		} else {
			if ( option.value ) {
				return option.value + this._resizeUnit;
			} else {
				return t( 'Kích cỡ gốc' );
			}
		}
	}

	_getResizeDropdownListItemDefinitions( options, command ) {
		const itemDefinitions = new Collection();

		options.map( option => {
			const optionValueWithUnit = option.value ? option.value + this._resizeUnit : null;
			const definition = {
				type: 'button',
				model: new Model( {
					commandName: 'simpleBtnResize',
					commandValue: optionValueWithUnit,
					label: this._getOptionLabelValue( option ),
					withText: true,
					icon: null
				} )
			};

			definition.model.bind( 'isOn' ).to( command, 'value', getIsOnButtonCallback( optionValueWithUnit ) );

			itemDefinitions.add( definition );
		} );

		return itemDefinitions;
	}
}

function getIsOnButtonCallback( value ) {
	return commandValue => {
		if ( value === null && commandValue === value ) {
			return true;
		}

		return commandValue && commandValue.width === value;
	};
}
