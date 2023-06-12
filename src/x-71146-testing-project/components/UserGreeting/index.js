export const UserGreeting = ({ state }) => {
    const { headerTextColor } = state.properties;
    return (
        state.user != null ?
            <div  style={{ color: headerTextColor }} className="user-greeting">
                <p>Hello, { state.user[0].name }</p>
            </div>
        :
            ""
    )
}