import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import {
  toWidget,
  toWidgetEditable
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
//import DomParser from 'dom-parser';

import InsertSimpleGridCommand from "./simpleGridCommand.js";
// import DomParser from 'dom-parser'

export default class SimpleGridEditing extends Plugin {
  static get requires() {
    // ADDED
    return [Widget];
  }
  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      "insertSimpleGrid",
      new InsertSimpleGridCommand(this.editor)
    );
  }
  _defineSchema() {
    const schema = this.editor.model.schema;
    //parent
    schema.register("ck_grid_wraper", {
      isObject: true,
      allowWhere: "$block"
    });
    // children attrs
    const attrsObj = {
      isLimit: true,
      allowIn: "ck_grid_wraper",
      allowContentOf: "$root"
    };
    const registerChild = function(className, attrs) {
      schema.register(className, attrs);
    };
    registerChild("ck_grid_col_1", attrsObj);
    registerChild("ck_grid_col_2", attrsObj);
    registerChild("ck_grid_col_3", attrsObj);
    registerChild("ck_grid_col_4", attrsObj);
    registerChild("ck_grid_col_5", attrsObj);
    registerChild("ck_grid_col_6", attrsObj);
    registerChild("ck_grid_col_7", attrsObj);
    registerChild("ck_grid_col_8", attrsObj);
    registerChild("ck_grid_col_9", attrsObj);
    registerChild("ck_grid_col_10", attrsObj);
    registerChild("ck_grid_col_11", attrsObj);
    registerChild("ck_grid_col_12", attrsObj);
  }
  _defineConverters() {
    //**** Parent ****/
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      model: "ck_grid_wraper",
      view: {
        name: "section",
        classes: "ck_grid_wraper"
      }
    });
    conversion.for("dataDowncast").elementToElement({
      model: "ck_grid_wraper",
      view: renderDownCastForContainer()
    });
    function renderDownCastForContainer() {
      return (modelAttributeValue, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement("section", {
          class: "ck_grid_wraper",
          style: "overflow: hidden; display: flex"
        });
        return toWidget(div, viewWriter);
      };
    }
    conversion.for("editingDowncast").elementToElement({
      model: "ck_grid_wraper",
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement("section", {
          class: "ck_grid_wraper",
          style: "overflow: hidden; display: flex"
        });
        return toWidget(section, viewWriter, { label: "simple box widget" });
      }
    });

    //**** Children ****/
    const renderDownCast = function(i) {
      return (modelAttributeValue, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement("div", {
          class: "ck_grid_col_" + i
        });
        return toWidgetEditable(div, viewWriter);
      };
    };

    for (let i = 1; i < 13; i++) {
      // get static different part of 12 children
      conversion.for("upcast").elementToElement({
        model: "ck_grid_col_" + i,
        view: {
          name: "div",
          classes: "ck_grid_col_" + i
        }
      });
      conversion.for("dataDowncast").elementToElement({
        model: "ck_grid_col_" + i,
        view: renderDownCast(i)
      });
      conversion.for("editingDowncast").elementToElement({
        model: "ck_grid_col_" + i,
        view: (modelElement, { writer: viewWriter }) => {
          //For Col1
          const div = viewWriter.createEditableElement("div", {
            class: "ck_grid_col_" + i
          });
          return toWidgetEditable(div, viewWriter);
        }
      });
    }
  }
}
