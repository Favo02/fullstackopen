const Notification = ({ message, type }) => {

    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        fontWeight: '900',
        borderSstyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        width: '40%'
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        fontWeight: '900',
        borderSstyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        width: '40%'
    }

    if (message === null) {
        return null
    }
    
    return (
        <div style={type === 'error' ? errorStyle : notificationStyle}>
            {message}
        </div>
    )
}

export default Notification