import {createCustomElement}  from '@servicenow/ui-core';
import snabbdom               from '@servicenow/ui-renderer-snabbdom';
import styles                 from './styles.scss';
import { TextInput }          from './components/TextInput';
import { ChoiceInput } 		  from './components/ChoiceInput';
import { TypeAheadReference } from './components/TypeAheadReference';
import actionHandlers         from './actionHandlers';

const view = (state, { updateState, dispatch }) => {
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
			<h5>{state.method} - {state.path}{state.table != '' ? state.table : "<table>"}{state.query != '' ? '?sysparm_query=' + state.query : ''}</h5>
		</div>
	);
};

createCustomElement('x-71146-testing-project', {
	renderer: {type: snabbdom},
	initialState: {
		method:         'GET',
		table:          '',
		tables:         {},
		selected_table: '',
		query:          '',
		path:           'https://dev69661.service-now.com/api/now/table/'
	},
	view,
	styles,
	actionHandlers
});
