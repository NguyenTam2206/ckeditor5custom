import { Plugin } from 'ckeditor5/src/core'
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'


export default class WidgetEditing extends Plugin {
  static get pluginName() {
    return 'NTVWidgetEditing'
  }

  /**
   * @inheritDoc
   */
  static get requires() {
    return [Widget]
  }

  init() {
    // Register insertWidget
    const editor = this.editor

    // Define the model's schema
    this._defineSchema()

    // Define how DOM parse from model <-> view
    this._defineConverters()
  }

  _defineSchema() {
    const schema = this.editor.model.schema
    schema.register('ntvWidget', {
      isObject: true,
      isBlock: true,
      allowWhere: '$block',
      allowContentOf: '$root',
      allowAttributes: ['widget-id'],
    })
    schema.register('ntvWidgetContent', {
      isLimit: true,
      isObject: true,

      allowIn: 'ntvWidget',

      allowContentOf: '$block',
    })
  }

  _defineConverters() {
    const conversion = this.editor.conversion

    // Downcasting model to view
    conversion.for('dataDowncast').elementToElement({
      model: 'ntvWidget',
      view: (modelElement, conversionApi) => {
        const writer = conversionApi.writer

        return writer.createContainerElement('figure', {
          'widget-id': modelElement.getAttribute('widget-id'),
          class: 'custom-widget-figure',
        })
      },
    })

    // Upcasting from view to model
    conversion.for('upcast').elementToElement({
      view: {
        name: 'figure',
        classes: 'custom-widget-figure',
      },
      model: (viewElement, conversionApi) => {
        const modelWriter = conversionApi.writer

        return modelWriter.createElement('ntvWidget', {
          'widget-id': viewElement.getAttribute('widget-id'),
          class: 'custom-widget-figure',
        })
      },
    })

    // Downcast from model to editing View
    conversion.for('editingDowncast').elementToElement({
      model: 'ntvWidget',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createEditableElement('figure', {
          'widget-id': modelElement.getAttribute('widget-id'), class: 'custom-widget-figure',
        })

        return toWidget(section, viewWriter)
      },
    })

    // Convert widget-id attribute from view to model and model to view.
    // Since this is an custom attribute
    conversion.attributeToAttribute({
      view: 'widget-id',
      model: 'widget-id',
    })

    // 2 way covert model and view
    conversion.elementToElement({
      model: 'ntvWidgetContent',
      view: {
        name: 'p',
        classes: 'custom-widget-name',
      },
    })
  }
}
