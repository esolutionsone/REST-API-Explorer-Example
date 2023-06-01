import { nowIcon } from '@servicenow/now-icon';


export const Record = ({ key, state, updateState, record }) => {

    const { showJson } = state;
    const dropDownClicked = (clickedKey) => {
        if (showJson.length === 0) {
            updateState({
                showJson: [clickedKey]
            })
            return;
        } 
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
        <div>
            <div>
                {record.short_description}
                <now-icon 
                    value={key} 
                    icon="chevron-down-fill" 
                    size="md" 
                    on-click={(e) => dropDownClicked(e.target.value)}>
                </now-icon>
            </div>
            {showJson.indexOf(key) === -1 ? 
                ''
                :
                <div>{JSON.stringify(record, null, 4)}</div>
            }
        </div>
             
    )
}
