const initState = [
    {
        "id": 1388534400000,
        "author": "Pete Hunt",
        "text": "Hey there!",
        "likes": 0
    },
    {
        "id": 1420070400000,
        "author": "Paul O’Shannessy",
        "text": "React is *great*!",
        "likes": 0
    },
    {
        "id": 1455639402234,
        "author": "Karol",
        "text": "Hallo *react* and *redux*",
        "likes": 0
    }
];

function findComment(state, id) {
    return state.findIndex(comment => comment.id === id);
}

function data(state = initState, action) {
    let index,
        newState;
    switch (action.type) {
        case 'ADD_COMMENT':
            console.log('add comment');
            return [...state, action.comment];
        case 'REMOVE_COMMENT':
            console.log('remove comment');
            index = findComment(state, action.id);
            return [...state.slice(0, index), ...state.slice(index + 1)];
        case 'UPDATE_COMMENT':
            console.log('update comment');
            index = findComment(state, action.comment.id);
            newState = Object.assign([], state);
            newState[index] = action.comment;
            return newState;
        default:
            return state;
    }
}

export default data;
