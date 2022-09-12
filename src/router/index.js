import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//component
import Frontpage from '../pages/Frontpage';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Four0Four from '../pages/Four0four';
import Dashboard from '../pages/Dashboard/';
import People from '../pages/Dashboard/People/';
import Resources from '../pages/Dashboard/Resources';
import ProjectHome from '../pages/ProjectHome';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../redux/actions';

const Router = () => {
	const user = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!user.isAauthenticated) {
			dispatch(isUserLoggedIn());
		}
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Frontpage />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				{user?.token ? (
					[
						<Route path='/home' element={<ProjectHome />} />,
						<Route path='/dashboard/:id' element={<Dashboard />} />,
						<Route path='/people' element={<People />} />,
						<Route path='/resources' element={<Resources />} />,
					]
				) : (
					<Route path='*' element={<Four0Four />} key='**' />
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;

// {
// 	user?.token ? (
// 		user?.user?.role === 'super-admin' ? (
// 			[
// 				<Route path='/home' element={<Home />} />,
// 				// <Route path='/add-user' element={<AddUser />} />,
// 				// <Route path='/products' element={<Products />} />,
// 				// <Route path='/orders' element={<Orders />} />,
// 				// <Route path='/category' element={<Category />} />,
// 				// <Route path='/users' element={<Users />} />,
// 				// <Route path='*' element={<Four0Four />} key='**' />,
// 				// <Route path='*' element={<Warning />} key='*' />,
// 			]
// 		) : user?.user?.role === 'admin' ? (
// 			[<Route path='/home' element={<Home />} />]
// 		) : (
// 			[<Route path='/home' element={<Home />} />]
// 		)
// 	) : (
// 		<Route path='*' element={<Four0Four />} key='**' />
// 	);
// }
