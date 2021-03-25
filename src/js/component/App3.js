import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";
//import PropTypes from "prop-types";
// la app usa enter para ingresar cada tarea
//create your first component
export function App3() {
	//export const App = () => {
	const [list, setlist] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/EduFG1211")
			.then(response => response.json())
			.then(newResponse => {
				//console.log(newResponse);
				setlist(newResponse);
			})
			.catch(error => console.log(error));
	}, []);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/EduFG1211", {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
		});
	}, [list]);

	const delUser = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/EduFG1211",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/EduFG1211",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			}
		);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/EduFG1211")
			.then(response => response.json())
			.then(newResponse => {
				//console.log(newResponse);
				setlist(newResponse);
			})
			.catch(error => console.log(error));
	};

	//ADD ITEM ON LIST
	function addItem(e) {
		if (e.key === "Enter" && e.target.value !== "") {
			//setlist(list.concat({ label: e.target.value, done: false }));
			setlist([...list, { label: e.target.value, done: false }]);
			console.log(list);
			console.log(e.target.value);
			e.target.value = "";
		}
	}

	//DELETE ITEM ON LIST
	function delItem(index) {
		if (index > -1) {
			const filterData = list.filter(item => item !== list[index]);
			setlist(filterData);
			console.log(list);
		}
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
