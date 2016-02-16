import React from 'react';

export default class Comment extends React.Component {
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }

    handleCommentRemove = () => {
        this.props.onCommentRemove({
            id: this.props.id
        });
    };

    render() {
        return <div className="comment">
            <h2 className="commentAuthor">
                {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            <button onClick={this.handleCommentRemove}>Remove me</button>
        </div>
    }
}
