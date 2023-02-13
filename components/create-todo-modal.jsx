"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DayPickerSingleDateController } from "react-dates";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import { SERVICES } from "@/utils";
import DateInput from "./date-input";
import AttachmentPreview from "./attachment-preview";
import Services from "./services";

const CreateTodoModal = ({
	mode,
	editing,
	isVisible,
	onClose,
	onCreateTodo,
	fields,
	setFields,
}) => {
	const [focused, setFocused] = useState(false);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: files => {
			files.forEach(file => {
				setFields(prevFields => ({
					...prevFields,
					files: [
						...(prevFields.files ?? []),
						{
							type: file.type.startsWith("image") ? "image" : "video",
							preview: URL.createObjectURL(file),
						},
					],
				}));
			});
		},
	});

	useEffect(() => {
		if (mode === "edit") {
			setFields(prevFields => {
				const currentServices = [...(prevFields.services ?? [])].map(srv => ({
					...(editing?.services.includes(srv.name)
						? { ...srv, isChecked: true }
						: { ...srv, isChecked: false }),
				}));

				return {
					...editing,
					services: currentServices.filter(
						(srv, i, arr) => arr.findIndex(s => srv.name === s.name) === i
					),
				};
			});
		} else {
			setFields({ services: SERVICES, files: [] });
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
			setFields(prevFields => ({
				...prevFields,
				services: [
					...(prevFields.services || []),
					{
						id: prevFields.services.length + 1,
						name: newService,
						new: true,
						isChecked: true,
					},
				],
			}));
		}
	}

	function onEditService(editService) {
		const newService = window.prompt("Edit service", editService.name);
		if (newService) {
			setFields(prevFields => ({
				...prevFields,
				services: [...(prevFields.services || [])].map(srv => ({
					...(srv.id === editService.id ? { ...srv, name: newService } : srv),
				})),
			}));
		}
	}

	function onDeleteService(editService) {
		const deleteService = window.confirm(
			"Are you sure you want to delete this service"
		);
		if (deleteService) {
			setFields(prevFields => ({
				...prevFields,
				services: [...(prevFields.services || [])].filter(
					srv => srv.id !== editService.id
				),
			}));
		}
	}

	function onChangeService(e) {
		if (e.target.checked) {
			setFields(prevFields => ({
				...prevFields,
				services: [...(prevFields?.services || [])].map(srv => ({
					...(srv.name === e.target.value ? { ...srv, isChecked: true } : srv),
				})),
			}));
		} else {
			setFields(prevFields => ({
				...prevFields,
				services: [...(prevFields?.services || [])].map(srv => ({
					...(srv.name === e.target.value ? { ...srv, isChecked: false } : srv),
				})),
			}));
		}
	}

	function handleCreateEvent() {
		if (!fields.name) {
			alert("Please enter event name");
			return;
		}
		onCreateTodo({
			...fields,
			date: !fields.date ? moment() : fields.date,
			services: fields.services.filter(srv => srv.isChecked).map(s => s.name),
		});
		// onCreateTodo({ ...fields, services: fields.services.map(s => s.name) });
	}

	return (
		<Modal show={isVisible} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{mode === "edit" ? `Edit "${editing?.name}" ` : "Add New"} Event
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
					<Services
						value={editing?.services || []}
						services={fields?.services || []}
						onChange={onChangeService}
						onEdit={onEditService}
						onDelete={onDeleteService}
						onAddNew={onAddNewService}
					/>
				</div>
				<div className='mb-3'>
					<div {...getRootProps({ className: "dropzone" })}>
						<input {...getInputProps()} />
						<p className='p-0 m-0'>
							Drag &apos;n&apos; drop some files here, or click to select files
						</p>
					</div>
					<div className='mt-2 d-flex gap-2'>
						{fields?.files &&
							fields.files.map((file, index) => {
								switch (file.type) {
									case "image":
										return <AttachmentPreview as={Image} src={file.preview} />;
									case "video":
										return <AttachmentPreview as='video' src={file.preview} />;
								}
							})}
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
