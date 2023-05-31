
export const ResponseTable = ({ state, updateState }) => {
    const { showJson, results } = state;
    const dropDownCLicked = () => {
        updateState({
            showJson: !showJson
        })
    }
    
    return (
        <div>
            {results.map (record => {
                return (
                    <div>
                        <div>{record.short_description}<span on-click={(e) => dropDownCLicked()}>V</span></div>
                        {showJson ? 
                            <div>{JSON.stringify(record, null, 4)}</div>
                            :
                            ''
                        }
                    </div>
                )
            })}
        </div>
    )
}