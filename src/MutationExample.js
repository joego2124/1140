import React from 'react';
import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from "@react-firebase/database";

const path = "";

export default class MutationExample extends React.Component {
  state = {
    pushedKey: "",
  };
  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <FirebaseDatabaseMutation type="push" path={path}>
          {({ runMutation }) => {
            return (
              <div>
                <button
                  data-testid="test-push"
                  onClick={async () => {
                    const { key } = await runMutation({ TEST: "DATA" });
                    this.setState({ pushedKey: key });
                  }}
                >
                  Push
                </button>
              </div>
            );
          }}
        </FirebaseDatabaseMutation>
        {state.pushedKey !== "" && (
          <div>
            <div data-testid="test-push-result">{state.pushedKey}</div>
            <div>
              <FirebaseDatabaseNode path={`${path}/${state.pushedKey}`}>
                {({ value }) => <pre>{toString(value)}</pre>}
              </FirebaseDatabaseNode>
              <FirebaseDatabaseMutation
                type="set"
                path={`${path}/${state.pushedKey}`}
              >
                {({ runMutation }) => (
                  <button
                    onClick={async () => {
                      runMutation(null);
                      this.setState({ pushedKey: "" });
                    }}
                  >
                    Delete
                  </button>
                )}
              </FirebaseDatabaseMutation>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}