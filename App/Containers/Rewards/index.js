import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Container from '../../Components/Container';
import HeaderRow from '../../Components/HeaderRow';
import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';

import { Colors, Fonts } from '../../Theme';
import styles from './styles';

import { connect } from 'react-redux'

import RewardActions from '../../Stores/Reward/Actions'
import Loading from '../../Components/ActivityIndicator/Loading';
import RewardList from '../../Components/List/RewardList';
import shadowStyles from '../../StyleSheets/shadowStyles';

class Rewards extends Component {
    state = {
        isVisible: false,
        vendorUid: "",
        visitNumber: "",
    }

    

    componentDidUpdate = (prevProps) => {
      if(prevProps.redeemStatus != this.props.redeemStatus && this.props.redeemStatus == 'done') {
        this.props.getRewards(this.props.uid);
      }
    }

    redeemReward = () => {
      let {vendorUid, visitNumber} = this.state;
      let {uid} = this.props;

      let rewardRedeemed = {
        uid,
        vendorUid,
        visitNumber
      }

      this.props.redeemReward(rewardRedeemed);
      this.toggleConfirmationModal();
    }

    onRewardPress = (vendorUid, visitNumber) => {
        // console.log(vendorUid, visitNumber);
        this.setState({isVisible: !this.state.isVisible, vendorUid, visitNumber});
    }

    toggleConfirmationModal = () => this.setState({isVisible: !this.state.isVisible})

    renderConfirmationModal = () => (
        
        <Modal
          rounded={false}
          modalStyle={{...shadowStyles.blackShadow, }}
        //   modalTitle={<ModalTitle hasTitleBar={false} title="Redeem Gift" titleTextStyle={{...Fonts.style.medium, color: Colors.secondary, fontWeight: "600"}}/>}
          visible={this.state.isVisible}
          onTouchOutside={this.toggleConfirmationModal}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={this.toggleConfirmationModal}
          footer={
          <ModalFooter bordered={false}>
            <ModalButton
              text="YES"
              textStyle={{...Fonts.style.medium,color: Colors.primary}}
              onPress={this.redeemReward}
            />
            <ModalButton
              text="NO"
              textStyle={{...Fonts.style.medium,color: Colors.primary}}
              onPress={this.toggleConfirmationModal}
            />
          </ModalFooter>
          }
        >
          <ModalContent>
                <Text style={styles.modalTitle}>Redeem Gift</Text>
                <Text style={styles.modalText}>Are you sure you wish to use this reward?</Text>
          </ModalContent>
        </Modal>
          
      )

    render() {
        let {isLoading, rewards} = this.props;
        // console.log(this.props.rewards)
        return (
            <Container>

                <HeaderRow backgroundColor={Colors.primary} shadow>
                    <Text style={styles.headerText}>My Rewards</Text>
                </HeaderRow>

                <View style={styles.cardsContainer}>
                    {isLoading ?
                      <Container center>
                        <Loading/>
                      </Container>
                    :
                      <RewardList
                          rewards={rewards}
                          onRewardPress={this.onRewardPress}
                      />
                    }
                </View>

                {this.renderConfirmationModal()}


            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,

    rewards: state.reward.rewards,
    redeemStatus: state.reward.redeemStatus,
    isLoading: state.reward.isLoading,
    
})

const mapDispatchToProps = (dispatch) => ({
    getRewards: (uid) => dispatch(RewardActions.getRewardsRequest(uid)),
    redeemReward: (rewardRedeemed) => dispatch(RewardActions.redeemRewardRequest(rewardRedeemed)),
    
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Rewards)
