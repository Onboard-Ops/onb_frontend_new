import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
//component
import Frontpage from '../pages/Frontpage';
// import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Four0Four from '../pages/Four0four/Four0four';
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
import Verification from '../pages/Verification';
import Settings from '../pages/Settings';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import '../index.css';

const Router = () => {
	const user = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const uid = uuidv4();
	const token = useEffect(() => {
		if (!user.isAauthenticated) {
			dispatch(isUserLoggedIn());
		}
	}, []);
	// console.log(user?.user?.role?.roleAccess, user?.user?.role?.access);
	// console.log('User is authenticated', user);
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Frontpage />} key={uid} />,
				{/* <Route path='/signup' element={<Signup />} key={uid} />, */}
				<Route path='/forgot-password' element={<ForgotPassword />} key={uid} />,
				<Route path='/login' element={<Login />} key={uid} />,
				<Route path='/verify' element={<Verification />} key={uid} />,
				{(user?.token && user?.user?.role?.access === 'project-admin') ||
				(user?.token && user?.user?.role?.roleAccess === 'project-admin') ? (
					[
						<Route path='/projects' element={<ProjectHome />} key={uid} />,
						<Route path='/reset-password' element={<ResetPassword />} key={uid} />,
						<Route path='/users/password/reset/:token' element={<ResetPassword />} key={uid} />,
						<Route path='/people' element={<People key={uid} />} />,
						<Route path='/resources' element={<Resources />} key={uid} />,
						<Route path='/to-do' element={<ToDo key={uid} />} />,
						<Route path='/resources' element={<Resources key={uid} />} />,
						<Route path='/settings' element={<Settings key={uid} />} />,
						// <Route path='/customer_info' element={<CustomerInfo key={uid} />} />,
						<Route path='/overview/:project/:projectid' element={<OverView key={uid} />} />,
					]
				) : (user?.token && user?.user?.role?.access !== 'project-admin') ||
				  (user?.token && user?.user?.role?.roleAccess !== 'project-admin') ? (
					[
						// <Route path='/projects' element={<ProjectHome />} key={uid} />,
						<Route path='/people' element={<People key={uid} />} />,
						<Route path='/reset-password' element={<ResetPassword />} key={uid} />,
						<Route path='/users/password/reset/:token' element={<ResetPassword />} key={uid} />,
						<Route path='/resources' element={<Resources />} key={uid} />,
						<Route path='/to-do' element={<ToDo key={uid} />} />,
						<Route path='/resources' element={<Resources key={uid} />} />,
						// <Route path='/customer_info' element={<CustomerInfo key={uid} />} />,
						<Route path='/overview/:project/:projectid' element={<OverView key={uid} />} />,
					]
				) : (
					<Route path='*' element={<Four0Four />} key='**' />
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
