import { Record } from "./Record";

export const ResponseTable = ({ state, updateState,  }) => {
    const { results } = state;
    
    return (
        <div>
            {results.map ((record, index) => {
                return (
                    <Record 
                        key={index} 
                        state={state} 
                        updateState={updateState} 
                        record={record} 
                    />
                )
            })}
        </div>
    )
}