import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertSimpleGridCommand extends Command {
  constructor(editor) {
    super(editor);
  }
  execute(options) {
    this.editor.model.change(writer => {
      this.editor.model.insertContent(
        createSimpleGrid(writer, Number(options.value))
      );
    });

    function createSimpleGrid(writer, value) {
      const createElement = function(className) {
        return writer.createElement(className);
      };
      //Parent
      const parent = createElement("ck_grid_wraper");

      //Children
      if (value == 444) {
        writer.insert(createElement("ck_grid_col_4"), parent, "end");
        writer.insert(createElement("ck_grid_col_4"), parent, "end");
        writer.insert(createElement("ck_grid_col_4"), parent, "end");
      } else if (value == 66) {
        writer.insert(createElement("ck_grid_col_6"), parent, "end");
        writer.insert(createElement("ck_grid_col_6"), parent, "end");
      } else if (value == 39) {
        writer.insert(createElement("ck_grid_col_3"), parent, "end");
        writer.insert(createElement("ck_grid_col_9"), parent, "end");
      } else if (value == 93) {
        writer.insert(createElement("ck_grid_col_9"), parent, "end");
        writer.insert(createElement("ck_grid_col_3"), parent, "end");
      } else if (value == 363) {
        writer.insert(createElement("ck_grid_col_3"), parent, "end");
        writer.insert(createElement("ck_grid_col_6"), parent, "end");
        writer.insert(createElement("ck_grid_col_3"), parent, "end");
      }
      return parent;
    }
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "ck_grid_wraper"
    );
    this.isEnabled = allowedIn !== null;
  }
}
