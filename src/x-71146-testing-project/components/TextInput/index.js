import { set_api_value } from "../../helpers"

export const TextInput = ({ state, updateState, label, name, placeholder, value = '' }) => {
    return (
        <div  className="text-input-container">
            <label for={ name }>{ label }</label>
            { name === 'path' ?
                <input
                    type        ="text"
                    id          ={ name }
                    name        ={ name }
                    placeholder ={ placeholder }
                    on-change   ={ (e) => set_api_value( updateState, state, e ) }
                    value       ={ value != '' ? value : state[name] }
                    readonly
                ></input>
                :
                <input
                    type        ="text"
                    id          ={ name }
                    name        ={ name }
                    placeholder ={ placeholder }
                    on-change   ={ (e) => set_api_value( updateState, state, e ) }
                    value       ={ value != '' ? value : state[name] }
                ></input>
            }
        </div>
    )
}