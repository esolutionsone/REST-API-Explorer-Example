import { fetchValues, selectValue } from "../../helpers"

export const TypeAheadReference = ({ updateState, state, label, name, table, choices, dispatch }) => {
    const { required } = state;
    return (
        <div className="type-ahead-reference">
            <div className="type-ahead-container">
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