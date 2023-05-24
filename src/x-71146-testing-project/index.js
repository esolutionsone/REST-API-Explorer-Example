import {createCustomElement} from '@servicenow/ui-core';
import snabbdom              from '@servicenow/ui-renderer-snabbdom';
import styles                from './styles.scss';
import { TextInput }         from './components/TextInput';

const view = (state, {updateState}) => {
	return (
		<div>
			<h1>Component REST API Explorer Testing:</h1>
			<h5>Base Path - "https://dev69661.service-now.com/api/now/table/"</h5>
			<form>
				<TextInput state={state} updateState={updateState} label='Table' name='table' placeholder='Enter table name here' />
				<TextInput state={state} updateState={updateState} label='Query' name='query' placeholder='Add query here > ex. active=true' />
			</form>
		</div>
	);
};

createCustomElement('x-71146-testing-project', {
	renderer: {type: snabbdom},
	initialState: {
		table: '',
		query: ''	
	},
	view,
	styles
});
