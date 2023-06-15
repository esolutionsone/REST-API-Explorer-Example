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
	 /* we destrucure all the variables needed from state and properties*/
	const { loading, user, methods, method, postResponse, tables } = state;
	const { title, backgroundColor, color, headerTextColor, backgroundImageUrl } = state.properties;

	/* Load state while waiting for initial fetch for logged in user */
	if (user === null){
		return <LoadingIcon style={{ transform: 'scale(.5)', backgroundColor: 'white' }}/>;
	}

	return (
		<div 
			/* 
				in-line styling is used here in order to allow user to use component properties to change the 
				background and text color.
			*/ 
			style={{
				backgroundColor : backgroundColor,
				color: 			  color
			}} 
			className="main-container">
			<div 
				style	  ={ backgroundImageUrl != '' ? { backgroundImage: `url(${ backgroundImageUrl })` }: '' } 
				className ="hero-container" >
				{/*
					this will dislay a header text using property "title". in-line styling is used here in order to 
					allow user to use component properties to change the text color.
				*/}
				<h1 style={{ color: headerTextColor, margin: '1rem 2rem' }}>{ title }</h1>

				{/* component that greets the logged in user */}
				<UserGreeting state={state} />

				{/* the area below captures all of the user inputs */}
				<div className="form-container">
					<form>
						<div className="form-spacing">
							<ChoiceInput
								state		  ={ state } 
								updateState   ={ updateState } 
								label		  ='Method:' 
								name		  ='method'
								options       ={ methods }
								defaultOption ={ method } />
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
								choices		={ tables }
								dispatch	={ dispatch } />
							<TextInput
								state		={ state } 
								updateState ={ updateState } 
								label		='Display Field:'  
								name		='displayField'  
								placeholder	='Add field to display' />
						</div>

						{ /* 
							below we are using an Object Literal which is what I can only describe as a shorthanded switch statement. 
							it looks at "method" and will render the one that matches.
						  */
							{
								"GET":  <div  className="form-spacing">
											<TextInput   
												state		={ state } 
												updateState ={ updateState } 
												label		='Query'  
												name		='query'  
												placeholder	='Add query here > ex. active=true' />
										</div> ,
								"POST": <PostFields  
											state		={ state } 
											updateState ={ updateState } />
							}[method]
						}
					</form>
				</div>
			</div>

			{/* 
				the area below will show the details of the request being made and the button that sends the request.
			*/}
			<div className='request-container'>
				<h3>Request Details:</h3>

				{/*
					Child component that renders the url that is dynamically built based on user inputs and 
					if REST request is a POST, it will render the POST body for the request.
				*/}
				<RequestDetails state={ state }/>

				{/* out-of-box ServiceNow component */}
				<now-button 
					label	 ="SEND" 
					variant  ="primary" 
					size	 ="md" 
					on-click ={ 
						() => sendRest( updateState, state, dispatch ) 
					}>
				</now-button>
			</div>

			{/* the area below is where the REST request response is displayed. */}
			<div className='response-area'>

				{/*
					we use a ternary operator to check if the response are should show loading icon, "loading" is set to true 
					when user clicks on submit button and is set to false as soon as a response is recieved. when "loading" 
					equals true, the ternary will return the loading icon otherwise, when its false it will return the object literal.
				*/}
				{loading ?
					<LoadingIcon style={{transform: 'scale(.5)', backgroundColor: backgroundColor}}/>
					:
					/* 
						below we are using an Object Literal which is what I can only describe as a shorthanded switch statement. 
						it looks at "method" and will render the one that matches.
					*/
					{
						/*
							if user is creating a GET request, then this object literal will return the value assigned to "GET".
							"ResponseTable" is a child component that will take care of the response from the GET request. This 
							component can deal with multiple records and display each one.
						*/
						"GET": 	<ResponseTable state={ state } updateState={ updateState } />,
						/*
							if user is creating a POST request, then this object literal will return the value assigned to "POST".
							The ternay will check to see if there is a response from the POST request, if none exists than "No Results"
							will be displayed at the bottom, otherwise if a response exists then it will display the record.
						*/
						"POST": postResponse != null ?
									<div className='post-response response-container' style={{ color:  color, border: `1px solid ${color}` }}>
										<h4>POST Response:</h4>
										{/*
											"Record" is a child component that will take care of the response from the POST request. This component 
											deals with the single record that was created by the user. 
										*/}
										<Record 
											key			={ 0 } 
											state		={ state } 
											updateState ={ updateState } 
											record		={ postResponse }/>
									</div>
									: 
									/* blank state if no response exists */ 
									<div className="response-container" style={{ color:  color, border: `1px solid ${color}` }}>
										<div>No Results</div> 
									</div>
					}[method]
				}
			</div>
		</div>
	);
};

createCustomElement('x-71146-testing-project', {
	/* only renderer that currently works. */ 
	renderer: {type: snabbdom},
	/* 
		intialState holds all state variables being used throughout component. To 
		use any state variable, you must initialize it here 
	*/
	initialState: {
		loading:			  true,
		required: 			  false,
		method:         	  'GET',
		methods:			  ['GET','POST'],
		table:          	  '',
		tables:         	  [],
		selectedTable: 	  	  '',
		query:          	  '',
		displayField:		  '',
		path:           	  'api/now/table/',
		results:        	  [],
		showJson: 			  [],
		user:           	  null,
		requestFields: 	      [
			{
				"fieldIndex": "field1",
				"valueIndex": "value1",
				"field":	  "",
				"value": 	  ""
			}
		],
		requestFieldsIndex:   1,
		requestBody:   	  	  {},
		postResponse:  	  	  null,
	},
	/* 
		properties holds all property variables being used throughout component. To 
		use any property variable, you must initialize it here and include it in 
		"now-ui.json". A default value must be given and they can also be changed
		in the configuration section inside of UI Builder when customizing the
		component.
	*/
	properties: {
		title: 				{ default: "Component REST API Explorer Testing:" },
		backgroundColor: 	{ default: '#000' },
		color: 				{ default: '#fff' },
		headerTextColor: 	{ default: '#fff' },
		backgroundImageUrl: { default: '' },
		table: 				{ default: "incident" },
		query: 				{ default: "" },
	},
	view,
	styles,
	actionHandlers
});