import React from 'react';
import NavBar from '../common/NavBar';

const MainPage = () => {
	return (
		<div className="relative min-h-screen md:flex">
			<NavBar />
			<div className="w-full bg-gray-100">
				{/* <header className="w-full">
					<ul className="w-full flex flex-row-reverse">
						<li>
							<span className="relative border rounded-full w-10 h-10 block bg-gray-300 text-center overflow-hidden">
								<i className="fas fa-user text-3xl absolute top-2 left-1/2 -translate-x-1/2"></i>
							</span>
						</li>
						<li className="pr-4 w-6 h-6 block">
							<i className="fas fa-bell"></i>
						</li>
					</ul>
				</header> */}
				<div className="w-full lg:h-48 border-solid border-b border-gray-200 bg-white lg:px-6 flex flex-col-reverse">
					<h1 className="font-bold text-3xl pb-12">안녕하세요. XXX 크루님</h1>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
