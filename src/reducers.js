import initState from './comments.json';

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
