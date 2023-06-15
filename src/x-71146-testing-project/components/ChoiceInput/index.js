/* Import the setApiValue function from helpers */
import { setApiValue } from "../../helpers"

export const ChoiceInput = ({ state, updateState, label, name, options, defaultOption }) => {
    return (
        <div className="choice-container">
            {/* Creates a select box using name, label, options, and defaultOption. 
            To populate the options, we map over the options which should be an array passed 
            to the component. In our component this is the "methods" array with GET and POST
            as values.*/}
            <label for={ name }>{ label }</label>
            <select
                id        = { name }
                name      = { name }
                on-change = { (e) => setApiValue( updateState, state, e ) }
                value     = { defaultOption } >
                    { options.map((option)=>{
                        return <option value={option}>{option}</option>
                    })}
            </select>
        </div>
    )
}