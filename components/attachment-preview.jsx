import React from "react";

function AttachmentPreview({ as: Component, src }) {
	return (
		<Component
			src={src}
			className='rounded border border-3'
			width={70}
			height={70}
			alt='image'
		/>
	);
}

export default AttachmentPreview;
