import React, { Component } from "react";
//Primero construir y heredar la clase a App. Se agrega Constructor para iniciar la clase
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newItem: "",
			list: []
		};
		this.onKeyUp = this.onKeyUp.bind(this);
	}
	//Actualizar el input
	updateInput(key, value) {
		this.setState({
			[key]: value
		});
	}
	addItem() {
		//crear un item con un ID único
		const newItem = {
			id: 1 + Math.random(),
			value: this.state.newItem.slice()
		};
		//copiar la lista de items actual
		const list = [...this.state.list];
		//añadir el item nuevo a la lista
		list.push(newItem);
		//Actualizar el state con la nueva lista y resetear el input en newItem
		this.setState({
			list,
			newItem: ""
		});
	}

	//Crear la función Delete item y copiar lista actual de items
	delItem(id) {
		const list = [...this.state.list];
		//Filtrar items que serán borrados
		const updatedList = list.filter(item => item.id !== id);
		//Aquí actualizo la lista
		this.setState({ list: updatedList });
	}

	onKeyUp(event) {
		if (event.charCode === 13) {
			this.addItem();
		}
	}

	render() {
		return (
			<div className="App">
				<div>
					<div className="header">
						<h1>Todos</h1>
						<input
							type="text"
							placeholder="What needs to be done?"
							value={this.state.newItem}
							onKeyPress={this.onKeyUp}
							onChange={e =>
								this.updateInput("newItem", e.target.value)
							}
						/>
						<button
							className="addBtn"
							onClick={() => this.addItem()}>
							Enter
						</button>
					</div>
					<div>
						<ul>
							{this.state.list.map(item => {
								return (
									<li key={item.id}>
										{item.value}
										<button
											className="delBtn"
											onClick={() =>
												this.delItem(item.id)
											}>
											X
										</button>
									</li>
								);
							})}
						</ul>
						<ul>
							<li>
								You have {this.state.list.length} items left
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
export default App;
