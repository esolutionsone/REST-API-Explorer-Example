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
export const setApiValue = ( updateState, state, event ) => {
    /* we destrucure all the variables needed from state */
    const { methods, requestFields } = state;
    /* updating state variables reinitialize whenever user switches Methods on UI */
    updateState({
        required: false,
        query:    ''
    })
    /* If the name is in the state, it's one of the form values, if not it's one of the post fields! */
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
export const fetchTables = debounce(( updateState, event, table, limit, dispatch) => {
    /* event is a string being pass as a parameter when this function is called */
    if (event === '') {
        /* updating state to reinitialize variables */
        updateState({
            table:          '',
            selectedTable:  '',
            tables:         []
        })
        return;
    }
    processFetch(event, table, limit, dispatch);
    updateState({
        tables: []
    });
});
export const sendRest = debounce(( updateState, state, dispatch) => {
    /* we destrucure all the variables needed from state */
    const { table, query, displayField, method, requestFields } = state;
    /* this switch statement handles the required fields functionality. */
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
export const updateRowFields = ( updateState, state, action, index = 0 ) => {
    /* we destrucure all the variables needed from state */
    const { requestFields, requestFieldsIndex } = state;
    let indexNum          = requestFieldsIndex;
    let newRequestFields = [...requestFields];
    if (action === "add"){
        indexNum += 1;
        newRequestFields.push({
            "fieldIndex": ("field"+indexNum),
            "valueIndex": ("value"+indexNum),
            "field":       "",
            "value":       ""
        });
    } else if (action === "remove"){
        let tempList      = newRequestFields.slice(0,index).concat(newRequestFields.slice(index+1));
        newRequestFields = [...tempList];
    }
    updateState({
        requestFields:       newRequestFields,
        requestFieldsIndex:  indexNum      
    })
}
let processFetch = ( event, table, limit, dispatch ) => {
    dispatch("fetchTables", {
        tableName:     table,
        sysparm_limit: limit,
        sysparm_query: 'labelSTARTSWITH'+event
    });
}
let processREST =  ( updateState, state, dispatch ) => {
    /* we destrucure all the variables needed from state */
    const { method, selectedTable, query, requestFields } = state;
    if (method === "GET"){
        dispatch("REST_GET", {
            tableName:     selectedTable,
            sysparm_query: query
        })   
    } else if (method === "POST"){
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
export const selectTable = ( updateState, name, label ) => {
    updateState({
        table:          label,
        selectedTable:  name,
        tables:         []
    });
}
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}