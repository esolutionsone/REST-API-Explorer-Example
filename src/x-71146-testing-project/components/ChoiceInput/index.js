import { setApiValue } from "../../helpers"

export const ChoiceInput = ({ state, updateState, label, name, options, defaultOption }) => {
    return (
        <div className="choice-container">
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