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
import SimpleBtnToolbar from './_utils/Media/toolbar/index'
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
// import Image from '@ckeditor/ckeditor5-image/src/image'
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import SimpleBtnStyle from './_utils/Media/styles/simplebtnstyle'
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import SimpleGrid from './_utils/Grid/simpleGrid'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
import SimpleMedia from './_utils/MediaVideo/simpleMedia'
import SimpleBtnResize from './_utils/Media/resize/simpleBtnResize'
import SimpleMediaEmbed from './_utils/NewMedia/mediaembed'
import Covid from './_utils/Covid/covid'

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
	//EasyImage,
	Heading,
	Indent,
	Link,
	List,
	TodoList,

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
	//MathType,
	FullScreen,

	//Note: Simplte Btn toolbar conflict with imagetoolbar
	//SimpleBtnToolbar,
	SimpleBtnStyle,
	Image,
	ImageStyle,

	ImageToolbar,
	ImageCaption,
	// LinkImage,
	ImageResize,

	SimpleBtnResize,
	RemoveFormat,
	SimpleGrid,
	Highlight,
	SimpleMedia,
	//MediaEmbed,
	SimpleMediaEmbed,
	Covid
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			//'covid',
			'removeFormat',
			'|',
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
			'simpleMedia',
			'simpleGrid',
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

			// '|',
			// 'MathType',
			// 'ChemType'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	mediaEmbed: {
		previewsInData: true,
		// extraProviders: [{
		// 	name: 'allow-all',
		// 	url: /^.+/
		// }]
	},
	simpleBtn: {
		styles: [
			'side',
			'alignLeft',
			'alignCenter',
			'alignRight'
		],
		toolbar: [
			'simpleBtnStyle:side',
			'simpleBtnStyle:alignLeft',
			'simpleBtnStyle:alignCenter',
			'simpleBtnStyle:alignRight',
			'simpleBtnResize'
		]
	},
	image: {
		styles: [
			'alignLeft', 'alignCenter', 'alignRight'
		],
		resizeUnit: "%",
		resizeOptions: [ {
			name: 'imageResize:original',
			value: null
		},
		{
			name: 'imageResize:25',
			value: '25'
		},
		{
			name: 'imageResize:50',
			value: '50'
		},
		{
			name: 'imageResize:75',
			value: '75'
		} ],
		toolbar: [ 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', '|','imageResize'],
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
