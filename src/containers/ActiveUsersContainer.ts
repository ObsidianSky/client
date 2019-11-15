import { connect } from 'react-redux'
import ActiveUsers from "../components/ActiveUsers";



const mapState = (state) => {
    return {
        users: state.activeUsers
    }
};

const ActiveUsersContainer = connect(
    mapState,
    null
)(ActiveUsers);

export default ActiveUsersContainer;