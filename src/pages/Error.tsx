import React from "react"
import {Navigate} from "react-router-dom"
import {useRedirectOnCountDown} from "../hooks/useRedirectOnCountDown"

export default () => {
	const {redirect, counter} = useRedirectOnCountDown()

	if (redirect) {
		return <Navigate to={"/"} />
	}
	return (
		<>
			<h1>Error </h1>
			<p>Back to home page in {counter}</p>
		</>
	)
}
