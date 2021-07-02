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
        class: "blockquote",
        model: "blockquote",
        title: "Block Quote",
        icon: col66Icon
      },
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
      }
    ];
    const editor = this.editor;
    const t = editor.t;
    this._addBlockQuoteButton();
    this._addBlockQuote_1Button();
    this._addBlockQuote_2Button();
    this._addBlockQuote_3Button();
    this._addBlockQuote_4Button();
    this._addBlockQuote_5Button();
    this._addBlockQuote_6Button();
    this._addBlockQuote_7Button();
    this._addDropdown(options);
  }
  //------------------------------//
  _addBlockQuoteButton() {
    const t = this.editor.t;
    this._addButton(
      "insertBlockQuote",
      t("Insert BlockQuote"),
      col66Icon,
      "BlockQuote"
    );
  }
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
  _addBlockQuote_3Button() {
    const t = this.editor.t;
    this._addButton(
      "insertBlockQuote_3",
      t("Insert BlockQuote_3"),
      col66Icon,
      "BlockQuote_3"
    );
  }
  _addBlockQuote_4Button() {
    const t = this.editor.t;
    this._addButton(
      "insertBlockQuote_4",
      t("Insert BlockQuote_4"),
      col66Icon,
      "BlockQuote_4"
    );
  }
  _addBlockQuote_5Button() {
    const t = this.editor.t;
    this._addButton(
      "insertBlockQuote_5",
      t("Insert BlockQuote_5"),
      col66Icon,
      "BlockQuote_5"
    );
  }
  _addBlockQuote_6Button() {
    const t = this.editor.t;
    this._addButton(
      "insertBlockQuote_6",
      t("Insert BlockQuote_6"),
      col66Icon,
      "BlockQuote_6"
    );
  }
  _addBlockQuote_7Button() {
    const t = this.editor.t;
    this._addButton(
      "insertBlockQuote_7",
      t("Insert BlockQuote_7"),
      col66Icon,
      "BlockQuote_7"
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
        commandValue: startingHighlighter.model,
        isToggleable: true
      });
      splitButtonView.bind("icon").to(command, "value", value => {
        return icons.quote;
      });
      splitButtonView.bind("isOn").to(command, "value", value => {
        return !!value;
      });

      splitButtonView.delegate("execute").to(dropdownView);
      const buttons = [];
      buttons.push(componentFactory.create("insertBlockQuote"));
      buttons.push(componentFactory.create("insertBlockQuote_1"));
      buttons.push(componentFactory.create("insertBlockQuote_2"));
      buttons.push(componentFactory.create("insertBlockQuote_3"));
      buttons.push(componentFactory.create("insertBlockQuote_4"));
      buttons.push(componentFactory.create("insertBlockQuote_5"));
      buttons.push(componentFactory.create("insertBlockQuote_6"));
      buttons.push(componentFactory.create("insertBlockQuote_7"));

      addToolbarToDropdown(dropdownView, buttons);

      dropdownView.toolbarView.ariaLabel = t("Text highlight toolbar");

      // Execute current action from dropdown's split button action button.
      splitButtonView.on("execute", () => {
        editor.execute("blockQuote", { value: "BlockQuote" });
        editor.editing.view.focus();
      });

      return dropdownView;
    });
  }
  //-----------------------------//
}
