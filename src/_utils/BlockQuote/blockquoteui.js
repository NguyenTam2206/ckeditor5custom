/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module block-quote/blockquoteui
 */
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { icons } from "ckeditor5/src/core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import col66Icon from "./icons/Col66.svg";

import ToolbarSeparatorView from "@ckeditor/ckeditor5-ui/src/toolbar/toolbarseparatorview";
import SplitButtonView from "@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview";
import {
  createDropdown,
  addToolbarToDropdown
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
// import '../theme/blockquote.css';

/**
 * The block quote UI plugin.
 *
 * It introduces the `'blockQuote'` button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class BlockQuoteUI extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return "BlockQuoteUI";
  }

  /**
   * @inheritDoc
   */
  init() {
    const options = [
      {
        class: "blockquote_1",
        model: "blockquote_1",
        title: "Block Quote 1",
        icon: col66Icon
      },
      {
        class: "blockquote_2",
        model: "blockquote_2",
        title: "Block Quote 2",
        icon: col66Icon
      },
      {
        class: "col66",
        model: "col66",
        title: "Col Grid 6 6",
        icon: col66Icon
      }
    ];
    const editor = this.editor;
    const t = editor.t;
    this._addBlockQuote_1Button();
    this._addBlockQuote_2Button();
    this._addDropdown(options);
  }
  //------------------------------//
  _addBlockQuote_1Button() {
    const t = this.editor.t;
    this._addButton(
      "insertBlockQuote_1",
      t("Insert BlockQuote_1"),
      col66Icon,
      "BlockQuote_1"
    );
  }
  _addBlockQuote_2Button() {
    const t = this.editor.t;
    this._addButton(
      "insertBlockQuote_2",
      t("Insert BlockQuote_2"),
      col66Icon,
      "BlockQuote_2"
    );
  }
  _addButton(name, label, icon, value, decorateButton = () => {}) {
    const editor = this.editor;
    editor.ui.componentFactory.add(name, locale => {
      const buttonView = new ButtonView(locale);

      const localized = label;

      buttonView.set({
        label: localized,
        icon,
        tooltip: true
      });

      buttonView.on("execute", () => {
        editor.execute("blockQuote", { value: value });
        editor.editing.view.focus();
      });

      // Add additional behavior for buttonView.
      decorateButton(buttonView);

      return buttonView;
    });
  }
  _addDropdown(options) {
    const editor = this.editor;
    const t = editor.t;

    //------------//
    // editor.ui.componentFactory.add("blockQuote", locale => {
    //   const command = editor.commands.get("blockQuote");
    //   const buttonView = new ButtonView(locale);

    //   buttonView.set({
    //     label: t("Block quote"),
    //     icon: icons.quote,
    //     tooltip: true,
    //     isToggleable: true
    //   });

    //   // Bind button model to command.
    //   buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

    //   // Execute command.
    //   this.listenTo(buttonView, "execute", () => {
    //     editor.execute("blockQuote");
    //     editor.editing.view.focus();
    //   });

    //   return buttonView;
    // });
    //------------//

    const componentFactory = editor.ui.componentFactory;

    const startingHighlighter = options[0];

    const optionsMap = options.reduce((retVal, option) => {
      retVal[option.model] = option;

      return retVal;
    }, {});

    componentFactory.add("BlockQuote", locale => {
      const command = editor.commands.get("blockQuote");
      const dropdownView = createDropdown(locale, SplitButtonView);
      const splitButtonView = dropdownView.buttonView;

      splitButtonView.set({
        tooltip: t("Insert BlockQuote"),
        label: "BlockQuote",
        // Holds last executed highlighter.
        //lastExecuted: startingHighlighter.model,
        // Holds current highlighter to execute (might be different then last used).
        commandValue: startingHighlighter.model,
        isToggleable: true
      });

      // Dropdown button changes to selection (command.value):
      // - If selection is in highlight it get active highlight appearance (icon, color) and is activated.
      // - Otherwise it gets appearance (icon, color) of last executed highlight.
      splitButtonView.bind("icon").to(command, "value", value => {
        return icons.quote;
      });
      //splitButtonView.bind( 'commandValue' ).to( command, 'value', value => getActiveOption( value, 'model' ) );
      splitButtonView.bind("isOn").to(command, "value", value => {
        return !!value;
      });

      splitButtonView.delegate("execute").to(dropdownView);
      const buttons = [];
      // Create buttons array.
      // const buttons = options.map( option => {
      // 	// Get existing highlighter button.
      // 	const buttonView = componentFactory.create( 'simpleGrid:' + option.model );

      // 	// Update lastExecutedHighlight on execute.
      // 	//this.listenTo( buttonView, 'execute', () => dropdownView.buttonView.set( { lastExecuted: option.model } ) );
      //     this.listenTo( buttonView, 'execute', () => console.log('executed options ', option) );
      // 	return buttonView;
      // } );

      // Make toolbar button enabled when any button in dropdown is enabled before adding separator and eraser.
      //dropdownView.bind( 'isEnabled' ).toMany( buttons, 'isEnabled', ( ...areEnabled ) => areEnabled.some( isEnabled => isEnabled ) );

      // Add separator and eraser buttons to dropdown.
      //buttons.push( new ToolbarSeparatorView() );
      buttons.push(componentFactory.create("insertBlockQuote_1"));
      //buttons.push( componentFactory.create( 'insertGrid39' ) );
      //buttons.push( componentFactory.create( 'insertGrid93' ) );
      buttons.push(componentFactory.create("insertBlockQuote_2"));
      //buttons.push( componentFactory.create( 'insertGrid363' ) );

      addToolbarToDropdown(dropdownView, buttons);

      dropdownView.toolbarView.ariaLabel = t("Text highlight toolbar");

      // Execute current action from dropdown's split button action button.
      splitButtonView.on("execute", () => {
        //console.log(splitButtonView.commandValue)
        editor.execute("blockQuote", { value: "BlockQuote_1" });
        editor.editing.view.focus();
      });

      // Returns active highlighter option depending on current command value.
      // If current is not set or it is the same as last execute this method will return the option key (like icon or color)
      // of last executed highlighter. Otherwise it will return option key for current one.
      // function getActiveOption( current, key ) {
      // 	const whichHighlighter = !current ||
      // 	current === splitButtonView.lastExecuted ? splitButtonView.lastExecuted : current;

      // 	return optionsMap[ whichHighlighter ][ key ];
      // }

      return dropdownView;
    });
  }
  //-----------------------------//
}
