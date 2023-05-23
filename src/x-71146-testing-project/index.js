import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import actionHandlers from './actionHandlers'

const view = (state, {updateState}) => {
	return (
		<div>
			<h1>Component REST API Explorer Testing:</h1>
			<h5>Base Path - "https://dev69661.service-now.com/api/now/table/"</h5>
			<form>
				<h3>table</h3>
				<input type="text" onChange={ setAPIValue() } value={ state.table }></input>
				<h3>query</h3>
				<input type="text" onChange={ setAPIValue() } value={ state.query }></input>
			</form>
		</div>
	);
};

function setAPIValue() {
	console.log('hello');
//	const { table, query } = state
/*	updateState({
		table,
		query
	})*/
}

createCustomElement('x-71146-testing-project', {
	renderer: {type: snabbdom},
	view,
	styles
});
