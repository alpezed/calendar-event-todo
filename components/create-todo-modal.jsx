"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import DatePicker from "react-bootstrap-date-picker";
import { DayPickerSingleDateController } from "react-dates";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import DateInput from "./date-input";

const SERVICES = [
	{ id: 1, name: "General Cleaning" },
	{ id: 2, name: "Wash Clothes" },
	{ id: 3, name: "Maintenance" },
];

const CreateTodoModal = ({
	mode,
	editing,
	isVisible,
	onClose,
	onCreateTodo,
}) => {
	const [services, setServices] = useState(SERVICES);
	const [fields, setFields] = useState({
		services: [],
		files: [],
	});
	const [focused, setFocused] = useState(false);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: files => {
			files.forEach(file => {
				setFields(prevFields => ({
					...prevFields,
					files: [...prevFields.files, URL.createObjectURL(file)],
				}));
			});
		},
	});

	useEffect(() => {
		if (mode === "edit") {
			setFields(editing);
		} else {
			setFields({ services: [], files: [] });
		}
	}, [mode, editing]);

	function onChangeFields(e) {
		setFields(prevFields => ({
			...prevFields,
			[e.target.name]: e.target.value,
		}));
	}

	function onChangeDateField(value) {
		setFields(prevFields => ({
			...prevFields,
			date: value,
		}));
	}

	function onAddNewService() {
		const newService = window.prompt("Add new service");
		if (newService) {
			setServices(prevServices => [
				...prevServices,
				{
					id: prevServices.length + 1,
					name: newService,
					new: true,
					isChecked: true,
				},
			]);
		}
	}

	function onEditService(editService) {
		const newService = window.prompt("Edit service", editService.name);
		if (newService) {
			setServices(prevServices =>
				prevServices.map(srv => ({
					...(srv.id === editService.id ? { ...srv, name: newService } : srv),
				}))
			);
		}
	}

	function onDeleteService(editService) {
		const deleteService = window.confirm(
			"Are you sure you want to delete this service"
		);
		if (deleteService) {
			setServices(prevServices =>
				prevServices.filter(srv => srv.id !== editService.id)
			);
		}
	}

	function onChangeService(e) {
		if (e.target.checked) {
			setFields(prevFields => ({
				...prevFields,
				services: [...(prevFields?.services || []), e.target.value],
			}));
		} else {
			setFields(prevFields => ({
				...prevFields,
				services: prevFields.services.filter(field => field !== e.target.value),
			}));
		}
	}

	function handleCreateEvent() {
		if (!fields.name) {
			alert("Please enter event name");
			return;
		}
		onCreateTodo({ ...fields, date: !fields.date ? moment() : fields.date });
		// onCreateTodo({ ...fields, services: fields.services.map(s => s.name) });
	}

	return (
		<Modal show={isVisible} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{mode === "edit" ? `Edit "${editing.name}" ` : "Add New"} Event
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='mb-3'>
					<label htmlFor='event-name' className='form-label'>
						Event Name
					</label>
					<input
						type='text'
						className='form-control'
						id='event-name'
						placeholder='Enter even name...'
						name='name'
						value={fields?.name}
						onChange={onChangeFields}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='event-date' className='form-label'>
						Event Date
					</label>
					<Dropdown>
						<Dropdown.Toggle
							value={moment(fields?.date).format("LL")}
							className='form-control form-control__date'
							id='dropdown-date'
							as={DateInput}
						>
							Dropdown Button
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item>
								<DayPickerSingleDateController
									onDateChange={onChangeDateField}
									onFocusChange={() => setFocused(!focused)}
									focused={focused}
									date={fields?.date}
								/>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className='mb-3'>
					<label htmlFor='event-services' className='form-label'>
						Services
					</label>
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
									checked={fields?.services.includes(service.name)}
									onChange={onChangeService}
								/>
								<label
									className='form-check-label'
									htmlFor={`service-${service.id}`}
								>
									{service.name}
									{service.new && (
										<ButtonGroup size='sm' className='ms-2 service-action'>
											<Button
												variant='link'
												className='text-dark'
												onClick={() => onEditService(service)}
											>
												<i className='fa fa-pencil'></i>
											</Button>
											<Button
												variant='link'
												className='text-danger'
												onClick={() => onDeleteService(service)}
											>
												<i className='fa fa-trash'></i>
											</Button>
										</ButtonGroup>
									)}
								</label>
							</div>
						))}
						<Button
							variant='success'
							size='sm'
							className='mt-2'
							onClick={onAddNewService}
						>
							+ Add Service
						</Button>
					</div>
				</div>
				<div className='mb-3'>
					<div {...getRootProps({ className: "dropzone" })}>
						<input {...getInputProps()} />
						<p className='p-0 m-0'>
							Drag &apos;n&apos; drop some files here, or click to select files
						</p>
					</div>
					<div className='mt-2'>
						{fields?.files &&
							fields.files.map((img, index) => (
								<Image
									key={index}
									src={img}
									className='rounded me-2'
									width={70}
									height={70}
									alt='image'
								/>
							))}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='link' onClick={onClose}>
					Close
				</Button>
				<Button variant='primary' onClick={handleCreateEvent}>
					{mode === "edit" ? "Update Event" : "Add Event"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateTodoModal;
