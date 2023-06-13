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
import { LoadingIcon } 		  from './components/LoadingIcon/LoadingIcon';
import { RequestDetails }	  from './components/RequestDetails';
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
import { sendRest }           from './helpers';
/* END IMPORTS */


const view = (state, { updateState, dispatch }) => {

    console.log(state);
	const { loading, user } = state;
	const { title, backgroundColor, color, headerTextColor, backgroundImageUrl } = state.properties;
	//Load state while waiting for initial fetch
	if (user === null){
		return <LoadingIcon style={{transform: 'scale(.5)', backgroundColor: 'white'}}/>
	}
	return (
		<div 
			style={{
				backgroundColor : backgroundColor,
				color: 			  color
			}} 
			className="main-container">
			<div 
				style={ backgroundImageUrl != '' ? { backgroundImage: `url(${ backgroundImageUrl })` }: '' } 
				className="hero-container">
				<h1 style={{ color: headerTextColor, margin: '1rem 2rem' }}>{ title }</h1>
				<UserGreeting state={state} />
				<div className="form-container">
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
								"GET":  <TextInput   
											state		={ state } 
											updateState ={ updateState } 
											label		='Query'  
											name		='query'  
											placeholder	='Add query here > ex. active=true' />,
								"POST": <PostFields  
											state		={ state } 
											updateState ={ updateState } />
							}[state.method]
						}
					</form>
				</div>
			</div>
			<div className='request-container'>
				<h3>Request Details:</h3>
				<RequestDetails state={ state }/>
				<now-button 
					label	 ="SEND" 
					variant  ="primary" 
					size	 ="md" 
					on-click ={ 
						() => sendRest( updateState, state, dispatch ) 
					}>
				</now-button>
			</div>
			<div className='response-area'>
				{loading ?
					<LoadingIcon style={{transform: 'scale(.5)'}}/>
					:
					{
						"GET": 	<ResponseTable state={state} updateState={updateState} />,
						"POST": state.post_response != null ?
									<div className='post-response response-container'>
										<h4>POST Response:</h4>
										<Record className="test" key={0} state={state} updateState={updateState} record={state.post_response}/>
									</div>
									: 
									<div className="response-container">
											<div>No Results</div> 
									</div>
					}[state.method]
				}
			</div>
		</div>
	);
};

createCustomElement('x-71146-testing-project', {
	renderer: {type: snabbdom},
	initialState: {
		loading:			  true,
		required: 			  false,
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
		user:           	  null,
		request_fields: 	  [{"field_index":"field1","value_index":"value1","field":"","value":""}],
		request_fields_index: 1,
		request_body:   	  {short_description:"hello testing"},
		post_response:  	  null,
	},
	properties: {
		backgroundColor: 	{ default: '#000' },
		color: 				{ default: '#fff' },
		headerTextColor: 	{ default: '#fff' },
		backgroundImageUrl: { default: '' },
		table: 				{ default: "incident" },
		query: 				{ default: "" },
		title: 				{ default: "Component REST API Explorer Testing:" }
	},
	view,
	styles,
	actionHandlers
});