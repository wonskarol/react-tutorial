import React from 'react';

export default class Comment extends React.Component {
    rawMarkup() {
        let rawMarkup = marked(this.props.text.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }

    handleCommentRemove = () => {
        this.props.onCommentRemove({
            id: this.props.id
        });
    };

    addLike = () => {
        this.handleCommentUpdate(this.props.likes + 1);
    };
    subtractLike = () => {
        this.handleCommentUpdate(this.props.likes - 1);
    };
    handleCommentUpdate = (likes) => {
        this.props.onCommentUpdate({
            id: this.props.id,
            author: this.props.author,
            text: this.props.text,
            likes: likes
        });
    }

    render() {
        return <div className="comment">
            <h2 className="commentAuthor">
                {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            <button onClick={this.handleCommentRemove}>Remove me</button>
            <button onClick={this.addLike}>+</button>
            <button onClick={this.subtractLike}>-</button>
            {this.props.likes}
        </div>
    }
}
