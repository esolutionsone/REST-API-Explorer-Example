/* Import fetchValues and selectValue function from the helpers script */
import { fetchValues, selectValue } from "../../helpers"

export const TypeAheadReference = ({ updateState, state, label, name, table, choices, dispatch }) => {
    /* Destructure required from state */
    const { required } = state;
    return (
        <div className="type-ahead-reference">
            <div className="type-ahead-container">
                {/* Input field captures user input and on keyup call fetchValues function (which uses a 
                    debounce function so this will only fetch values every 3ms. When values are fetched the 
                    choices will be rendered in the drop down list.    
                */}
                <label for={ name }>{ label }</label>
                <input
                    id        ={ name }
                    name      ={ name }
                    value     ={ state[name] }
                    className ={ required ? "denied" : "" }
                    onkeyup   ={ 
                        (e) => fetchValues( updateState, e.target.value, table, 20, dispatch ) 
                    } >
                </input>
            </div>
            {/* As choices are returned from the fetchValues function, they are rendered in the drop down list below
                when a user clicks a choice the function selectValue is called from helpers. 
                
                The section below is wrapped in a ternary operator to either render an empty block if there are no choices
                OR to render the drop down list if choices are available. 
            */}
            { choices.length > 0 ?
                <ul className="drop-down-list">
                    { choices.map((choice) =>
                        <li 
                            key={choice.sys_id} 
                            on-click={ 
                                () => selectValue( updateState, choice.name, choice.label, 'table' ) 
                            } >
                                {choice.label} - ({choice.name})
                        </li>
                    )}
                </ul>
                :
                "" 
            }
        </div>
    )
}