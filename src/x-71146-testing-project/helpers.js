export const set_api_value = ( updateState, event ) => {
    updateState({[event.target.name]:event.target.value});
}
export const fetch_tables = debounce(( updateState, event, table, limit, dispatch) => {
    processFetch(event, table, limit, dispatch);
    updateState({tables:[]});
});
export const send_rest = ( updateState, state, dispatch, method ) => {
    if ( method === "GET"){
        dispatch("REST_GET", {
            tableName:     state.selected_table,
            sysparm_query: state.query
        })   
    }
    else if ( method === "POST"){
        dispatch("REST_POST", {
            tableName: state.selected_table,
            body:      state.request_body     
        })
    }
}
export const add_row_fields = ( updateState, state ) => {
    const { request_fields } = state;
    let new_request_fields = [...request_fields];
    new_request_fields.push("field"+(request_fields.length+1));
    updateState({
        request_fields: new_request_fields,
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