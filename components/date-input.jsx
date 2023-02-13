"use client";

import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const DateInput = forwardRef(({ value, onClick }, ref) => (
	<input
		ref={ref}
		type='text'
		className='form-control'
		id='event-date'
		placeholder='Enter even date...'
		name='date'
		value={value}
		readOnly
		onClick={onClick}
	/>
));

export default DateInput;
