import { TextInput }      from "../TextInput";
import { updateRowFields } from "../../helpers";

export const PostFields = ({ state, updateState }) => {
    const { request_fields } = state;
    return (
        <div className="post-fields-container">
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