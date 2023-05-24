import { actionTypes }      from "@service-now/ui-core"
import { createHttpEffect } from "@service-now/ui-effect-http"

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export default {
    [COMPONENT_BOOTSTRAPPED]: ({ state, dispatch }) => {
        dispatch("FETCH_TABLES", {
          view: formView,
          table,
          groupBy,
          query,
          orderAsc,
          sortedColumn,
          limit,
          lazyLoads,
          fields: [],
        });
    },
    FETCH_LIST_DATA: createHttpEffect("api/now/table/sys_db_object", {
    method: "GET",
    successActionType: "SET_TABLES_VALUE",
    errorActionType: "LOG_ERROR",
    }),
    SET_TABLES_VALUE:({ action, updateState }) => {
        console.log(action.payload.result);
        updateState({
            tables:action.payload.result
        })
    },
    LOG_ERROR: ({ action }) => console.error("LOG_ERROR", action.payload.msg, action.payload.data),
}