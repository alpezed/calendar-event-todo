import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

function Services({ services, onEdit, onDelete, onAddNew, onChange }) {
	return (
		<div>
			{services.map((service, index) => (
				<div key={index} className='form-check form-switch'>
					<input
						className='form-check-input'
						type='checkbox'
						role='switch'
						id={`service-${service.id}`}
						name='service'
						value={service.name}
						checked={service.isChecked}
						onChange={onChange}
					/>
					<label className='form-check-label' htmlFor={`service-${service.id}`}>
						{service.name}
						{service.new && (
							<ButtonGroup size='sm' className='ms-2 service-action'>
								<Button
									variant='link'
									className='text-dark'
									onClick={() => onEdit(service)}
								>
									<i className='fa fa-pencil'></i>
								</Button>
								<Button
									variant='link'
									className='text-danger'
									onClick={() => onDelete(service)}
								>
									<i className='fa fa-trash'></i>
								</Button>
							</ButtonGroup>
						)}
					</label>
				</div>
			))}
			<Button variant='success' size='sm' className='mt-2' onClick={onAddNew}>
				+ Add Service
			</Button>
		</div>
	);
}

export default Services;
