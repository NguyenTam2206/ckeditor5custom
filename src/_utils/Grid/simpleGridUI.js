import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import col444Icon from "./icons/Col444.svg";
import col66Icon from "./icons/Col66.svg";
import col93Icon from "./icons/Col93.svg";
import col39Icon from "./icons/Col39.svg";
import col48Icon from "./icons/Col48.svg";
import col84Icon from "./icons/Col84.svg";
import col363Icon from "./icons/Col363.svg";

import ToolbarSeparatorView from "@ckeditor/ckeditor5-ui/src/toolbar/toolbarseparatorview";
import SplitButtonView from "@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview";
import {
  createDropdown,
  addToolbarToDropdown
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";

//import './../theme/highlight.css';

export default class SimpleGridUI extends Plugin {
  init() {
    // console.log( 'SimpleGridUI#init() got called' );
    const options = [
      {
        class: "col66",
        model: "col66",
        title: "Col Grid 6 6",
        icon: col66Icon
      },
      {
        class: "col39",
        model: "col39",
        title: "Col Grid 3 9",
        icon: col39Icon
      },
      {
        class: "col93",
        model: "col93",
        title: "Col Grid 9 3",
        icon: col93Icon
      },
      {
        class: "col48",
        model: "col84",
        title: "Col Grid 4 8",
        icon: col48Icon
      },
      {
        class: "col84",
        model: "col84",
        title: "Col Grid 8 4",
        icon: col84Icon
      },
      {
        class: "col444",
        model: "col444",
        title: "Col Grid 4 4 4",
        icon: col444Icon
      },
      {
        class: "col363",
        model: "col363",
        title: "Col Grid 3 6 3",
        icon: col363Icon
      }
    ];
    const editor = this.editor;
    const t = editor.t;

    this._addCol66Button();
    this._addCol39Button();
    this._addCol93Button();
    this._addCol48Button();
    this._addCol84Button();
    this._addCol363Button();
    this._addCol444Button();

    this._addDropdown(options);

    // editor.ui.componentFactory.add( 'simpleGrid', locale => {
    //     // The state of the button will be bound to the widget command.
    //     const command = editor.commands.get( 'insertSimpleGrid' );

    //     // The button will be an instance of ButtonView.
    //     const buttonView = new ButtonView( locale );

    //     buttonView.set( {
    //         // The t() function helps localize the editor. All strings enclosed in t() can be
    //         // translated and change when the language of the editor changes.
    //         label: t( 'Simple Grid' ),
    //         withText: true,
    //         tooltip: true
    //     } );

    //     // Bind the state of the button to the command.
    //     buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

    //     // Execute the command when the button is clicked (executed).
    //     this.listenTo( buttonView, 'execute', () => editor.execute( 'insertSimpleGrid' ) );

    //     return buttonView;
    // } );
  }

  //66//
  _addCol66Button() {
    const t = this.editor.t;

    this._addButton("insertGrid66", t("Insert Grid 6 6"), col66Icon, 66);
  }
  //39//
  _addCol39Button() {
    const t = this.editor.t;

    this._addButton("insertGrid39", t("Insert Grid 3 9"), col39Icon, 39);
  }
  //93//
  _addCol93Button() {
    const t = this.editor.t;

    this._addButton("insertGrid93", t("Insert Grid 9 3"), col93Icon, 93);
  }
  //48//
  _addCol48Button() {
    const t = this.editor.t;

    this._addButton("insertGrid48", t("Insert Grid 4 8"), col48Icon, 48);
  }
  //84//
  _addCol84Button() {
    const t = this.editor.t;

    this._addButton("insertGrid84", t("Insert Grid 8 4"), col84Icon, 84);
  }
  //444//
  _addCol444Button() {
    const t = this.editor.t;

    this._addButton("insertGrid444", t("Insert Grid 4 4 4"), col444Icon, 444);
  }
  //363
  _addCol363Button() {
    const t = this.editor.t;

    this._addButton("insertGrid363", t("Insert Grid 3 6 3"), col363Icon, 363);
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
        editor.execute("insertSimpleGrid", { value: value });
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

    componentFactory.add("simpleGrid", locale => {
      const command = editor.commands.get("insertSimpleGrid");
      const dropdownView = createDropdown(locale, SplitButtonView);
      const splitButtonView = dropdownView.buttonView;

      splitButtonView.set({
        tooltip: t("Insert Grid"),
        label: "Grid",
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
        return col66Icon;
      });
      //splitButtonView.bind( 'commandValue' ).to( command, 'value', value => getActiveOption( value, 'model' ) );
      splitButtonView.bind("isOn").to(command, "value", value => !!value);

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
      buttons.push(componentFactory.create("insertGrid66"));
      buttons.push(componentFactory.create("insertGrid39"));
      buttons.push(componentFactory.create("insertGrid93"));
      buttons.push(componentFactory.create("insertGrid48"));
      buttons.push(componentFactory.create("insertGrid84"));
      buttons.push(componentFactory.create("insertGrid444"));
      buttons.push(componentFactory.create("insertGrid363"));

      addToolbarToDropdown(dropdownView, buttons);

      dropdownView.toolbarView.ariaLabel = t("Text highlight toolbar");

      // Execute current action from dropdown's split button action button.
      splitButtonView.on("execute", () => {
        //console.log(splitButtonView.commandValue)
        editor.execute("insertSimpleGrid", { value: 66 });
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
}
