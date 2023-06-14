/* importing functions from helpers */
import { fetchTables, selectTable } from "../../helpers"

/* In order to access the props("updateState", "state", "label", "name", "table", "dispatch") that were passed down from the parent component(view)
we need to destructure them. */
export const TypeAheadReference = ({ updateState, state, placeholder, label, name, table, dispatch }) => {
    /* Next, we destrucure all the variables needed from state */
    const { required, tables } = state;
    return (
        <div className="type-ahead-reference">
            <div className="type-ahead-container">
                <label for={ name }>{ label }</label>
                <input
                    id        ={ name }
                    name      ={ name }
                    value     ={ state[name] }
                    placeholder ={ placeholder }
                    className ={ required ? "denied" : "" }
                    onkeyup   ={ 
                        (e) => fetchTables( updateState, e.target.value, table, 20, dispatch ) 
                    } >
                </input>
            </div>
            { tables.length > 0 ?
                <ul className="drop-down-list">
                    { tables.map((table) =>
                        <li 
                            key      ={table.sys_id} 
                            on-click ={ 
                                () => selectTable( updateState, table.name, table.label ) 
                            } >
                                {table.label} - ({table.name})
                        </li>
                    )}
                </ul>
                :
                "" 
            }
        </div>
    )
}