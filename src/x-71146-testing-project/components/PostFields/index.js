import { TextInput }      from "../TextInput";
import { add_row_fields } from "../../helpers";

export const PostFields = ({ state, updateState }) => {
    return (
        <div className="post_fields_container">
            {
                state.request_fields.map((field, index) =>
                    <div className="">
                        <TextInput  state={ state } updateState={ updateState } label='' name={ `field${index}` } placeholder='Field' /> - 
                        <TextInput  state={ state } updateState={ updateState } label='' name={ `value${index}` } placeholder='Value' />
                        <now-button label="x" variant="red" size="md"  on-click={ () => remove_row_field( updateState, state, index ) } />    
                    </div>
                )
            }
            <now-button label="+" variant="primary" size="md"  on-click={ () => add_row_fields( updateState, state ) } />             
        </div>
    );
}