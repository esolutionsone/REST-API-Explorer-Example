
export const Record = ({ key, state, updateState, record }) => {
    /* showJson is an array in state that will hold the index number for the records
    that were clicked on to show json details.  */
    const { showJson } = state;

    /* a function that will either add the clicked records index to showJson 
    or remove it from showJson */
    const dropDownClicked = (clickedKey) => {
        /* if showJson is empty, add the index for the record that was clicked */
        if (showJson.length === 0) {
            updateState({
                showJson: [clickedKey]
            })
            return;
        } 
        /* loops through each index stored in showJson and compares it to the
        clicked records' index. If the clicked index doesn't exist in showJson,
        add it to showJson otherwise if it does exist, remove it */
        showJson.forEach(jsonKey => {
            if (jsonKey !== clickedKey) {
                updateState({
                    showJson: [...showJson, clickedKey]
                })
                return;
            } else {
                const index = showJson.indexOf(clickedKey);
                showJson.splice(index, 1);
                updateState({
                    showJson: [...showJson]
                })
            }
        });
    }
    
    return (
        <div className="record-container">
            <div className="record-header">
                Short Desctiption: { record.short_description }
                <now-icon 
                    value={ key } 
                    className={ 
                        `chevron-icon ` + (showJson.indexOf(key) === -1 ? "active" : "inactive")
                    }
                    icon="chevron-down-fill" 
                    size="md" 
                    on-click={ (e) => dropDownClicked(e.target.value) }>
                </now-icon>
            </div>
            {/* using a ternary, we can conditionaly render the details for each record
            if they're index number exist in showJson */}
            {showJson.indexOf(key) === -1 ? 
                ''
                :
                <div className="record-details">{JSON.stringify(record, null, 4)}</div>
            }
        </div>
             
    )
}
