import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//component
import Frontpage from '../pages/Frontpage';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Four0Four from '../pages/Four0four';
import Dashboard from '../pages/Dashboard';
// import People from "../pages/Dashboard/People/";
import Resources from '../pages/Dashboard/Resources';
import CustomerInfo from '../pages/CustomerInfo/CustomerInfo';
import ProjectHome from '../pages/ProjectHome';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../redux/actions';
import ToDo from '../pages/ToDo/ToDo';
import People from '../pages/People/People';
import OverView from '../pages/OverView/OverView';

import '../index.css';

const Router = () => {
	const user = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!user.isAauthenticated) {
			dispatch(isUserLoggedIn());
		}
	}, []);
	// console.log('User is authenticated', user);
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Frontpage />} key='1' />
				<Route path='/signup' element={<Signup />} key='2' />
				<Route path='/login' element={<Login />} key='3' />
				{user?.token && user?.user?.role?.access === 'project-admin' ? (
					[
						<Route path='/projects' element={<ProjectHome />} key='4' />,
						<Route path='/people' element={<People key='6' />} />,
						<Route path='/resources' element={<Resources />} key='7' />,
						<Route path='/to-do' element={<ToDo key='8' />} />,
						<Route path='/resources' element={<Resources key='8' />} />,
						<Route path='/customer_info' element={<CustomerInfo key='9' />} />,
						<Route path='/overview/:project/:projectid' element={<OverView key='10' />} />,
					]
				) : user?.token ? (
					[
						<Route path='/people' element={<People key='6' />} />,
						<Route path='/resources' element={<Resources />} key='7' />,
						<Route path='/to-do' element={<ToDo key='8' />} />,
						<Route path='/resources' element={<Resources key='8' />} />,
						<Route path='/customer_info' element={<CustomerInfo key='9' />} />,
						<Route path='/overview/:project/:projectid' element={<OverView key='10' />} />,
					]
				) : (
					<Route path='*' element={<Four0Four />} key='**' />
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;

// }
