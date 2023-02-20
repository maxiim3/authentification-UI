import React from "react"
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Outlet,
	Route,
} from "react-router-dom"
import Home from "../pages/Home"
import {paths} from "./config.json"
import Login from "../pages/Form"
import Register from "../pages/Register"
import Error from "../pages/Error"
import LayoutContainer from "../components/LayoutContainer"
import useOnLoad from "../hooks/useOnLoad"

export default createBrowserRouter(
	createRoutesFromElements(
		<Route
			path={paths.ROOT}
			// loader={useOnLoad}
			element={
				<LayoutContainer>
					<Outlet />
				</LayoutContainer>
			}
			errorElement={<Navigate to={paths.ERROR} />}>
			<Route
				index={true}
				element={<Home />}
			/>
			<Route
				path={paths.LOGIN}
				element={<Login />}
			/>
			<Route
				path={paths.REGISTER}
				element={<Register />}
			/>
			<Route
				path={paths.ERROR}
				element={<Error />}
			/>
		</Route>
	)
)
