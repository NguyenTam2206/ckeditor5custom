/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Undo from '@ckeditor/ckeditor5-undo/src/undo'
import SimpleBtn from './_utils/Media/simplebtn'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; 
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock'
import MathType from '@wiris/mathtype-ckeditor5';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
// A plugin that combines a basic set of special characters.
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import FullScreen from './_utils/FullScreen/FullScreen'

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	Strikethrough,
	Subscript,
	Superscript,
	Underline,
	BlockQuote,
	HorizontalLine,
	EasyImage,
	Heading,
	Indent,
	Link,
	List,
	TodoList,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	Alignment,
	SimpleBtn, //Them
	Undo,
	FontSize,
	FontFamily,
	FontColor,
	FontBackgroundColor,
	CodeBlock,
	SpecialCharacters, 
	SpecialCharactersEssentials,
	PageBreak,
	MathType,
	FullScreen
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'heading',
			'|',
			'alignment',
			'fontSize',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'simpleBtn',
			'|',
			'fullScreen',
			'|',
			'link',
			'insertTable',
			'mediaEmbed',
			'|',
			'specialCharacters',
			'subscript', 
			'superscript',
			'|',
			'bulletedList',
			'numberedList',
			'todoList',
			'pageBreak',
			'|',
			'indent',
			'outdent',
			'|',
			'codeBlock',
			'blockQuote',
			'horizontalLine',
			'|',
			'MathType',
			'ChemType'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
