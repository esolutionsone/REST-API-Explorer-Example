import { fetch_tables, select_table } from "../../helpers"

/*renderSuggestions = () => {
    if(length)
}*/

export const TypeAheadReference = ({ updateState, state, label, name, table, dispatch }) => {
    return (
        <div>
            <label for={ name }>{ label }</label>
            <input
                id={ name }
                name={ name }
                onkeyup={ (e) => fetch_tables( e.target.value, table, 20, dispatch ) }
                value={ state[name] }
            >
            </input>
            {
                state.tables.map((table) =>
                    <ul>
                        <li 
                            key={table.sys_id} 
                            onClick={()=>this.suggestionSelected( updateState, table.name )}>
                                {table.label}
                        </li>
                    </ul>
                )
            }
        </div>
    )
}