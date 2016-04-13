function addComment(comment) {
    return {
        type: 'ADD_COMMENT',
        comment
    }
}

function removeComment(id) {
    return {
        type: 'REMOVE_COMMENT',
        id
    }
}

function updateComment(comment) {
    return {
        type: 'UPDATE_COMMENT',
        comment
    }
}

export { addComment, removeComment, updateComment };
