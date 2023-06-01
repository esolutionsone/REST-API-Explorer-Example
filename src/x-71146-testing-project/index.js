/* Default imports for UI Builder Components */
import {createCustomElement}  from '@servicenow/ui-core';
import snabbdom               from '@servicenow/ui-renderer-snabbdom';
import styles                 from './styles.scss';
/* Importing "child components" defined within the Components Folder */
import { TextInput }          from './components/TextInput';
import { ChoiceInput } 		  from './components/ChoiceInput';
import { TypeAheadReference } from './components/TypeAheadReference';
import { ResponseTable }      from './components/ResponseTable';
/* 
	Importing ServiceNow now-button component, this can be installed by running npm -i @service-now/now-button and details 
	can be found here https://developer.servicenow.com/dev.do#!/reference/next-experience/utah/now-components/now-button/overview 
*/
import { nowButton }          from '@servicenow/now-button'
/* 
	Importing Utility scripts
	Action Handlers handle our dispatches, REST calls, etc.
	Helpers define functions to be called from our components (onclick, keydown, onchange, etc.) 
*/
import actionHandlers         from './actionHandlers';
import { send_rest }          from './helpers';
/* END IMPORTS */


const view = (state, { updateState, dispatch }) => {
	console.log(state);
	const methods = ['GET','POST','PUT','DELETE','PATCH'];
	return (
		<div>
			<h1>Component REST API Explorer Testing:</h1>
			<form>
				<ChoiceInput          state={state} updateState={updateState} label='Method' name='method' options={methods} />
				<TextInput            state={state} updateState={updateState} label='Path'   name='path'   placeholder='Enter path' />
				<TypeAheadReference   state={state} updateState={updateState} label='Table'  name='table'  placeholder='Enter table name here' table='sys_db_object' dispatch={dispatch} />
				<TextInput            state={state} updateState={updateState} label='Query'  name='query'  placeholder='Add query here > ex. active=true' />
			</form>
			<h3>Request Details:</h3>
			<h5>{state.method} - {state.path}{state.table != '' ? state.selected_table : "<table>"}{state.query != '' ? '?sysparm_query=' + state.query : ''}</h5>
			<now-button label="Click me" variant="primary" size="md" on-click={ () => send_rest( updateState, state, dispatch ) }></now-button>
			<ResponseTable state={state} updateState={updateState} />
		</div>
	);
};

createCustomElement('x-71146-testing-project', {
	renderer: {type: snabbdom},
	initialState: {
		method:         'GET',
		table:          '',
		tables:         [],
		selected_table: '',
		query:          '',
		path:           'api/now/table/',
		results:        [],
		showJson: 		[]
	},
	view,
	styles,
	actionHandlers
});