import { actionTypes } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export default {
    [COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => {
        dispatch("FETCH_TABLES", {
            tableName: "sys_db_object",
            sysparm_display_value: "all",
        });
    },
    FETCH_TABLES: createHttpEffect("api/now/table/:tableName", {
        method: "GET",
        pathParams:  [ "tableName" ],
        queryParams: [ "sysparm_display_value" ],
        successActionType: "SET_TABLES_VALUE",
        errorActionType: "LOG_ERROR",
    }),
    SET_TABLES_VALUE: ({ action, updateState }) => {
        console.log("hey");
        console.log(action.payload.result);
        updateState({
          tables: "testing"
        });
    },
    LOG_ERROR: ({ action }) => console.error("LOG_ERROR", action.payload.msg, action.payload.data),
}