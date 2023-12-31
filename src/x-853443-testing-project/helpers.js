/* Called by Record (a subcomponent of ResponseTable) */
export const dropDownClicked = ( clickedKey, showJson, updateState ) => {
    /* a function that will either add the clicked records index to showJson 
    or remove it from showJson */

    /* if showJson is empty, add the index for the record that was clicked */
    if (showJson.length === 0) {
        updateState({
            showJson: [clickedKey]
        })
        return;
    } 
    /* loops through each index stored in showJson and compares it to the
    clicked records' index. If the clicked index doesn't exist in showJson,
    add it to showJson otherwise if it does exist, remove it */
    showJson.forEach(jsonKey => {
        if (jsonKey !== clickedKey) {
            updateState({
                showJson: [...showJson, clickedKey]
            })
            return;
        } else {
            const index = showJson.indexOf(clickedKey);
            showJson.splice(index, 1);
            updateState({
                showJson: [...showJson]
            })
        }
    });
}
/* Called by ChoiceInput & TextInput */
export const setApiValue = ( updateState, state, event ) => {
    /* we destrucure all the variables needed from state */
    const { methods, requestFields } = state;
    /* updating state variables reinitialize whenever user switches Methods on UI */
    updateState({
        required: false,
        query:    ''
    })
    /*  
        If the name is in the state, it's one of the form values, 
        else if the methods include the target value, it's one of the method
        else it's one of the post fields! 
        
        Each of these require updating different elements in the state
            The name of the element should align with the state var name so we can update
            that directly ([event.target.name] should be the state var name) and set the value
            as the event target value

            Else If it's method, the current method should be updated in state 

            Else we'll have to loop through the request_fields (Post Fields) to find if the updated
            value is a field or value. When the value is found, update the new_request_fields which 
            is just a copy of the current value of the request_fields value from state. Update state with 
            the new request fields values.
    */
    if (event.target.name in state){
        updateState({
            [event.target.name]: event.target.value
        });
    } else if (methods.includes(event.target.value)) {
        updateState({
            method: event.target.value 
        });
    } else {
        let newRequestFields   = [...requestFields];
        requestFields.forEach(( field, index ) => {
            if (event.target.name == field['fieldIndex']) {
                newRequestFields[index]['field'] = event.target.value; 
            } else if (event.target.name == field['valueIndex']) {
                newRequestFields[index]['value'] = event.target.value;
            }
        });
        updateState({
            requestFields: newRequestFields
        });
    }
}
/* Called by TypeAheadReference */
export const fetchValues = debounce(( updateState, event, table, limit, dispatch) => {
    /* This funciton uses debounce to ensure the processFetch function isn't continually
    called. It should only call once every 300ms. */
    
    /* If the event is an empty string, the lookup field has been cleared out,
    in this case clear the state values associated with the lookup field & return */
    if (event === '') {
        /* updating state to reinitialize variables */
        updateState({
            table:          '',
            selectedTable:  '',
            tables:         []
        })
        return;
    }
    /* Call processFetch and clear table values as we're going to be updating this in
    the actionHandler callback*/
    processFetch(event, table, limit, dispatch);
    updateState({
        tables: []
    });
});
/* Called by REST API "Main" Component when Send button is pressed */ 
export const sendRest = debounce(( updateState, state, dispatch) => {
    /* This funciton uses debounce to ensure the processFetch function isn't continually
    called. It should only call once every 300ms. */

    /* Destructure state to get table, query, displayField, method, and request_fields */
    const { table, query, displayField, method, requestFields } = state;
    /* Handle POST and GET mandatory field validation. If mandatory fields are not populated
    add alert, highlight mandatory fields, and return prior to updating state. */
    switch (method) {
        case "POST":
            if (table                  === '' || 
                requestFields[0].field === '' || 
                requestFields[0].value === '' || 
                displayField           === '') {
                    alert('Please fill out required fields. (Table, Display Field, Field, and Value)');
                    /* while "required" is equal to true, the input boxes will turn red to show users
                     which fields must be filled out */
                    updateState({
                        required: true
                    })
                    return;
            }
            break;
        case "GET":
            if (table === '' || query === '' || displayField === '') {
                alert('Please fill out required fields. (Table, Display Field, and Query)');
                /* while "required" is equal to true, the input boxes will turn red to show users
                 which fields must be filled out */
                updateState({
                    required: true
                })
                return;
            }
            break;
        default:
            break;
    }
    /* updating state to begin loading state while the REST call is being made(it is reset
        after the response is recieved) and the required fields reset to their original
        color */
    updateState({
        loading:  true,
        required: false
    });
    processREST(updateState, state, dispatch);
});
/* Called by PostFields Component */
export const updateRowFields = ( updateState, state, action, index = 0 ) => {
    /* Destructuring request_fields and request_fields_index from state & initializing vars 
            The index_num will continually increment to avoid potentially creating duplicate 
            keys >> the index only ever increasing on add (and not decrimenting on remove) will
            ensure the unique input field names.
        
            The request_fields hold the index values and the actual field name and values to be used
            in the post request. 
    */
    const { requestFields, requestFieldsIndex } = state;
    let indexNum          = requestFieldsIndex;
    let newRequestFields = [...requestFields];
    /* If adding, we increment the index and we build a new empty row with the new index > this will
    trigger a re-render to add a new set of empty field and value input fields on the PostFields Component*/
    if (action === "add"){
        indexNum += 1;
        newRequestFields.push({
            "fieldIndex": ("field"+indexNum),
            "valueIndex": ("value"+indexNum),
            "field":       "",
            "value":       ""
        });
    } else if (action === "remove"){
        /* else if we're removing, simply slice the clicked trashcan index out of the array */
        let tempList      = newRequestFields.slice(0,index).concat(newRequestFields.slice(index+1));
        newRequestFields = [...tempList];
    }
    /* Update state with teh new request fields and new/current index number (depending on add or remove) */ 
    updateState({
        requestFields:       newRequestFields,
        requestFieldsIndex:  indexNum      
    })
}
/* Called by fetchValues function above */
let processFetch = ( event, table, limit, dispatch ) => {
    /* Dispatch FETCH_VALUES action to the actionHandlers. tableName, sysparm_limit, and 
    sysparm_query variables are set for the dispatch.*/
    dispatch("FETCH_VALUES", {
        tableName:     table,
        sysparm_limit: limit,
        sysparm_query: 'labelSTARTSWITH'+event
    });
}
/* Called by the sendRest function above */
let processREST =  ( updateState, state, dispatch ) => {
    /* Destructuring method, selected_table, query, and rest_fields from state*/
    const { method, selectedTable, query, requestFields } = state;
    /* Send either a GET or POST dispatch depending on the selected method */
    if (method === "GET"){
        /*  if GET 
            Dispatch the REST_GET action to the actionHandlers with the tableName 
            and sysparm_query variables */
        dispatch("REST_GET", {
            tableName:     selectedTable,
            sysparm_query: query
        })   
    } else if (method === "POST"){
        /*  else if POST
            Create the post body by looping through request_fields (which is populated
            by the PostFields component) > This takes the field and value from each 
            request_fields object and creates the POST body for the REST message. 
            The request body is updated in the state and then the REST_POST action is 
            dispatched to the actionHandlers */
        let postRequestBody = {};
        requestFields.forEach( field => {
            postRequestBody[field['field']] = field['value'];
        });
        updateState({
            requestBody: postRequestBody
        });
        dispatch("REST_POST", {
            tableName: selectedTable,
            data:      postRequestBody
        })
    }
}
/* Called by the TypeAheadReference Component */
export const selectValue = ( updateState, name, label, item ) => {
    /* To make this comonent more generic, we added the ability to pass in
    an item > this allows us to call a different function based on the specific 
    typeahead that's selecteed > we only have one in our application. 
    There are definitely better / more dynamic ways to do this but we felt this 
    was more easily readable and a simple solution for our example component.*/
    if ( item === 'table' ){
        selectTable( updateState, name, label );
    }
    //else if ( item === 'ex.' ){}
}
/* Called by the selectValue function above*/
export const selectTable = ( updateState, name, label ) => {
    /* Update state with the selected table details and clear the 
    dropdown value in the tables array */
    updateState({
        table:          label,
        selectedTable:  name,
        tables:         []
    });
}
/* Used by the fetchValues and sendRest functions above */
function debounce(func, timeout = 300){
    /* This function will call the function that is passed in after the timer 
    times out >> this is indended to reduce calls to the server and not allow 
    the user to "spam click" the send button or cause the on keyup function to 
    send a call with every keypress */
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}