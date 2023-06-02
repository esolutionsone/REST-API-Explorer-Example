export const UserGreeting = ({ state }) => {
    return (
        state.user.name &&
        <div class-name="user-greeting">
            <p>Hello { state.user.name }</p>
        </div>
    )
}