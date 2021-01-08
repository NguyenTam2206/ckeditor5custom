import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import MediaIcon from './icons/MediaIcon.svg'
import {normalizeImageStyles} from './toolbar/toolbarIcon'
 import './style.css'
export default class SimpleBtnUI extends Plugin {
    init() {
        const editor = this.editor;
        const t = editor.t;

        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'simpleBtn', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertSimpleBtn' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                //label: t( 'Media' ),
                withText: true,
                tooltip: true,
                icon: MediaIcon
            } );
            buttonView.tooltip = () => `Choose Image From Media.`
            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () => {
                sessionStorage.setItem('openMedia', true)
                editor.execute('insertSimpleBtn', { width: '', newImg: true })
            })
            // this.listenTo(buttonView, 'execute', () => {
            //     sessionStorage.setItem('openMedia', true)
            //     editor.execute('insertSimpleBtn')
            // })
            return buttonView;
        } );
    }
}
//     get localizedDefaultStylesTitles() {
// 		const t = this.editor.t;

// 		return {
// 			'Side image': t( 'Side image' ),
// 			'Left aligned image': t( 'Left aligned image' ),
// 			'Centered image': t( 'Centered image' ),
// 			'Right aligned image': t( 'Right aligned image' )
// 		};
// 	}
//     init() {
//         const editor = this.editor;
//         const t = editor.t;
//         const configuredStyles = editor.config.get( 'simpleBtn.styles' );

// 		const translatedStyles = translateStyles( normalizeImageStyles( configuredStyles ), this.localizedDefaultStylesTitles );

// 		for ( const style of translatedStyles ) {
//             this._createButton( style );
// 		}
//         // The "simpleBox" button must be registered among the UI components of the editor
//         // to be displayed in the toolbar.
//         editor.ui.componentFactory.add( 'simpleBtn', locale => {
//             // The state of the button will be bound to the widget command.
//             const command = editor.commands.get( 'insertSimpleBtn' );

//             // The button will be an instance of ButtonView.
//             const buttonView = new ButtonView( locale );

//             buttonView.set( {
//                 // The t() function helps localize the editor. All strings enclosed in t() can be
//                 // translated and change when the language of the editor changes.
//                 //label: t( 'Media' ),
//                 withText: true,
//                 tooltip: true,
//                 icon: MediaIcon
//             } );
//             buttonView.tooltip = () => `Choose Image From Media.`
//             // Bind the state of the button to the command.
//             buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

//             // Execute the command when the button is clicked (executed).
//             this.listenTo(buttonView, 'execute', () => {
//                 sessionStorage.setItem('openMedia', true)
//                 editor.execute('insertSimpleBtn', { width: '', newImg: true })
//             })
//             // this.listenTo(buttonView, 'execute', () => {
//             //     sessionStorage.setItem('openMedia', true)
//             //     editor.execute('insertSimpleBtn')
//             // })
//             return buttonView;
//         } );
//     }
//     _createButton( style ) {
// 		const editor = this.editor;

// 		const componentName = `imageStyle:${ style.name }`;

// 		editor.ui.componentFactory.add( componentName, locale => {
// 			const command = editor.commands.get( 'imageStyle' );
// 			const view = new ButtonView( locale );

// 			view.set( {
// 				label: style.title,
// 				icon: style.icon,
// 				tooltip: true,
// 				isToggleable: true
// 			} );

// 			view.bind( 'isEnabled' ).to( command, 'isEnabled' );
// 			view.bind( 'isOn' ).to( command, 'value', value => value === style.name );

// 			this.listenTo( view, 'execute', () => {
// 				editor.execute( 'insertSimpleBtn', { styleImg: style.name, newImg: false } );
// 				editor.editing.view.focus();
// 			} );

// 			return view;
// 		} );
// 	}
// }

// function translateStyles( styles, titles ) {
// 	for ( const style of styles ) {
// 		// Localize the titles of the styles, if a title corresponds with
// 		// a localized default provided by the plugin.
// 		if ( titles[ style.title ] ) {
// 			style.title = titles[ style.title ];
// 		}
// 	}

// 	return styles;
// }