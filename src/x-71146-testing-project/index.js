/* Default imports for UI Builder Components */
import {createCustomElement}  from '@servicenow/ui-core';
import snabbdom               from '@servicenow/ui-renderer-snabbdom';
import styles                 from './styles.scss';
/* Importing "child components" defined within the Components Folder */
import { UserGreeting } 	  from './components/UserGreeting';
import { TextInput }          from './components/TextInput';
import { ChoiceInput } 		  from './components/ChoiceInput';
import { TypeAheadReference } from './components/TypeAheadReference';
import { ResponseTable } 	  from './components/ResponseTable';
import { PostFields } 		  from './components/PostFields';
import { Record } 			  from './components/ResponseTable/Record';
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
	return (
		<div className="main-container">
			<h1>Component REST API Explorer Testing:</h1>
			<div className="form-container">
				<UserGreeting state={state} />
				<form>
					<ChoiceInput
						state		={ state } 
						updateState ={ updateState } 
						label		='Method:' 
						name		='method' />
					<TextInput
						state		={ state } 
						updateState ={ updateState } 
						label		='Path:'   
						name		='path'   
						placeholder ='Enter path' />
					<TypeAheadReference   
						state		={ state } 
						updateState ={ updateState } 
						label		='Table:'  
						name		='table'  
						placeholder ='Enter table name here' 
						table		='sys_db_object' 
						dispatch	={dispatch} />
					<TextInput
						state		={ state } 
						updateState ={ updateState } 
						label		='Display Field:'  
						name		='displayField'  
						placeholder	='Add field to display' />
					{
						{
							"GET":  <TextInput   state={ state } updateState={ updateState } label='Query'  name='query'  placeholder='Add query here > ex. active=true' />,
							"POST": <PostFields  state={ state } updateState={ updateState } />
						}[state.method]
					}
				</form>
			</div>
			<h3>Request Details:</h3>
			<div>{state.method} - {state.path}{ state.table != '' ? 
												state.selected_table 
												: 
												"<table>"
											}{state.query != '' ?
												'?sysparm_query=' + state.query 
												: 
												''
											} </div>
			<now-button 
				label	 ="SEND" 
				variant  ="primary" 
				size	 ="md" 
				on-click ={ 
					() => send_rest( updateState, state, dispatch ) 
				}>
			</now-button>
			{	
				{
					"GET": 	<ResponseTable state={state} updateState={updateState} />,
					"POST": state.post_response != null ?
								<div>
									<h4>POST Response:</h4>
									<Record key={0} state={state} updateState={updateState} record={state.post_response}/>
								</div>
							: 
								""
				}[state.method]
			}
		</div>
	);
};

createCustomElement('x-71146-testing-project', {
	renderer: {type: snabbdom},
	initialState: {
		method:         	  'GET',
		methods:			  ['GET','POST'],
		table:          	  '',
		tables:         	  [],
		selected_table: 	  '',
		query:          	  '',
		displayField:		  '',
		path:           	  'api/now/table/',
		results:        	  [],
		showJson: 			  [],
		user:           	  {},
		request_fields: 	  [{"field_index":"field1","value_index":"value1","field":"","value":""}],
		request_fields_index: 1,
		request_body:   	  {short_description:"hello testing"},
		post_response:  	  null
	},
	view,
	styles,
	actionHandlers
});