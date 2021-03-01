import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

export default class covidEditing extends Plugin {
    static get requires() {
        return [ Widget ]
    }
    init() {
        this._defineSchema()
        this._defineConverters()
    }
    _defineSchema() {
        const schema = this.editor.model.schema
        
        schema.register('covid', {
            isObject: true,
            isBlock: true,
            allowWhere: '$block',
            //inheritAllFrom: 'image',
            allowAtrributes: [ 'style' ]
        })
    }
    _defineConverters() {
        const conversion = this.editor.conversion;
        conversion.for('upcast').elementToElement( {
            model: 'covid',
            view: {
                name: 'div',
                classes: 'covidItem'
            }
        } )
        conversion.for('dataDowncast').elementToElement( {
            model: 'covid',
            view: {
                name: 'div',
                classes: 'covidItem'
            }
        } )
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'covid',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 
                'div', { 
                    class: 'covidItem' , 
                    style: "display:inline-block; visibility: hidden"
                });
                return toWidget( section, viewWriter, { label: 'simple btn widget' } );
            }
        } );
    }
}