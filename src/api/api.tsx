import http from "./axiosHTTP"
import {local} from "./config.json"
import {useJWTDecoder} from "../hooks/useJWTDecoder"

/**
 * This module will be used to make API calls to the backend.
 * Here are the method we need to interact with the API
 * 1. Login the User
 * 		-  Get a single user - user profile
 * 2. Create a new User / Register
 * 3. Get all the users
 * 3. Logout the user
 */

export const requestLogIn = async (email: string, password: string) => {
	const payload = {
		email,
		password,
	}

	try {
		const res = await http().post(local.LOGIN, payload)
		// console.log(res.data)
		if (res.data.status !== 200) throw new Error("Error in logIn")

		const token = res.headers["x-auth-token"]
		const {body} = res.data
		const user = {
			name: body.name,
			email: body.email,
			isAdmin: body.isAdmin,
		}

		return {token, user}
	} catch (err) {
		console.error("Error in api.tsx", err)
		//@ts-ignore
		throw new Error(err)
	}
}

export const requestRetrieveUserData = async (token: string) => {
	try {
		const resp = await http().get(local.GET_USER_PROFILE, {headers: {"x-auth-token": token}})
		return resp.data
	} catch (err) {
		console.error("Error in api.tsx", err)
	}
}

export const requestRegisterUser = async (formProps: {
	email: string
	password: string
	name: string
	isAdmin: boolean
}) => {
	const {email, password, name, isAdmin} = formProps
	const payload = {
		email,
		password,
		name,
		isAdmin,
	}

	try {
		const res = await http().post(local.CREATE_USER, payload)
		// console.log(res.data)
		if (res.data.status !== 200) throw new Error("Error in logIn")

		// const token = res.headers["x-auth-token"]
		const {body} = res.data
		const user = {
			name: body.name,
			email: body.email,
			isAdmin: body.isAdmin,
		}

		return {user}
	} catch (err) {
		console.error("Error in api.tsx", err)
		//@ts-ignore
		throw new Error(err)
	}
}

export const requestUpdateUser = async (
	formProps: {email?: string; name?: string},
	token: string
) => {
	const payload = {...formProps}

	try {
		const res = await http().put(local.UPDATE_USER_PROFILE, payload, {
			headers: {"x-auth-token": token},
		})
		// console.log(res.data)
		if (res.data.status !== 200) throw new Error("Error in updating user")

		const {body} = res.data
		const {_id: decodedId} = await useJWTDecoder(token)

		const user = {
			_id: decodedId,
			name: body?.name,
			email: body?.email,
		}

		return {user}
	} catch (err) {
		console.error("Error in api.tsx", err)
		//@ts-ignore
		throw new Error(err)
	}
}

export const requestAllUsers = async () => {
	try {
		const res = await http().get(local.GET_ALL_USERS)

		// if (res.data.status !== 2) throw new Error("Error in getting all users")
		return res
	} catch (err) {
		console.error("Error in api.tsx", err)
		//@ts-ignore
		throw new Error(err)
	}
}

export const requestDeleteUser = async (id: string) => {
	try {
		const payload = {
			id,
		}
		const res = await http().delete(local.GET_ALL_USERS, {data: payload})
		return res
	} catch (err) {
		console.error("Error in api.tsx", err)
		//@ts-ignore
		throw new Error(err)
	}
}
