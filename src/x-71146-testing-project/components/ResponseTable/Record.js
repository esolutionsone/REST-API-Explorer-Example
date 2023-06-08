import { dropDownClicked } from "../../helpers";

export const Record = ({ key, state, updateState, record }) => {
    /* showJson is an array in state that will hold the index number for the records
    that were clicked on to show json details.  */
    const { showJson } = state;

    return (
        <div className="record-container">
            <div className="record-header">
                <span className="record-title">Short Desctiption: </span>
                { record.short_description }
                <now-icon 
                    value     ={ key } 
                    className ={ 
                        `chevron-icon ` + (showJson.indexOf(key) === -1 ? "active" : "inactive")
                    }
                    icon      ="chevron-down-fill" 
                    size      ="md" 
                    on-click  ={ 
                        (e) => dropDownClicked(e.target.value, showJson, updateState) 
                    }>
                </now-icon>
            </div>
            {/* using a ternary, we can conditionaly render the details for each record
            if they're index number exist in showJson */}
            { showJson.indexOf(key) === -1 ? 
                /* using classes "hide" and "show" I can animate the collapse/uncollapse of the details */
                <div className="record-details hide">
                    { JSON.stringify(record, undefined, "\t") }
                </div>
                :
                <textarea 
                    className ="record-details show" 
                    value     ={ JSON.stringify(record, undefined, "\t") } 
                    readonly>
                </textarea>
            }
        </div>
    )
}
