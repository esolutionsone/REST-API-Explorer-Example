export const UserGreeting = ({ state }) => {
    return (
        state.user[0].name &&
        <div class-name="user-greeting">
            <p>Hello, { state.user[0].name }</p>
        </div>
    )
}