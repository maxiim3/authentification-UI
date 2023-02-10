import style from "./home.module.scss"
import React, {useEffect, useState} from "react"
import {fetchData, updateData} from "../hooks/useHandleRequests"

export default () => {
	const [isUpdating, setIsUpdating] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [courses, setCourses] = useState([])

	useEffect(() => {
		const courses = fetchData("http://localhost:3000/api/courses").then(courses => {
			if (courses.length > 0) {
				setCourses(courses)
			}
		})
	}, [isUpdating])

	useEffect(() => {
		if (courses.length > 0) {
			setIsLoading(false)
		}
	}, [courses])

	const onSubmit = (e: any, course: any) => {
		e.preventDefault()
		const value = e.target.querySelector("input").value as number
		updateData(course, value).then(() => {
			console.log("updated")
			setIsUpdating(!isUpdating)
		})
	}

	return (
		<main className={style.mainContent}>
			<h1>Welcome to the Vte, React Template</h1>
			<a href="http://localhost:3000">Back</a>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				courses.map(course => (
					<div
						className={style.course}
						/*@ts-ignore*/
						key={course.id}>
						{/*@ts-ignore*/}
						<h3>{course.title}</h3>
						{/*@ts-ignore*/}
						<h4>{course._id}</h4>
						{/*@ts-ignore*/}
						<p>{course.author}</p>
						{/*@ts-ignore*/}
						<p>{course.price} €</p>
						<form
							onSubmit={e => onSubmit(e, course)}
							method={"patch"}>
							<input type="number" />
							<button>Update</button>
						</form>
					</div>
				))
			)}
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae distinctio
				dolore ea illo labore magni odio perferendis praesentium, quibusdam quidem quis
				quisquam sequi?
			</p>
			<section className={style.cardContainer}></section>
		</main>
	)
}
