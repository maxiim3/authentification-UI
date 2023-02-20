import React, {useEffect, useReducer} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {paths} from "../routes/config.json"
import {requestUpdateUser} from "../api/api"

type FormAction = {
	type: "email" | "name"
	payload: string
}
type T_initialFormState = {email?: string | undefined; name?: string | undefined}
const formReducer = (state: T_initialFormState, action: FormAction) => {
	switch (action.type) {
		case "email":
			return {
				...state,
				email: action.payload,
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
	const initialFormState: T_initialFormState = {
		email: user.email,
		name: user.name,
	}
	const [form, dispatchForm] = useReducer(formReducer, initialFormState)
	useEffect(() => {
		dispatchForm({type: "email", payload: user.email})
		dispatchForm({type: "name", payload: user.name})
	}, [])

	const handleSubmit = async (e: React.MouseEvent) => {
		// need to be moved to a reducer or a service
		e.preventDefault()
		// add validation
		if (!form.email || !form.name) {
			return console.log("Enter email and password")
		}
		try {
			const {user} = await requestUpdateUser(form, localStorage.getItem("token"))
			console.log(user)
		} catch (e) {
			console.log("Error in handleSubmit", e)
		}
	}
	if (app.isLoggedIn && user.name) {
		return (
			<>
				<h1>Welcome {user.name.split(" ").at(0).toUpperCase()}</h1>

				<form>
					<div>
						<h3>Name</h3>
						<label>
							{form.name}
							<input
								type="text"
								placeholder="Name"
								onChange={e => {
									dispatchForm({type: "name", payload: e.target.value})
								}}
							/>
						</label>
					</div>
					<div>
						<h3>Email</h3>
						<label>
							{form.email}
							<input
								type="text"
								placeholder="Email"
								onChange={e => {
									dispatchForm({type: "email", payload: e.target.value})
								}}
							/>
						</label>
					</div>
					<button onClick={handleSubmit}>Submit</button>
				</form>
			</>
		)
	}
	return (
		<>
			<h1>Welcome</h1>

			<h2>
				Please <Link to={paths.LOGIN}>Log in</Link> to access your informations
			</h2>
		</>
	)
}
