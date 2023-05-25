import { actionTypes } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export default {
    [COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => {
        dispatch('FETCH_TABLES', {
            tableName: "sys_db_object",
            sysparm_limit: 20,
            sysparm_query: ''
        });
    },
    'FETCH_TABLES': createHttpEffect("api/now/table/:tableName", {
        method: "GET",
        pathParams:  [ "tableName" ],
        queryParams: [ "sysparm_limit", "sysparm_query" ],
        successActionType: "SET_TABLES_VALUE",
        errorActionType: "LOG_ERROR",
    }),
    'SET_TABLES_VALUE': ({ action, updateState }) => {
        console.log('should update value');
        updateState({
          tables: action.payload.result
        });
    },
    'LOG_ERROR': ({ action }) => console.error("LOG_ERROR", action.payload.msg, action.payload.data),
}