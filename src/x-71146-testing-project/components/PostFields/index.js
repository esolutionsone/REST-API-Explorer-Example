import { TextInput }      from "../TextInput";
import { update_row_fields } from "../../helpers";

export const PostFields = ({ state, updateState }) => {
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
                        { (state.request_fields.length > 1) ? 
                            <span className="post-fields-spacing">
                                <now-button-iconic 
                                    icon     ="trash-outline" 
                                    variant  ="tertiary" 
                                    size     ="sm"  
                                    on-click ={
                                        () => update_row_fields( updateState, state, "remove", index )
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
                    () => update_row_fields( updateState, state, "add" )
                } />             
        </div>
    );
}