export const UserGreeting = ({ state }) => {
    const { user } = state;
    const { headerTextColor } = state.properties;
    return (
        state.user != null ?
            <div  style={{ color: headerTextColor }} className="user-greeting">
                <p>Hello, { user[0].name }</p>
            </div>
            :
            ""
    )
}