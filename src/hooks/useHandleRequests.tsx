import httpService from "../services/httpService"
import {apiEndPoint} from "../config.json"

export const fetchData = async (url:string) => {
	const {data} = await httpService().get(url)
	return data
}

export const updateData = async (course: any, value:number) => {
	console.log(course.title, value)
	const {data: post} = await httpService().patch(`http://localhost:3000/courses/${course.title}?price=${value}`, {price: value})

	console.log(post)
}

/*

export const postData = async (user: any) => {
	const {data: post} = await httpService().post(apiEndPoint, user)

	console.log(post)
}



export const deleteData = async (user: any) => {
	// copy the original state
	// updateData(user) in the UI
	try {
		const {data: post} = await httpService().delete(`${apiEndPoint}/${user.id}`)
	} catch (ex: any) {
		if (ex.response && ex.response.status === 404) {
			console.log("This user has already been deleted.")
			// reverse the updateData(user) in the UI to the copy of the original state
		}
	}
}
*/
