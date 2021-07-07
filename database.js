const shortid = require("shortid")

let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane"
    },
    {
        id: shortid.generate(),
        name: "John Doe",
        bio: "Jane Doe's husband, of course"
    },
    {
        id: shortid.generate(),
        name: "Joe Doe",
        bio: "His name rhymes!"
    },
    {
        id: shortid.generate(),
        name: "Charlene Johnson",
        bio: "Not apart of the Doe's aparently"
    }
]

function getUsers() {
    return users
}

function getUserById(id) {
    return users.find(u => u.id === id)
}

function createUser(data) {
    const payload = {
        id: String(shortid.generate()),
        ...data,
    }

    users.push(payload)
    return payload
}

function updateUser(id, data) {
    const index = users.findIndex(u => u.id === id)
    users[index] ={
        ...users[index],
        ...data,
    }

    return users[index]
}

function deleteUser(id) {
    users = users.filter(u => u.id != id)
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}