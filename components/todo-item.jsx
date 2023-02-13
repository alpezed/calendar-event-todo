import { Badge } from "react-bootstrap";
import moment from "moment";

const TodoItem = ({ todo, onRemoveTodo, onEditTodo }) => {
	return (
		<li className='list-group-item'>
			<div className='todo-indicator bg-primary' />
			<div className='widget-content p-0'>
				<div className='widget-content-wrapper'>
					<div className='widget-content-left flex2'>
						<div className='widget-heading'>
							{todo.name}{" "}
							<Badge pill bg='warning' text='dark'>
								{typeof todo.date === "string"
									? todo.date
									: todo.date.format("LL")}
							</Badge>
						</div>
						<div className='widget-subheading'>{todo.services.join(", ")}</div>
					</div>
					<div className='widget-content-right'>
						<button
							className='border-0 btn-transition btn btn-success me-2'
							onClick={() => onEditTodo(todo)}
						>
							<i className='fa fa-pencil' />
						</button>
						<button
							className='border-0 btn-transition btn btn-danger'
							onClick={() => onRemoveTodo(todo.id)}
						>
							<i className='fa fa-trash' />
						</button>
					</div>
				</div>
			</div>
		</li>
	);
};

export default TodoItem;
