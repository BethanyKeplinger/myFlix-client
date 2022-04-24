import React from 'react'

function UserInfo({ email, name }) {
    return (
        <>
            <h4>Your User Info</h4>
            <p>Name: {name}</p>
            <p>E-mail: {email}</p>
        </>
    )
}

export default UserInfo