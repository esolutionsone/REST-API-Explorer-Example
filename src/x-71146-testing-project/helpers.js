export const set_api_value = () => {
	const { table, query } = this.state
	updateState({
		table,
		query
	})
	console.log(state)
}	