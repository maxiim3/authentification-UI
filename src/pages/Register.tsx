import React, {useReducer} from "react"
import {useDispatch, useSelector} from "react-redux"
import {requestRegisterUser} from "../api/api"
import {Navigate} from "react-router-dom"

const initialFormState: {
	email: undefined | string
	password: undefined | string
	isAdmin: boolean
	name: undefined | string
} = {
	email: "max.test@gmail.com",
	password: "monTest123#",
	isAdmin: true,
	name: "Max",
}

type FormAction =
	| {type: "email" | "password" | "name"; payload: string}
	| {type: "isAdmin"; payload: boolean}
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
		case "isAdmin":
			return {
				...state,
				isAdmin: action.payload,
			}
		case "name":
			return {
				...state,
				name: action.payload,
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
		if (!form.email || !form.password || !form.name) {
			return console.log("Enter email and password")
		}
		try {
			const {user} = await requestRegisterUser(form)
			console.log(user)
		} catch (e) {
			console.log("Error in handleSubmit", e)
		}

	}
	if (app.isLoggedIn) return <Navigate to={"/"} />

	return (
		<>
			<h1>Register</h1>
			{/*	Form to register a new User email, isAdmin, password */}
			<form>
				<p>{form.name}</p>
				<input
					type="text"
					placeholder="name"
					onChange={e => {
						dispatchForm({type: "name", payload: e.target.value})
					}}
				/>
				<p>{form.email}</p>
				<input
					type="email"
					placeholder="email"
					onChange={e => {
						dispatchForm({type: "email", payload: e.target.value})
					}}
				/>
				<p>{form.password}</p>
				<input
					type="password"
					placeholder="password"
					onChange={e => {
						dispatchForm({type: "password", payload: e.target.value})
					}}
				/>
				<p>{form.isAdmin ? "Admin" : "Pas Admin"}</p>
				<select
					onChange={e => {
						dispatchForm({type: "isAdmin", payload: e.target.value === "admin"})
					}}>
					<option value="admin">Admin</option>
					<option value="user">User</option>
				</select>
				<button
					type="submit"
					onClick={handleSubmit}>
					Submit
				</button>
			</form>
			<form></form>
		</>
	)
}
