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
    const { methods, requestFields } = state;
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
        let new_request_fields   = [...requestFields];
        requestFields.forEach(( field, index ) => {
            if (event.target.name == field['field_index']) {
                new_request_fields[index]['field'] = event.target.value; 
            } else if (event.target.name == field['value_index']) {
                new_request_fields[index]['value'] = event.target.value;
            }
        });
        updateState({
            requestFields:new_request_fields
        });
    }
}
export const fetchTables = debounce(( updateState, event, table, limit, dispatch) => {
    if (event === '') {
        updateState({
            table:          '',
            selected_table: '',
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
    const { table, query, displayField, method, requestFields } = state;
    switch (method) {
        case "POST":
            if (table                   === '' || 
                requestFields[0].field === '' || 
                requestFields[0].value === '' || 
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
    updateState({
        loading:  true,
        required: false
    });
    processREST(updateState, state, dispatch);
});
export const updateRowFields = ( updateState, state, action, index = 0 ) => {
    const { requestFields, requestFieldsIndex } = state;
    let index_num          = requestFieldsIndex;
    let new_request_fields = [...requestFields];
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
        requestFields:       new_request_fields,
        requestFieldsIndex: index_num       
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
    const { method, selected_table, query, requestFields } = state;
    if (method === "GET"){
        dispatch("REST_GET", {
            tableName:     selected_table,
            sysparm_query: query
        })   
    } else if (method === "POST"){
        let post_request_body = {};
        requestFields.forEach( field => {
            post_request_body[field['field']] = field['value'];
        });
        updateState({
            requestBody: post_request_body
        });
        dispatch("REST_POST", {
            tableName: selected_table,
            data:      post_request_body
        })
    }
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