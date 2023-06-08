import { fetch_tables, select_table } from "../../helpers"

export const TypeAheadReference = ({ updateState, state, label, name, table, dispatch }) => {
    return (
        <div className="type-ahead-reference">
            <div className="type-ahead-container">
                <label for={ name }>{ label }:</label>
                <input
                    id      ={ name }
                    name    ={ name }
                    onkeyup ={ 
                        (e) => fetch_tables( updateState, e.target.value, table, 20, dispatch ) 
                    }
                    value   ={ state[name] }
                >
                </input>
            </div>
            { state && 
                state.tables.map((table) =>
                    <ul>
                        <li 
                            key={table.sys_id} 
                            on-click={ 
                                () => select_table( updateState, table.name, table.label ) 
                            }>
                                {table.label}
                        </li>
                    </ul>
                )
            }
        </div>
    )
}