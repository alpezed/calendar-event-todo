import Todos from "../components/todos";

async function Home() {
	return (
		<div className='row d-flex justify-content-center container mx-auto'>
			<div className='col-md-8'>
				<div className='card-hover-shadow-2x mb-3 card'>
					<div className='card-header-tab card-header'>
						<div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
							<i className='fa fa-calendar' />
							&nbsp;Event Lists
						</div>
					</div>
					<Todos />
				</div>
			</div>
		</div>
	);
}

export default Home;
