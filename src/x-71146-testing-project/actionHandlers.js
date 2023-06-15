import { actionTypes } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export default {
    /* When the component is bootstrapped (loads / renders to the window) 
    dispatch the GET_USER action with the tableName, sysparm_limit, and 
    sysparm_query as variables */
    [COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => {
        dispatch('GET_USER', {
            tableName: "sys_user",
            sysparm_limit: 1,
            sysparm_query: 'sys_id=javascript:gs.getUserID()'
        });
    },
    /* Dispatch sent by the processRest function in helpers
        follow the createHttpEffect pattern below to send a GET message
        via the table API 
        createHttpEffect can be a bit finicky so follow the pattern as closely
        as possible 
        On successs callback is GET_RESPONSE_VALUE. On failure callback is LOG_ERROR */
    'REST_GET': createHttpEffect("api/now/table/:tableName", {
        method:            "GET",
        pathParams:        [ "tableName" ],
        queryParams:       [ 'sysparm_query' ],
        successActionType: "GET_RESPONSE_VALE",
        errorActionType:   "LOG_ERROR"
    }),
    /*  Dispatch sent by the processRest function in helpers
        follow the createHttpEffect pattern below to send a POST message
        via the table API >> This will create a record with the body provided in
        your ServiceNow instance
        createHttpEffect can be a bit finicky so follow the pattern as closely
        as possible > for some reason naming the dataParm a var name different than
        data caused issues...so if you're having issues try naming it data? */
    'REST_POST': createHttpEffect("api/now/table/:tableName", {
        method:            "POST",
        pathParams:        [ "tableName" ],
        dataParam:         "data",
        successActionType: "POST_RESPONSE_VALUE",
        errorActionType:   "LOG_ERROR"
    }),
    /* Dispatch sent by the processFetch function in helpers
        follow the createHttpEffect pattern below to send a GET message
        via the table API > This function is used to fetch the tables for our
        typehaead reference field.
        createHttpEffect can be a bit finicky so follow the pattern as closely
        as possible */
    'FETCH_VALUES': createHttpEffect("api/now/table/:tableName", {
        method:            "GET",
        pathParams:        [ "tableName" ],
        queryParams:       [ "sysparm_limit", "sysparm_query" ],
        successActionType: "SET_TABLES_VALUE",
        errorActionType:   "LOG_ERROR",
    }),
    /* Dispatch sent on bootstrap >> essentially running the same
    as the REST_GET above but specifically for fetching the user */
    'GET_USER': createHttpEffect("api/now/table/:tableName", {
        method:            'GET',
        pathParams:        ['tableName'],
        queryParams:       ['sysparm_query'],
        successActionType: 'SET_USER_ID',
        errorActionType:   'LOG_ERROR'
    }),
    /* Callback function for FETCH_VALUES > sets the value of the tables
    array for the dropdown in the TypeAheadReference field*/
    'SET_TABLES_VALUE': ({ action, updateState }) => {
        updateState({
          tables: action.payload.result
        });
    },
    /* Callback function for REST_GET > sets the value of results and 
    sets loading state to false > this will cause a re-render and will show
    the results from your ServiceNow instance */
    'GET_RESPONSE_VALE': ({ action, updateState }) => {
        updateState({
            results: action.payload.result,
            loading: false
        })
    },
    /* Callback function for REST_POST > sets the value of post_response and
    sets loading to false. This will cause the post_response to be shown on screen
    when the screen re-renders. */
    'POST_RESPONSE_VALUE': ({ action, updateState }) => {
        updateState({
            post_response: action.payload.result,
            loading: false
        })
    },
    /* Callback function for GET_USER > sets the value of the user in state and 
    sets loading to false */
    'SET_USER_ID': ({ action, updateState }) => {
        updateState({
            user: action.payload.result,
            loading: false
        })
    },
    /* Callback function for all actions in actionHandlers if there is an issue in the request */
    'LOG_ERROR': ({ action }) => console.error("LOG_ERROR", action.payload.msg, action.payload.data),
}