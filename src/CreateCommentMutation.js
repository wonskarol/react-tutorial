import Relay from 'react-relay';

class CreateCommentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { createComment }
    `;
  }

  getVariables() {
    return {
      author: this.props.author,
      text: this.props.text
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateCommentPayload {
        commentEdge
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      //parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'commentConnection',
      edgeName: 'commentEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
}

export default CreateCommentMutation;
