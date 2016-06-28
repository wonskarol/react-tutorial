import Relay from 'react-relay';

class RemoveCommentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { removeComment }
    `;
  }

  getVariables() {
    return {
      id: this.props.id,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveCommentPayload {
        commentEdge {
          node
        },
        store
      }
    `;
  }

  getConfigs() {
    console.log(this.props);
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        commentEdge: {
          node: {
            id: this.props.id
          }
        }
      }
    }];
    // return [{
    //   type: 'NODE_DELETE',
    //   parentName: 'store',
    //   parentID: this.props.store.id,
    //   connectionName: 'commentConnection',
    //   deletedIDFieldName: 'id',
    // }];
  }
}

export default RemoveCommentMutation;
