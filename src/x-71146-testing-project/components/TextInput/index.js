import { setApiValue } from "../../helpers"

export const TextInput = ({ state, updateState, label, name, placeholder, value = '' }) => {
    const { required } = state;
    return (
        <div  className="text-input-container">
            <label for={ name }>{ label }</label>
            { name === 'path' ?
                <input
                    type        ="text"
                    id          ={ name }
                    name        ={ name }
                    placeholder ={ placeholder }
                    on-change   ={ (e) => setApiValue( updateState, state, e ) }
                    value       ={ value != '' ? value : state[name] }
                    readonly >
                    </input>
                :
                <input
                    type        ="text"
                    id          ={ name }
                    name        ={ name }
                    placeholder ={ placeholder }
                    on-change   ={ (e) => setApiValue( updateState, state, e ) }
                    value       ={ value != '' || value != undefined ? value : state[name] }
                    className   ={ required ? "denied" : "" } >
                </input>
            }
        </div>
    )
}