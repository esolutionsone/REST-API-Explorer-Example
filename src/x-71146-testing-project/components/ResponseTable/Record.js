import { dropDownClicked } from "../../helpers";

/* In order to access the props("key", "state", "updateState", "record") that were passed down from the parent 
component(ResponseTable/index.js) we need to destructure them. */
export const Record = ({ key, state, updateState, record }) => {
    /* Next, we destrucure all the variables needed from state */
    const { showJson, displayField } = state;
    /* showJson is an array in state that will hold the index number for the records
    that were clicked on to show json details. */

    return (
        <div className="record-container">
            <div className="record-header">
                { record[displayField] ? record[displayField] : `" "` }
                <now-icon 
                    value     ={ key } 
                    icon      ="chevron-down-fill" 
                    size      ="md" 
                    className ={ 
                        `chevron-icon ` + (showJson.indexOf(key) === -1 ? "active" : "inactive")
                    }
                    on-click  ={ 
                        (e) => dropDownClicked(e.target.value, showJson, updateState) 
                    } >
                </now-icon>
            </div>
            {/* using a ternary, we can conditionaly render the details for each record
            if they're index number exist in showJson */}
            { showJson.indexOf(key) === -1 ? 
                /* using classes "hide" and "show" we can animate the collapse/uncollapse of the details. */
                <textarea 
                    className ="record-details hide" 
                    value     ={ JSON.stringify(record, undefined, "\t") } 
                    readonly >
                </textarea>
                :
                <textarea 
                    className ="record-details show" 
                    value     ={ JSON.stringify(record, undefined, "\t") } 
                    readonly >
                </textarea>
            }
        </div>
    )
}
