import { createHttpEffect } from "@servicenow/ui-effect-http";

SET_API_VALUE: ({ action, updateState, state, dispatch }) => {
	const { table, query } = state
	updateState({
		table,
		query
	})
	console.log(state)
}	