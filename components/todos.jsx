"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import moment from "moment";

import TodoList from "./todo-list";
import CreateTodoModal from "./create-todo-modal";

const DEFAULT_TODOS = [
	{
		id: 1,
		name: "Initial Test Event",
		date: moment().format("LL"),
		services: ["General Cleaning", "Wash Clothes"],
		files: [],
	},
];

const Todos = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [todos, setTodos] = useState(DEFAULT_TODOS);
	const [editingItem, setEditingItem] = useState(null);

	const handleClose = () => setIsModalVisible(false);
	const handleShow = () => setIsModalVisible(true);

	function addNewTodoHandler(newItem) {
		setTodos(prevTodos => [
			{ id: prevTodos.length + 1, ...newItem },
			...prevTodos,
		]);
		handleClose();
	}

	function editTodoHandler(editedItem) {
		setTodos(prevTodos =>
			prevTodos.map(todo => ({
				...(editedItem.id === todo.id ? { ...editedItem } : todo),
			}))
		);
		setEditingItem(null);
	}

	function removeTodoHandler(id) {
		setTodos(todos.filter(t => t.id !== id));
	}

	return (
		<>
			<div className='row d-flex justify-content-center container mx-auto'>
				<div className='col-md-8'>
					<div className='card-hover-shadow-2x mb-3 card'>
						<div className='card-header-tab card-header'>
							<div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
								<i className='fa fa-calendar' />
								&nbsp;Event Lists
							</div>
						</div>
						{todos.length > 0 ? (
							<TodoList
								todos={todos}
								onAdd={addNewTodoHandler}
								onRemoveTodo={removeTodoHandler}
								setEditingItem={setEditingItem}
							/>
						) : (
							<div className='p-5 text-center text-muted opacity-25'>
								<div>
									<span className='d-block mb-2'>
										<i className='fa fa-calendar fs-1'></i>
									</span>
									<h2
										className='h3 text-muted'
										style={{ "--bs-text-opacity": 0.5 }}
									>
										Start adding an event
									</h2>
								</div>
							</div>
						)}

						<div className='d-block text-end card-footer'>
							<Button variant='primary' onClick={handleShow}>
								+ Add Event
							</Button>
						</div>
					</div>
				</div>
			</div>
			{isModalVisible && (
				<CreateTodoModal
					mode='add'
					isVisible={isModalVisible}
					onClose={handleClose}
					onCreateTodo={addNewTodoHandler}
				/>
			)}
			{editingItem && (
				<CreateTodoModal
					mode='edit'
					editing={editingItem}
					isVisible={!!editingItem}
					onClose={() => setEditingItem(null)}
					onCreateTodo={editTodoHandler}
				/>
			)}
		</>
	);
};

export default Todos;
