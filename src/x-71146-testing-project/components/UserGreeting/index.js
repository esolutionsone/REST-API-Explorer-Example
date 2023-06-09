export const UserGreeting = ({ state }) => {
    return (
        state.user != null ?
            <div className="user-greeting">
                <p>Hello, { state.user[0].name }</p>
            </div>
        :
            ""
    )
}