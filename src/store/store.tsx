import {configureStore, createSlice} from "@reduxjs/toolkit"

function checkForToken() {
	const token = localStorage.getItem("token")
	if (!token || token === "null" || token === "undefined") {
		localStorage.removeItem("token")
		return false
	}
	return true
}

export const initialAppState: {
	isLoggedIn: boolean
} = {
	isLoggedIn: checkForToken(),
}

const appSlice = createSlice({
	name: "app",
	initialState: initialAppState,
	reducers: {
		setIsLoggedIn(state) {
			state.isLoggedIn = true
		},
		setIsLoggedOut(state) {
			state.isLoggedIn = false
		},
	},
})

export const initialUserState: {
	name: string | undefined
	email: string | undefined
	isAdmin: boolean | undefined
} = {
	name: undefined,
	email: undefined,
	isAdmin: undefined,
}

const userSLice = createSlice({
	name: "user",
	initialState: initialUserState,
	reducers: {
		setName(state, action) {
			state.name = action.payload
		},
		setEmail(state, action) {
			state.email = action.payload
		},
		setIsAdmin(state, action) {
			state.isAdmin = action.payload
		},
	},
})

export const Store = configureStore({
	reducer: {
		app: appSlice.reducer,
		user: userSLice.reducer,
	},
})

export const logInUser =
	(token: string, userProps: {name: string; email: string; isAdmin: boolean}) => dispatch => {
		localStorage.setItem("token", token)
		dispatch(userSLice.actions.setName(userProps.name))
		dispatch(userSLice.actions.setEmail(userProps.email))
		dispatch(userSLice.actions.setIsAdmin(userProps.isAdmin))
		dispatch(appSlice.actions.setIsLoggedIn())
	}

export const logOutUser = () => dispatch => {
	localStorage.removeItem("token")
	dispatch(userSLice.actions.setName(undefined))
	dispatch(userSLice.actions.setEmail(undefined))
	dispatch(userSLice.actions.setIsAdmin(undefined))
	dispatch(appSlice.actions.setIsLoggedOut())
}

export const setUser = (userProps: {name: string; email: string; isAdmin: boolean}) => dispatch => {
	dispatch(userSLice.actions.setName(userProps.name))
	dispatch(userSLice.actions.setEmail(userProps.email))
	dispatch(userSLice.actions.setIsAdmin(userProps.isAdmin))
}
