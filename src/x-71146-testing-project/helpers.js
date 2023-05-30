export const set_api_value = ( updateState, event ) => {
    updateState({[event.target.name]:event.target.value});
}
export const fetch_tables = debounce(( updateState, event, table, limit, dispatch) => {
    processFetch(event, table, limit, dispatch);
    updateState({tables:[]});
});
export const send_rest = ( updateState, state, dispatch ) => {
    dispatch("SEND_REST", {
        tableName:     state.selected_table,
        method:        state.method,
        sysparm_query: state.query
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