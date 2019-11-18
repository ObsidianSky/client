import React, {Component} from 'react';
import {IdentifiableUser} from "../features/authentication/authentication.models";

class ActiveUsers extends Component<{users: IdentifiableUser[]}> {
    render() {
        return (
            <div>
                <h3>People:</h3>
                {this.props.users.map(person => <div key={person.id}>{person.name}</div>)}
            </div>
        );
    }
}

export default ActiveUsers;