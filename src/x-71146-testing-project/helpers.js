export const set_api_value = ( state, updateState, value ) => {
	const { table, query } = state
	updateState({
		table,
		query
	})
	console.log(state)
    console.log(value)
}	