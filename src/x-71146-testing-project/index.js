import {createCustomElement} from '@servicenow/ui-core';
import snabbdom              from '@servicenow/ui-renderer-snabbdom';
import styles                from './styles.scss';
import actionHandlers        from './actionHandlers';
import { set_api_value }     from './helpers';

const view = (state, {updateState}) => {
	return (
		<div>
			<h1>Component REST API Explorer Testing:</h1>
			<h5>Base Path - "https://dev69661.service-now.com/api/now/table/"</h5>
			<form>
				<h3>table</h3>
				<input type="text" onChange={ set_api_value( state, updateState ) } value={ state.table }></input>
				<h3>query</h3>
				<input type="text" onChange={ set_api_value( state, updateState ) } value={ state.query }></input>
			</form>
		</div>
	);
};

createCustomElement('x-71146-testing-project', {
	renderer: {type: snabbdom},
	initialState: {
		table: 'testing',
		query: 'active=true'	
	},
	view,
	styles
});
