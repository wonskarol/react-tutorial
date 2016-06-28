import React from 'react';
import Relay from 'react-relay';
// import CreateCommentMutation from './CreateCommentMutation';

class CommentForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        // Relay.Store.commitUpdate(
        //   new CreateCommentMutation({
        //     author: this.refs.author.value,
        //     text: this.refs.text.value,
        //     store: this.props.store
        //   })
        // );
        this.refs.author.value = "";
        this.refs.text.value = "";
    }

    render() {
        return <form className="commentForm" onSubmit={this.handleSubmit}>
            <input
                type="text"
                placeholder="Your name"
                ref="author"
            />
            <input
                type="text"
                placeholder="Say something..."
                ref="text"
            />
            <input type="submit" value="Post"/>
        </form>
    }
}

export default CommentForm;
