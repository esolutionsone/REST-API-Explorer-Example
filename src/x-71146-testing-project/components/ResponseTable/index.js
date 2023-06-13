/* Importing "child component" */
import { Record } from "./Record";

/* state and updateState are props that were passed down from the "parent component" (view) */
export const ResponseTable = ({ state, updateState }) => {
    /* results will hold the array of records that was requested by the user */
    const { results, displayField } = state;
    const { color } = state.properties;
    
    return (
        <div className="response-container" style={{ color:  color, border: `1px solid ${color}` }}>
            {/* this will conditionally render "No Results" if results list is empty */}
            { results.length === 0 ? 
                <div>No Results</div> 
                : 
                /* this will map through each record and display one at a time. 
                Props are passed down for "child component" (Record) to use. */
                <div>
                    <h3>{ displayField }:</h3>
                    { results.map ((record, index) => {
                        return (
                            <Record 
                                key         ={index} 
                                state       ={state} 
                                updateState ={updateState} 
                                record      ={record} />
                        )
                    })}
                </div>
                
            }
        </div>
    )
}