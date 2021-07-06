/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module block-quote/blockquoteediting
 */

import { Plugin } from "ckeditor5/src/core";
import { Enter } from "ckeditor5/src/enter";
import { Delete } from "ckeditor5/src/typing";
import {
  toWidget,
  toWidgetEditable
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

import BlockQuoteCommand from "./blockquotecommand";

/**
 * The block quote editing.
 *
 * Introduces the `'blockQuote'` command and the `'blockQuote'` model element.
 *
 * @extends module:core/plugin~Plugin
 */
export default class BlockQuoteEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return "BlockQuoteEditing";
  }

  /**
   * @inheritDoc
   */
  static get requires() {
    return [Enter, Delete, Widget];
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;
    const schema = this.editor.model.schema;

    this._defineSchema();
    // this._defineConverters();
    editor.commands.add("blockQuote", new BlockQuoteCommand(editor));

    editor.conversion.elementToElement({
      model: "blockQuote",
      view: {
        name: "blockquote",
        classes: "ckc-blockquote ckc-blockquote-0"
      }
    });
    editor.conversion.elementToElement({
      model: "BlockQuote_1",
      view: {
        name: "blockquote",
        classes: "ckc-blockquote ckc-blockquote-1"
      }
    });

    editor.conversion.elementToElement({
      model: "BlockQuote_2",
      view: {
        name: "blockquote",
        classes: "ckc-blockquote  ckc-blockquote-2"
      }
    });

    editor.conversion.elementToElement({
      model: "BlockQuote_3",
      view: {
        name: "blockquote",
        classes: "ckc-blockquote  ckc-blockquote-3"
      }
    });

    editor.conversion.elementToElement({
      model: "BlockQuote_4",
      view: {
        name: "blockquote",
        classes: "ckc-blockquote  ckc-blockquote-4"
      }
    });

    editor.conversion.elementToElement({
      model: "BlockQuote_5",
      view: {
        name: "blockquote",
        classes: "ckc-blockquote  ckc-blockquote-5"
      }
    });

    editor.conversion.elementToElement({
      model: "BlockQuote_6",
      view: {
        name: "blockquote",
        classes: "ckc-blockquote  ckc-blockquote-6"
      }
    });

    editor.conversion.elementToElement({
      model: "BlockQuote_7",
      view: {
        name: "blockquote",
        classes: "ckc-blockquote  ckc-blockquote-7"
      }
    });

    // Postfixer which cleans incorrect model states connected with block quotes.
    editor.model.document.registerPostFixer(writer => {
      const changes = editor.model.document.differ.getChanges();

      for (const entry of changes) {
        if (entry.type == "insert") {
          const element = entry.position.nodeAfter;

          if (!element) {
            // We are inside a text node.
            continue;
          }

          if (element.is("element", "blockQuote") && element.isEmpty) {
            // Added an empty blockQuote - remove it.
            // writer.remove(element);

            return true;
          } else if (
            element.is("element", "blockQuote") &&
            !schema.checkChild(entry.position, element)
          ) {
            // Added a blockQuote in incorrect place. Unwrap it so the content inside is not lost.
            // writer.unwrap(element);

            return true;
          } else if (element.is("element")) {
            // Just added an element. Check that all children meet the scheme rules.
            const range = writer.createRangeIn(element);

            for (const child of range.getItems()) {
              if (
                child.is("element", "blockQuote") &&
                !schema.checkChild(writer.createPositionBefore(child), child)
              ) {
                // writer.unwrap(child);

                return true;
              }
            }
          }
        } else if (entry.type == "remove") {
          const parent = entry.position.parent;

          if (parent.is("element", "blockQuote") && parent.isEmpty) {
            // Something got removed and now blockQuote is empty. Remove the blockQuote as well.
            // writer.remove(parent);

            return true;
          }
        }
      }

      return false;
    });

    const viewDocument = this.editor.editing.view.document;
    const selection = editor.model.document.selection;
    const blockQuoteCommand = editor.commands.get("blockQuote");

    // Overwrite default Enter key behavior.
    // If Enter key is pressed with selection collapsed in empty block inside a quote, break the quote.
    this.listenTo(
      viewDocument,
      "enter",
      (evt, data) => {
        console.log("diff", blockQuoteCommand);
        if (!selection.isCollapsed) {
          return;
        }

        const positionParent = selection.getLastPosition().parent;

        if (positionParent.isEmpty) {
          editor.execute("blockQuote");
          editor.editing.view.scrollToTheSelection();

          data.preventDefault();
          evt.stop();
        }
      },
      { context: "$document" }
    );
    // Overwrite default Backspace key behavior.
    // If Backspace key is pressed with selection collapsed in first empty block inside a quote, break the quote.
    this.listenTo(
      viewDocument,
      "delete",
      (evt, data) => {
        if (
          data.direction != "backward" ||
          !selection.isCollapsed ||
          !blockQuoteCommand.value
        ) {
          return;
        }

        const positionParent = selection.getLastPosition().parent;

        if (positionParent.isEmpty && !positionParent.previousSibling) {
          editor.execute("blockQuote");
          editor.editing.view.scrollToTheSelection();

          data.preventDefault();
          evt.stop();
        }
      },
      { context: "$document" }
    );
  }
  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;
    schema.register("blockQuote", {
      allowWhere: "$block",
      allowContentOf: "$root"
    });
    schema.register("BlockQuote_1", {
      allowWhere: "$block",
      allowContentOf: "$root"
    });
    schema.register("BlockQuote_2", {
      allowWhere: "$block",
      allowContentOf: "$root"
    });
    schema.register("BlockQuote_3", {
      allowWhere: "$block",
      allowContentOf: "$root"
    });
    schema.register("BlockQuote_4", {
      allowWhere: "$block",
      allowContentOf: "$root"
    });
    schema.register("BlockQuote_5", {
      allowWhere: "$block",
      allowContentOf: "$root"
    });
    schema.register("BlockQuote_6", {
      allowWhere: "$block",
      allowContentOf: "$root"
    });
    schema.register("BlockQuote_7", {
      allowWhere: "$block",
      allowContentOf: "$root"
    });
  }
}
