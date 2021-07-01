export function getSelectedImageWidget( selection ) {
	const viewElement = selection.getSelectedElement();

	////Original
	// if ( viewElement && isImageWidget( viewElement ) ) {
		
	// 	return viewElement;
	// }

	// return null;
	////-////

	//Nam Modified
	return viewElement
}
////Nam modified
// export function isImageWidget( viewElement ) {
// 	return !!viewElement.getCustomProperty( 'simpleBtn' ) && isWidget( viewElement );
// }

////Original
// export function isImageWidget( viewElement ) {
// 	return !!viewElement.getCustomProperty( 'image' ) && isWidget( viewElement );
// }
////-////

// export function isWidget( node ) {
// 	if ( !node.is( 'element' ) ) {
// 		console.log('element false')
// 		return false;
// 	}

// 	return !!node.getCustomProperty( 'widget' );
// }