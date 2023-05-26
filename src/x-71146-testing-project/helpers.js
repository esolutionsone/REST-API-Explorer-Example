export const set_api_value = ( updateState, event ) => {
    updateState({[event.target.name]:event.target.value});
}
export const fetch_tables = debounce((event, table, limit, dispatch) => {
    processFetch(event, table, limit, dispatch);
  });
let processFetch = ( event, table, limit, dispatch ) => {
    console.log(event, table, limit);
    dispatch("FETCH_TABLES", {
        tableName: table,
        sysparm_limit: limit,
        sysparm_query: 'labelSTARTSWITH'+event
    });
}
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}