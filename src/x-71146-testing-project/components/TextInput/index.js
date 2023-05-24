import { set_api_value } from "../../helpers"

export const TextInput = ({ state, updateState, label, name, placeholder }) => {
    return (
        <div>
            <label for={ name }>{ label }</label>
            <input
                type="text"
                id={ name }
                name={ name }
                placeholder={ placeholder }
                on-change={ (e) => set_api_value( updateState, e ) }
                value={ state[name] }
            ></input>
        </div>
    )
}