import leftIcon from '@ckeditor/ckeditor5-core/theme/icons/object-left.svg';
import centerIcon from '@ckeditor/ckeditor5-core/theme/icons/object-center.svg';
import rightIcon from '@ckeditor/ckeditor5-core/theme/icons/object-right.svg';
import { logWarning } from '@ckeditor/ckeditor5-utils/src/ckeditorerror';

const defaultStyles = {

	// This represents a side image.
	side: {
		name: 'side',
		title: 'Căn lề',
		icon: rightIcon,
		className: 'image-style-side'
	},

	// This style represents an image aligned to the left.
	alignLeft: {
		name: 'alignLeft',
		title: 'Căn trái',
		icon: leftIcon,
		className: 'image-style-align-left'
	},

	// This style represents a centered image.
	alignCenter: {
		name: 'alignCenter',
		title: 'Căn giữa',
		icon: centerIcon,
		className: 'image-style-align-center'
	},

	// This style represents an image aligned to the right.
	alignRight: {
		name: 'alignRight',
		title: 'Căn phải',
		icon: rightIcon,
		className: 'image-style-align-right'
	}
};
const defaultIcons = {
	left: leftIcon,
	right: rightIcon,
	center: centerIcon
};
export function normalizeImageStyles( configuredStyles = [] ) {
	return configuredStyles.map( _normalizeStyle );
}

function _normalizeStyle( style ) {
	
	if ( typeof style == 'string' ) {
		const styleName = style;
		if ( defaultStyles[ styleName ] ) {
			style = Object.assign( {}, defaultStyles[ styleName ] );
		}
		else {
			logWarning( 'image-style-not-found', { name: styleName } );

			style = {
				name: styleName
			};
		}
	}
	else if ( defaultStyles[ style.name ] ) {
		const defaultStyle = defaultStyles[ style.name ];
		const extendedStyle = Object.assign( {}, style );

		for ( const prop in defaultStyle ) {
			if ( !Object.prototype.hasOwnProperty.call( style, prop ) ) {
				extendedStyle[ prop ] = defaultStyle[ prop ];
			}
		}

		style = extendedStyle;
	}

	if ( typeof style.icon == 'string' && defaultIcons[ style.icon ] ) {
		style.icon = defaultIcons[ style.icon ];
	}

	return style;
}