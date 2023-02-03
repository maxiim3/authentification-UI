import React from "react"
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import Home from "../pages/Home"
import {paths} from "../config.json"

export default createBrowserRouter(
	createRoutesFromElements(
		<Route
			path={paths.ROOT}
			element={<Home />}
		/>
	)
)
