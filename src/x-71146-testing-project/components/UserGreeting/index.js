export const UserGreeting = ({ state }) => {
    /* Destructuring state and properties */
    const { user } = state;
    const { headerTextColor } = state.properties;
    /* Render the greeting to the user & dynamically set color based on properties */
    return (
        state.user != null ?
            <div  style={{ color: headerTextColor }} className="user-greeting">
                <p>Hello, { user[0].name }</p>
            </div>
            :
            ""
    )
}