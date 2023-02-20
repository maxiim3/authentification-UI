import React, {useReducer} from "react"
import {requestLogIn} from "../api/api"
import {useDispatch, useSelector} from "react-redux"
import {logInUser} from "../store/store"
import {Navigate, useNavigate} from "react-router-dom"

const initialFormState: {email: undefined | string; password: undefined | string} = {
	email: "eric.bibi@gmail.com",
	password: "4dasdasAdasdas@3#",
}

type FormAction = {
	type: "email" | "password"
	payload: string
}
const formReducer = (state: typeof initialFormState, action: FormAction) => {
	switch (action.type) {
		case "email":
			return {
				...state,
				email: action.payload,
			}
		case "password":
			return {
				...state,
				password: action.payload,
			}
		default:
			return state
	}
}

export default () => {
	const {user, app} = useSelector(state => state)
	const dispatch = useDispatch()

	const [form, dispatchForm] = useReducer(formReducer, initialFormState)

	const handleSubmit = async (e: React.MouseEvent) => {
		// need to be moved to a reducer or a service
		e.preventDefault()
		// add validation
		if (!form.email || !form.password) {
			return console.log("Enter email and password")
		}
		try {
			const {token, user} = await requestLogIn(form.email, form.password)
			dispatch(logInUser(token, user))
		} catch (e) {
			console.log("Error in handleSubmit", e)
		}
	}

	if (app.isLoggedIn) return <Navigate to={"/"}/>

	return (
		<form>
			<p>LOGIN</p>
			<input
				type="email"
				placeholder="email"
				onChange={e => dispatchForm({type: "email", payload: e.target.value})}
			/>
			<p>{form.email}</p>
			<input
				type="password"
				placeholder="password"
				onChange={e => dispatchForm({type: "password", payload: e.target.value})}
			/>
			<p>{form.password}</p>
			<button
				type="submit"
				onClick={handleSubmit}>
				Submit
			</button>
		</form>
	)
}
