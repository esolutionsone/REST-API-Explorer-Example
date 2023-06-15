/* Import TextInput component and updateRowFields function from helpers */
import { TextInput }      from "../TextInput";
import { updateRowFields } from "../../helpers";

export const PostFields = ({ state, updateState }) => {
    /* Destructure request_fields from state */
    const { request_fields } = state;
    return (
        <div className="post-fields-container">
            {/* For each row in request fields, render a field and value input
            to capture the values to build the JSON request body. */}
            { state.request_fields.map((field, index) => {
                return (
                    <div className="post-fields-row">
                        <TextInput  
                            state       ={ state } 
                            updateState ={ updateState } 
                            label       ='' 
                            name        ={ field["field_index"] } 
                            placeholder ='Field' 
                            value       ={ field["field"] } /> 
                        <span className="post-fields-spacing">-</span> 
                        <TextInput  
                            state       ={ state } 
                            updateState ={ updateState } 
                            label       ='' 
                            name        ={ field["value_index"] } 
                            placeholder ='Value' 
                            value       ={ field["value"] } />
                        {/* If there is more than 1 row of post fields, add the trash
                        can button to allow for the removal of rows. updateRowFields function
                        removes rows on click when given "remove" option at the index the trash can
                        is clicked. */}
                        { (request_fields.length > 1) ? 
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