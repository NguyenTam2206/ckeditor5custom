import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSimpleMediaCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleMedia( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simpleMedia' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleMedia( writer ) {
    const simpleMedia = writer.createElement( 'simpleMedia' )
    const simpleMediaWrapper = writer.createElement( 'simpleMediaWrapper' )
    const simpleMediaContent = writer.createElement( 'simpleMediaContent' )
    const simpleMediaDescription = writer.createElement( 'simpleMediaDescription' )

    writer.append( simpleMediaWrapper, simpleMedia )
    writer.append( simpleMediaContent, simpleMediaWrapper )
    writer.append( simpleMediaDescription, simpleMedia )

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    //writer.appendElement( 'paragraph', simpleBoxDescription )

    return simpleMedia;
}