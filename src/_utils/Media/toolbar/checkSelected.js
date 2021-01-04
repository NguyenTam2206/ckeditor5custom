export function getSelectedImageWidget( selection ) {
	const viewElement = selection.getSelectedElement();

	if ( viewElement && isImageWidget( viewElement ) ) {
		return viewElement;
	}

	return null;
}
export function isImageWidget( viewElement ) {
	return !!viewElement.getCustomProperty( 'image' ) && isWidget( viewElement );
}