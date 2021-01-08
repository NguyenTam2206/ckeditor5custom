import Command from '@ckeditor/ckeditor5-core/src/command'

export default class InsertSimpleBtnCommand extends Command {
    execute( options ) {
        if(options.newImg == true) {
                this.editor.model.change( writer => {
                this.editor.model.insertContent( createSimpleBtn( writer ) )
            })
        }
        else if(options.newImg == false) {
            const model = this.editor.model;
            const imageElement = model.document.selection.getSelectedElement();

            //Temp worked
            // this.value = {
            // 	width: '100px',
            // 	height: null
            // };
            // console.log('im imageElement ', imageElement)
            // if ( imageElement ) {
            // 	model.change( writer => {
            // 		writer.setAttribute( 'width', '100px', imageElement );
            // 	} );
            // }
            this.value = {
                width: options.width,
                height: null
            };
            if ( imageElement ) {
                model.change( writer => {
                    writer.setAttribute( 'width', options.width, imageElement );
                } );
            }
            //Testing
            // if(options.styleImg) {

            // } 
            // else {
            //     this.value = {
            //         width: options.width,
            //         height: null
            //     };
            //     if ( imageElement ) {
            //         model.change( writer => {
            //             writer.setAttribute( 'width', options.width, imageElement );
            //         } );
            //     }
            // }
        }
    }
    refresh() {
        const model = this.editor.model
        const selection = model.document.selection
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition() , 'simpleBtn')

        this.isEnabled = allowedIn !== null

        const element = this.editor.model.document.selection.getSelectedElement()

        if ( !element || !element.hasAttribute( 'width' ) ) {
			this.value = null;
        } 
        else {
			this.value = {
				width: element.getAttribute( 'width' ),
				height: null
			};
		}
    }
}

function createSimpleBtn( writer ) {
    const simpleBtn = writer.createElement( 'simpleBtn' )
    const simpleBtnImage = writer.createElement( 'contentImage' )
    const simpleBtnCaption = writer.createElement('captionImage')

    writer.append(simpleBtnImage, simpleBtn)
    writer.append(simpleBtnCaption, simpleBtn)

    writer.appendElement('paragraph' , simpleBtnCaption)
    return simpleBtn
} 