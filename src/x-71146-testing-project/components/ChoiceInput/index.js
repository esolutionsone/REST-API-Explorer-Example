import { set_api_value } from "../../helpers"

export const ChoiceInput = ({ state, updateState, label, name, options }) => {
    return (
        <div className="choice-container">
            <label for={ name }>{ label }:</label>
            <select
                id={ name }
                name={ name }
                on-change={ (e) => set_api_value( updateState, e ) }
                value={ state[name] }
            >
                {
                    options.map((option)=>{
                        return <option value={option}>{option}</option>
                    })
                }
            </select>
        </div>
    )
}