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
    /* Destructure methods and request_fields from state */
    const { methods, request_fields } = state;
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
        let new_request_fields   = [...request_fields];
        request_fields.forEach(( field, index ) => {
            if (event.target.name == field['field_index']) {
                new_request_fields[index]['field'] = event.target.value; 
            } else if (event.target.name == field['value_index']) {
                new_request_fields[index]['value'] = event.target.value;
            }
        });
        updateState({
            request_fields:new_request_fields
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
        updateState({
            table:          '',
            selected_table: '',
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
export const sendRest = debounce(( updateState, state, dispatch) => {
    /* This funciton uses debounce to ensure the processFetch function isn't continually
    called. It should only call once every 300ms. */

    /* Destructure state to get table, query, displayField, method, and request_fields */
    const { table, query, displayField, method, request_fields } = state;
    /* Handle POST and GET mandatory field validation. If mandatory fields are not populated
    add alert, highlight mandatory fields, and return prior to updating state. */
    switch (method) {
        case "POST":
            if (table                   === '' || 
                request_fields[0].field === '' || 
                request_fields[0].value === '' || 
                displayField            === '') {
                    alert('Please fill out required fields. (Table, Display Field, Field, and Value)');
                    updateState({
                        required: true
                    })
                    return;
            }
            break;
        case "GET":
            if (table === '' || query === '' || displayField === '') {
                alert('Please fill out required fields. (Table, Display Field, and Query)');
                updateState({
                    required: true
                })
                return;
            }
            break;
        default:
            break;
    }
    /* Set loading to true and required to false and call processREST function and update state */
    updateState({
        loading:  true,
        required: false
    });
    processREST(updateState, state, dispatch);
});
export const updateRowFields = ( updateState, state, action, index = 0 ) => {
    const { request_fields, request_fields_index } = state;
    let index_num          = request_fields_index;
    let new_request_fields = [...request_fields];
    if (action === "add"){
        index_num += 1;
        new_request_fields.push({
            "field_index": ("field"+index_num),
            "value_index": ("value"+index_num),
            "field":       "",
            "value":       ""
        });
    } else if (action === "remove"){
        let temp_list      = new_request_fields.slice(0,index).concat(new_request_fields.slice(index+1));
        new_request_fields = [...temp_list];
    }
    updateState({
        request_fields:       new_request_fields,
        request_fields_index: index_num       
    })
}
let processFetch = ( event, table, limit, dispatch ) => {
    dispatch("FETCH_VALUES", {
        tableName:     table,
        sysparm_limit: limit,
        sysparm_query: 'labelSTARTSWITH'+event
    });
}
let processREST =  ( updateState, state, dispatch ) => {
    const { method, selected_table, query, request_fields } = state;
    if (method === "GET"){
        dispatch("REST_GET", {
            tableName:     selected_table,
            sysparm_query: query
        })   
    } else if (method === "POST"){
        let post_request_body = {};
        request_fields.forEach( field => {
            post_request_body[field['field']] = field['value'];
        });
        updateState({
            request_body: post_request_body
        });
        dispatch("REST_POST", {
            tableName: selected_table,
            data:      post_request_body
        })
    }
}
export const selectValue = ( updateState, name, label, item ) => {
    if ( item === 'table' ){
        selectTable( updateState, name, label );
    }
    //else if ( item === 'ex.' ){}
}
export const selectTable = ( updateState, name, label ) => {
    updateState({
        table:          label,
        selected_table: name,
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