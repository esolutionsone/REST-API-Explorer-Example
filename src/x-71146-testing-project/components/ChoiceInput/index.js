import { set_api_value } from "../../helpers"

export const ChoiceInput = ({ state, updateState, label, name }) => {
    return (
        <div className="choice-container">
            <label for={ name }>{ label }:</label>
            <select
                id        = { name }
                name      = { name }
                on-change = { (e) => set_api_value( updateState, state, e ) }
                value     = { state.method }
            >
                {
                    state.methods.map((option)=>{
                        return <option value={option}>{option}</option>
                    })
                }
            </select>
        </div>
    )
}