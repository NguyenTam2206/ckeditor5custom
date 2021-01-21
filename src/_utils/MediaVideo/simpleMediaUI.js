import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import iconCamera from './cameraIcon.svg'
export default class SimpleMediaUI extends Plugin {
    init() {
        const editor = this.editor;
        const t = editor.t;

        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'simpleMedia', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertSimpleMedia' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                //label: t( 'Simple Media' ),
                withText: true,
                tooltip: true,
                icon: iconCamera
            } );
            buttonView.tooltip = () => `Chọn video từ media`
            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => {
                sessionStorage.setItem("openMedia", true);
                sessionStorage.setItem("typeOpen", 'Video');
                editor.execute( 'insertSimpleMedia' ) 
            });

            return buttonView;
        } );
    }
}