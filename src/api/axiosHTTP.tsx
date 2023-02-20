import axios from "axios"

export default () => {
	axios.interceptors.response.use(
		response => response,
		error => error
	)
	return {
		get: axios.get,
		post: axios.post,
		put: axios.put,
		patch: axios.patch,
		delete: axios.delete,
	}
}
