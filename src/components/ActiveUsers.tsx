import React, {Component} from 'react';
import { UserModel } from '../features/user/user.models';



class ActiveUsers extends Component<{users: UserModel[]}> {
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