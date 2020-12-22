import Command from '@ckeditor/ckeditor5-core/src/command'

export default class InsertSimpleBtnCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( createSimpleBtn( writer ) )
        })
    }
    refresh() {
        const model = this.editor.model
        const selection = model.document.selection
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition() , 'simpleBtn')

        this.isEnabled = allowedIn !== null
    }
}

function createSimpleBtn( writer ) {
    const simpleBtn = writer.createElement( 'simpleBtn' )
    const simpleBtnImage = writer.createElement( 'contentImage' )

    writer.append(simpleBtnImage, simpleBtn);

    return simpleBtn
} 