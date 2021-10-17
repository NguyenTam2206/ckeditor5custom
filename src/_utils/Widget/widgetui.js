import { Plugin } from 'ckeditor5/src/core'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import WG from './icon/WG.svg'
import './style.css'

export default class WidgetUI extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'CMSWidgetUI'
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor
    editor.ui.componentFactory.add('CMSWidget', (locale) => {
      const widgetButton = new ButtonView(locale)

      const localized = 'Chèn Widget'

      const icon = WG

      widgetButton.set({
        label: localized,
        icon,
        tooltip: true,
      })

      widgetButton.on('execute', () => {
        // set 'openWidgetSelection' to session storage to communicate with Vuejs,
        // to let Vue know open widget selection popup
        sessionStorage.setItem('openWidgetSelection', true)
      })

      return widgetButton
    })
    editor.ui.componentFactory.create('CMSWidget')
  }
}
