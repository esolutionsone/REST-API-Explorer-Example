import { fetch_tables } from "../../helpers"

/*renderSuggestions = () => {
    if(length)
}*/

export const TypeAheadReference = ({ state, label, name, table, dispatch }) => {
    return (
        <div>
            <label for={ name }>{ label }</label>
            <input
                id={ name }
                name={ name }
                onkeyup={ (e) => fetch_tables( e, table, 20, dispatch ) }
                value={ state[name] }
            >
            </input>
            {console.log(state)}
        </div>
    )
}