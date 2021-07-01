/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media-embed/mediaembed
 */

import MediaEmbedEditing from './mediaembedediting';
import AutoMediaEmbed from './automediaembed';
import MediaEmbedUI from './mediaembedui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import './theme/mediaembed.css';

export default class SimpleMediaEmbed extends Plugin {
	static get requires() {
		return [ MediaEmbedEditing, MediaEmbedUI, AutoMediaEmbed, Widget ];
	}


	static get pluginName() {
		return 'SimpleMediaEmbed';
	}
}
