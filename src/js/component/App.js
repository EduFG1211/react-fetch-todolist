import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";
//import PropTypes from "prop-types";
// la app usa enter para ingresar cada tarea
//create your first component
export function App() {
	//export const App = () => {
	const [list, setlist] = useState([]);

	function myFunction(e) {
		if (e.key === "Enter" && e.target.value !== "") {
			setlist([...list, e.target.value]);
			e.target.value = "";
		}
	}
	useEffect(() => {
		//console.log("list: ", list);
	});

	// useEffect(() => {
	// 	console.log("list: ", list);
	// 	async function fetchData() {
	// 		const additionalSetting = {
	// 			headers: {
	// 				"Content-Type": "application/json"
	// 			},
	// 			method: "GET"
	// 		};
	// 		fetch(
	// 			"https://assets.breatheco.de/apis/fake/todos/user/manuortega",
	// 			additionalSetting
	// 		)
	// 			.then(response => response.text())
	// 			.then(newResponse => {
	// 				console.log(newResponse);
	// 				setlist(JSON.parse(newResponse));
	// 			})
	// 			.catch(error => console.log(error));
	// 	}
	// 	fetchData();
	// }, []);

	const DeleteItems = indexItem => {
		setlist(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};

	return (
		<div id="main">
			<h1>To Do List</h1>

			<input
				type="text"
				placeholder="What needs to be done?"
				onKeyDown={event => myFunction(event)}
				className="m-2"
			/>
			<ul className="list-group list-group-flush">
				{list.map((item, index) => {
					return (
						<li
							className="list-group-item bg-transparent"
							key={index}>
							{item} {index}
							<button
								className="btn btn-danger m-3"
								onClick={() => DeleteItems(index)}>
								X
							</button>
						</li>
					);
				})}
				<div id="espacio"></div>
				<p>{list.length + "   item left"}</p>
				<div id="espacio"></div>
			</ul>
		</div>
	);
}
