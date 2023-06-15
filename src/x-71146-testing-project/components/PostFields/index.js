/* Import TextInput component and updateRowFields function from helpers */
import { TextInput }      from "../TextInput";
/* importing function from helpers */
import { updateRowFields } from "../../helpers";

/* In order to access the props("state", "updateState") that were passed down from the parent component(view)
we need to destructure them. */
export const PostFields = ({ state, updateState }) => {
    /* Next, we destrucure all the variables needed from state */
    const { requestFields } = state;
    return (
        <div className="post-fields-container">
            {/* For each row in request fields, render a field and value input
            to capture the values to build the JSON request body. */}
            { state.requestFields.map((field, index) => {
                return (
                    <div className="post-fields-row">
                        <TextInput  
                            state       ={ state } 
                            updateState ={ updateState } 
                            label       ='' 
                            name        ={ field["fieldIndex"] } 
                            placeholder ='Field' 
                            value       ={ field["field"] } /> 
                        <span className="post-fields-spacing">-</span> 
                        <TextInput  
                            state       ={ state } 
                            updateState ={ updateState } 
                            label       ='' 
                            name        ={ field["valueIndex"] } 
                            placeholder ='Value' 
                            value       ={ field["value"] } />
                        {/* If there is more than 1 row of post fields, add the trash
                        can button to allow for the removal of rows. updateRowFields function
                        removes rows on click when given "remove" option at the index the trash can
                        is clicked. */}
                        { (requestFields.length > 1) ? 
                            <span className="post-fields-spacing">
                                <now-button-iconic 
                                    icon     ="trash-outline" 
                                    variant  ="tertiary" 
                                    size     ="sm"  
                                    on-click ={
                                        () => updateRowFields( updateState, state, "remove", index )
                                    } />
                            </span>
                            :
                            ''
                        }
                    </div>
                )
            })}
            {/* Button to add additional rows, calls updateRowFields with add */}
            <now-button-iconic 
                icon     ="plus-outline" 
                variant  ="primary" 
                size     ="sm"  
                on-click ={ 
                    () => updateRowFields( updateState, state, "add" )
                } />             
        </div>
    );
}