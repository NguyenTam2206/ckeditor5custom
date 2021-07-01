import Command from '@ckeditor/ckeditor5-core/src/command'

export default class InsertSimpleBtnCommand extends Command {
    execute( options ) {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( createSimpleBtn( writer ) )
        })
        // if(options.newImg == true) {
        //         this.editor.model.change( writer => {
        //         this.editor.model.insertContent( createSimpleBtn( writer ) )
        //     })
        // }
        // else if(options.newImg == false) {
        //     const model = this.editor.model;
        //     const imageElement = model.document.selection.getSelectedElement();

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
    refresh() {
        const model = this.editor.model
        const selection = model.document.selection
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition() , 'covid')

        this.isEnabled = allowedIn !== null

        const element = this.editor.model.document.selection.getSelectedElement()
    }
}

function createSimpleBtn( writer ) {
    const simpleBtn = writer.createElement( 'covid' )

    writer.appendElement('paragraph' , simpleBtn)
    return simpleBtn
} 