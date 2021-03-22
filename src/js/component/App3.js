import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";
//import PropTypes from "prop-types";
// la app usa enter para ingresar cada tarea
//create your first component
export function App3() {
	//export const App = () => {
	const [list, setlist] = useState([
		// { label: "Make the bed", done: false },
		// { label: "Walk the dog", done: false },
		// { label: "Do the replits", done: false }
	]);

	//GET LIST OF TODO'S FOR A PARTICULAR USER
	function getToDo() {
		const additionalSetting = {
			headers: {
				"Content-Type": "application/json"
			},
			method: "GET"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/EduFG1211",
			additionalSetting
		)
			.then(response => response.json())
			.then(newResponse => {
				console.log(newResponse);
				//setlist([...list, ...newResponse]);
				setlist(newResponse);
			})
			.catch(error => console.log(error));
	}

	//UPDATE EXAMPLE
	function updateToDo() {
		const tasks = [
			{ label: "Make the bed", done: false },
			{ label: "Walk the dog", done: false },
			{ label: "Do the replits", done: false }
		];
		console.log(tasks);
		const additionalSetting = {
			headers: {
				"Content-Type": "application/json"
			},
			method: "PUT",
			body: JSON.stringify(tasks)
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/EduFG1211",
			additionalSetting
		);
	}

	//CREATET A NEW TODO LIST OF A PARTICULAR USER
	useEffect(() => {
		async function createToDo() {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/EduFG1211",
				{
					headers: {
						"Content-Type": "application/json"
					},
					method: "POST",
					body: "[]"
				}
			)
				.then(response => response.json())
				.then(newResponse => {
					console.log(newResponse);
					setlist(JSON.parse(newResponse));
				})
				.catch(error => console.log(error));
		}
		createToDo();
		getToDo();
		//updateToDo();
	}, []);

	function addItem(e) {
		if (e.key === "Enter" && e.target.value !== "") {
			setlist(list.concat({ label: e.target.value, done: false }));
			console.log(list);
			console.log(e.target.value);
			e.target.value = "";
			methodUpdate(list);
		}
	}

	//UPDATE THE ENTIRE LIST OF TODO'S OF A PARTICULAR USER AND SAVE IT
	function methodUpdate(list) {
		const tasks = list;
		console.log(tasks);
		const additionalSetting = {
			headers: {
				"Content-Type": "application/json"
			},
			method: "PUT",
			body: JSON.stringify(tasks)
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/EduFG1211",
			additionalSetting
		);
	}

	//DELETE ITEM ON LIST
	function delItem(index) {
		if (index > -1) {
			const filterData = list.filter(item => item !== list[index]);
			setlist(filterData);
			console.log(list);
			methodUpdate(list);
		}
	}

	//DELETE USER AND ALL OF THEIR TODO'S
	function delUser() {
		const additionalSetting = {
			headers: {
				"Content-Type": "application/json"
			},
			method: "DELETE"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/EduFG1211",
			additionalSetting
		)
			.then(response => response.json())
			.then(newResponse => {
				console.log(newResponse);
				setlist(newResponse);
			})
			.catch(error => console.log(error));
	}

	return (
		<div id="main" className="container">
			<h1 className="title">To Do List</h1>
			<br />
			<div className="inputValue">
				<input
					type="text"
					name="item"
					placeholder="What needs to be done?"
					onKeyPress={e => addItem(e)}
				/>
				<div className="list">
					<br />
					<ul className="lineForm">
						{list.map((item, index) => {
							return (
								<li className="listForm" key={index}>
									{item.label}{" "}
									<span
										className="positionIcons"
										onClick={() => {
											delItem(index);
										}}>
										X
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<br />
			<div className="itemNumberToTheList">
				<p>{list.length} item left</p>
			</div>
			<button
				onClick={() => {
					delUser();
				}}>
				Eliminar lista/usuario
			</button>
		</div>
	);
}
