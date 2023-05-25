export const set_api_value = ( updateState, event ) => {
    updateState({[event.target.name]:event.target.value});
}
export const fetch_tables = ( event, table, limit, dispatch ) => {
    debounce(() => processFetch( event, table, limit, dispatch ));
}
let processFetch = ( event, table, limit, dispatch ) => {
    console.log('fetchin tables')
    dispatch("FETCH_TABLES", {
        tableName: table,
        sysparm_limit: limit,
        sysparm_query: 'labelSTARTSWITH'+event.target.value
    });
}
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        console.log(args)
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}