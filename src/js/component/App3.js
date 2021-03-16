import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";
//import PropTypes from "prop-types";
// la app usa enter para ingresar cada tarea
//create your first component
export function App3() {
	//export const App = () => {
	const [list, setlist] = useState([]);

	useEffect(() => {
		async function fetchData() {
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
					setlist(JSON.parse(newResponse));
				})
				.catch(error => console.log(error));
		}
		fetchData();
	}, []);

	function addItem(e) {
		if (e.key === "Enter" && e.target.value !== "") {
			setlist(list.concat(e.target.value));
			console.log(list);
			console.log(e.target.value);
			e.target.value = "";
			methodPut(list);
		}
	}

	const methodPut = () => {
		const tasks = list;
		console.log(list);
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
		)
			.then(response => response.json())
			.then(newResponse => {
				console.log(newResponse);
				setlist(JSON.stringify(newResponse));
			})
			.catch(error => console.log(error));
	};

	function delItem(index) {
		if (index > -1) {
			const filterData = list.filter(item => item !== list[index]);
			setlist(filterData);
			console.log(list);
			methodDelete(list);
		}
	}

	const methodDelete = () => {
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
				setlist(JSON.stringify(newResponse));
			})
			.catch(error => console.log(error));
	};

	return (
		<div className="container">
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
								<li
									className="listForm"
									onClick={() => {
										delItem(index);
									}}
									key={index}>
									{item}{" "}
									<span className="positionIcons">X</span>
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
		</div>
	);
}
