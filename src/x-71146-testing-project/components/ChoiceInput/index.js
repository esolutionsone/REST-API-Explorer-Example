import { setApiValue } from "../../helpers"

export const ChoiceInput = ({ state, updateState, label, name }) => {
    const { method, methods } = state;
    return (
        <div className="choice-container">
            <label for={ name }>{ label }</label>
            <select
                id        = { name }
                name      = { name }
                value     = { method }
                on-change = { 
                    (e) => setApiValue( updateState, state, e )
                } >
                    { methods.map((option)=>{
                        return <option value={option}>{option}</option>
                    })}
            </select>
        </div>
    )
}