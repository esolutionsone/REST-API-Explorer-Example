import { set_api_value } from "../../helpers"

export const TextInput = ( state, updateState, label, name, placeholder ) => {
    return  <div>
                <h3>{ label }</h3>
                <input
                    type="text"
                    name={ name }
                    placeholder={ placeholder }
                    on-change={ (e) => set_api_value( updateState, e ) }
                    value={ state[name] }
                ></input>
            </div>
}