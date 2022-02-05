import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
