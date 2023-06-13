import { fetchTables, selectTable } from "../../helpers"

export const TypeAheadReference = ({ updateState, state, label, name, table, dispatch }) => {
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
                        (e) => fetchTables( updateState, e.target.value, table, 20, dispatch ) 
                    } >
                </input>
            </div>
            { state.tables.length > 0 ?
                <ul className="drop-down-list">
                    { state.tables.map((table) =>
                        <li 
                            key={table.sys_id} 
                            on-click={ 
                                () => selectTable( updateState, table.name, table.label ) 
                            } >
                                {table.label}
                        </li>
                    )}
                </ul>
                :
                "" 
            }
        </div>
    )
}