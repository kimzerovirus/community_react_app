import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const path = process.env.PUBLIC_URL;
	const navigate = useNavigate();

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		console.log(target.email.value, target.password.value);

		if (target.email.value && target.password.value) navigate('/');
		else alert('빈 칸 존재함');
	};

	return (
		<div className="2xl:container h-screen m-auto">
			<div hidden className="fixed inset-0 w-6/12 lg:block">
				<img
					src={`${path}/전구맨2.gif`}
					className="w-full h-full object-cover"
					alt="로그인이미지"
				/>
			</div>
			<div className="relative h-full ml-auto lg:w-6/12 flex items-center">
				<div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
					<div className="space-y-4 text-center font-extrabold text-3xl">
						<Link to="">THE CONNECTER</Link>
						<p className="font-medium text-lg text-gray-600 text-center">
							Welcome to job web!
						</p>
					</div>

					<form onSubmit={submitHandler} className="space-y-6 py-6">
						<div className="relative">
							<input
								type="email"
								name="email"
								placeholder="Email"
								className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
							/>
						</div>

						<div className="flex flex-col items-end">
							<input
								type="password"
								name="password"
								placeholder="Password"
								className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
							/>
							<Link to="/find" className="w-max p-3 -mr-3">
								<span className="text-sm tracking-wide text-blue-600">
									Forgot password
								</span>
							</Link>
						</div>

						<div>
							<button
								type="submit"
								className="w-full px-6 py-3 rounded-xl bg-sky-500 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
							>
								<span className="font-semibold text-white text-lg">Login</span>
							</button>
							<Link to="/signup" className="w-max p-3 -ml-3">
								<span className="text-sm tracking-wide text-blue-600">
									Create new account
								</span>
							</Link>
						</div>
					</form>

					<div className="border-t pt-12">
						<div className="space-y-2 text-center">
							<img src="" alt="" className="w-40 m-auto grayscale" />
							<span className="block text-sm tracking-wide text-gray-400">
								Copyright &copy; 2021 KZV&KJY ALL Right reserved.
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
