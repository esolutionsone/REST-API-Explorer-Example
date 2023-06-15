/* Import setApiValue function from helpers*/
import { setApiValue } from "../../helpers"

export const TextInput = ({ state, updateState, label, name, placeholder, value = '' }) => {
    /* Destructure requried from state */
    const { required } = state;
    return (
        <div  className="text-input-container">
            {/* Ternary operator to either return the path read only value if name is path OR a 
            standard input for all other values. Path is read only in our component and this was the 
            quick fix for making it read only! 
            High level, we consume name, placeholder, label, and value and create an input field from them
            */}
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