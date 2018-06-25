import { connect } from 'react-redux';
import Home from '../views/home/Home';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        accounts: state.accounts,
        advices: state.advices,
		temperature: state.temperature,
		localNewsHeadlines: state.localNewsHeadlines,
    }
};

export const HomeContainer = connect(
    mapStateToProps,
)(Home);