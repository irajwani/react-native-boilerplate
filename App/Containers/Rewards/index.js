import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Container from '../../Components/Container';
import HeaderRow from '../../Components/HeaderRow';
import { Colors } from '../../Theme';
import styles from './styles';

import { connect } from 'react-redux'

import RewardActions from '../../Stores/Reward/Actions'
import Loading from '../../Components/ActivityIndicator/Loading';
import RewardList from '../../Components/List/RewardList';

class Rewards extends Component {
    async componentDidMount() {
        await this.props.getRewards(this.props.uid);
    }

    render() {
        console.log(this.props.rewards)
        return (
            <Container>

                <HeaderRow backgroundColor={Colors.black}>
                    <Text style={styles.headerText}>My Rewards</Text>
                </HeaderRow>

                <View style={styles.cardsContainer}>
                    {this.props.rewards ?
                        <RewardList
                            rewards={this.props.rewards}

                        />
                    :
                        <Loading/>
                    }
                </View>


            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    rewards: state.reward.rewards,
    
})

const mapDispatchToProps = (dispatch) => ({
    getRewards: (uid) => dispatch(RewardActions.getRewardsRequest(uid)),
    
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Rewards)
