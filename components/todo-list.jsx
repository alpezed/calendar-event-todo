import TodoItem from "./todo-item";

const TodoList = ({ todos, onRemoveTodo, setEditingItem }) => {
	return (
		<div className='scroll-area-sm'>
			<div style={{ position: "static" }} className='ps ps--active-y'>
				<div className='ps-content'>
					<ul className=' list-group list-group-flush'>
						{todos.map(todo => (
							<TodoItem
								key={todo.id}
								todo={todo}
								onRemoveTodo={onRemoveTodo}
								onEditTodo={setEditingItem}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TodoList;
