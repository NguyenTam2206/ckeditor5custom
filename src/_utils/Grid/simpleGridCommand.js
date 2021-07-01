import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSimpleGridCommand extends Command {
    //const number = 0;
    constructor(editor) {
        super(editor)
        this.number = 0
    }
    execute(options) {
        let a = this.number++

        if( document.getElementsByClassName('simpleGrid').length >= a ) {
            a = document.getElementsByClassName('simpleGrid').length + 1
        }
        else {
            a--;
        }
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            if ( options.value == 66 ) {
                this.editor.model.insertContent( createSimpleGrid( writer , 66 ) );
            }
            else if ( options.value == 39 ) {
                this.editor.model.insertContent( createSimpleGrid( writer , 39 ) );
            }
            else if ( options.value == 93 ) {
                this.editor.model.insertContent( createSimpleGrid( writer , 93 ) );
            }
            else if ( options.value == 444 ) {
                this.editor.model.insertContent( createSimpleGrid( writer , 444 ) ) 
            }
            else if ( options.value == 363 ) {
                this.editor.model.insertContent( createSimpleGrid( writer, 363 ) ) 
            }
        } );

        function createSimpleGrid( writer, value ) {
            //console.log('numberOfGrid ', a)
            const simpleGrid = writer.createElement( 'simpleGrid' );
            const simpleBoxCol1 = writer.createElement( 'simpleGridCol1' );
            const simpleBoxCol2 = writer.createElement( 'simpleGridCol2' );
            const simpleBoxCol3 = writer.createElement( 'simpleGridCol3' );
        
            writer.append( simpleBoxCol1, simpleGrid );
            writer.append( simpleBoxCol2, simpleGrid );
            sessionStorage.setItem('type' + a, 66)
            sessionStorage.setItem('type', 66)
            if(value == 444) {
                sessionStorage.setItem('type' + a, 444)
                sessionStorage.setItem('type', 444)
                writer.append( simpleBoxCol3, simpleGrid );
                writer.appendElement( 'paragraph', simpleBoxCol3 );
            }
            else if( value == 39) {
                sessionStorage.setItem('type' + a, 39)
                sessionStorage.setItem('type', 39)
            }
            else if( value == 93) {
                sessionStorage.setItem('type' + a, 93)
                sessionStorage.setItem('type', 93)
            }
            else if( value == 363) {
                sessionStorage.setItem('type' + a, 363)
                sessionStorage.setItem('type', 363)
                writer.append( simpleBoxCol3, simpleGrid );
                writer.appendElement( 'paragraph', simpleBoxCol3 );
            }
            
        
            // There must be at least one paragraph for the description to be editable.
            // See https://github.com/ckeditor/ckeditor5/issues/1464.
            writer.appendElement( 'paragraph', simpleBoxCol1 );
            writer.appendElement( 'paragraph', simpleBoxCol2 );
            return simpleGrid;
        }
    }
   
    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simpleGrid' );
        this.isEnabled = allowedIn !== null;
    }
}

