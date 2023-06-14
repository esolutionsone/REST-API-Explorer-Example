import { actionTypes } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export default {
    [COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => {
        dispatch('GET_USER', {
            tableName: "sys_user",
            sysparm_limit: 1,
            sysparm_query: 'sys_id=javascript:gs.getUserID()'
        });
    },
    'REST_GET': createHttpEffect("api/now/table/:tableName", {
        method:            "GET",
        pathParams:        [ "tableName" ],
        queryParams:       [ 'sysparm_query' ],
        successActionType: "GET_RESPONSE_VALE",
        errorActionType:   "LOG_ERROR"
    }),
    'REST_POST': createHttpEffect("api/now/table/:tableName", {
        method:            "POST",
        pathParams:        [ "tableName" ],
        dataParam:         "data",
        successActionType: "POST_RESPONSE_VALUE",
        errorActionType:   "LOG_ERROR"
    }),
    'fetchTables': createHttpEffect("api/now/table/:tableName", {
        method:            "GET",
        pathParams:        [ "tableName" ],
        queryParams:       [ "sysparm_limit", "sysparm_query" ],
        successActionType: "SET_TABLES_VALUE",
        errorActionType:   "LOG_ERROR",
    }),
    'GET_USER': createHttpEffect("api/now/table/:tableName", {
        method:            'GET',
        pathParams:        ['tableName'],
        queryParams:       ['sysparm_query'],
        successActionType: 'SET_USER_ID',
        errorActionType:   'LOG_ERROR'
    }),
    'SET_TABLES_VALUE': ({ action, updateState }) => {
        updateState({
          tables: action.payload.result
        });
    },
    'GET_RESPONSE_VALE': ({ action, updateState }) => {
        updateState({
            results: action.payload.result,
            loading: false
        })
    },
    'POST_RESPONSE_VALUE': ({ action, updateState }) => {
        updateState({
            postResponse: action.payload.result,
            loading: false
        })
    },
    'SET_USER_ID': ({ action, updateState }) => {
        updateState({
            user: action.payload.result,
            loading: false
        })
    },
    'LOG_ERROR': ({ action }) => console.error("LOG_ERROR", action.payload.msg, action.payload.data),
}