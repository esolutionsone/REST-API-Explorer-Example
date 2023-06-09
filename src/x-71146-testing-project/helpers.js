
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
export const set_api_value = ( updateState, state, event ) => {
    /* If the name is in the state, it's one of the form values, if not it's one of the post fields! */
    if (event.target.name in state){updateState({[event.target.name]:event.target.value});}
    else if(state.methods.includes(event.target.value)){updateState({ method: event.target.value });}
    else {
        const { request_fields } = state;
        let new_request_fields = [...request_fields];
        request_fields.forEach(( field, index ) => {
            if      ( event.target.name == field['field_index'] ){ new_request_fields[index]['field'] = event.target.value; }
            else if ( event.target.name == field['value_index'] ){ new_request_fields[index]['value'] = event.target.value; }
        });
        updateState({
            request_fields:new_request_fields
        });
    }
}
export const fetch_tables = debounce(( updateState, event, table, limit, dispatch) => {
    processFetch(event, table, limit, dispatch);
    updateState({tables:[]});
});
export const send_rest = ( updateState, state, dispatch ) => {
    updateState({
        showJson:       [],
        results:        [],
        post_response:  null,
        request_body:   {},
        request_fields: [{"field_index":"field15","value_index":"value15","field":"","value":""}],
        loading: true
    })
    
    if ( state.method === "GET"){
        dispatch("REST_GET", {
            tableName:     state.selected_table,
            sysparm_query: state.query
        })   
    }
    else if ( state.method === "POST"){
        let post_request_body = {};
        state.request_fields.forEach( field => {
            post_request_body[field['field']] = field['value'];
        });
        updateState({ request_body: post_request_body });
        dispatch("REST_POST", {
            tableName: state.selected_table,
            data:      post_request_body
        })
    }
}
export const update_row_fields = ( updateState, state, action, index = 0 ) => {
    const { request_fields } = state;
    let index_num = state.request_fields_index;
    let new_request_fields = [...request_fields];
    if ( action === "add" ){
        index_num += 1;
        new_request_fields.push({"field_index":("field"+index_num),"value_index":("value"+index_num),"field":"","value":""});     
    }
    else if ( action === "remove" ){
        let temp_list      = new_request_fields.slice(0,index).concat(new_request_fields.slice(index+1));
        new_request_fields = [...temp_list];
    }
    updateState({
        request_fields:       new_request_fields,
        request_fields_index: index_num       
    })
}
let processFetch = ( event, table, limit, dispatch ) => {
    dispatch("FETCH_TABLES", {
        tableName: table,
        sysparm_limit: limit,
        sysparm_query: 'labelSTARTSWITH'+event
    });
}
export const select_table = ( updateState, name, label ) => {
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