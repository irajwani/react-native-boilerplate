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

    async componentDidMount() {
        await this.props.getRewards(this.props.uid);
    }

    onRewardPress = (vendorUid, visitNumber) => {
        this.toggleConfirmationModal()
        // console.log(vendorUid);
    }

    toggleConfirmationModal = () => this.setState({isVisible: !this.state.isVisible})

    renderConfirmationModal = () => (
        
        <Modal
          rounded={false}
          modalStyle={{...shadowStyles.blackShadow, }}
          modalTitle={<ModalTitle hasTitleBar={false} title="Redeem Gift" titleTextStyle={{...Fonts.style.medium, color: Colors.secondary, fontWeight: "600"}}/>}
          visible={this.state.isVisible}
          onTouchOutside={this.toggleConfirmationModal}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={this.toggleConfirmationModal}
          footer={
          <ModalFooter bordered={false} >
            <ModalButton
              text="YES"
              textStyle={{...Fonts.style.medium,color: Colors.primary}}
              onPress={this.toggleConfirmationModal}
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
            
                <Text>Are you sure you wish to use this reward?</Text>
            

            
            
          </ModalContent>
        </Modal>
          
      )

    render() {
        // console.log(this.props.rewards)
        return (
            <Container>

                <HeaderRow backgroundColor={Colors.black}>
                    <Text style={styles.headerText}>My Rewards</Text>
                </HeaderRow>

                <View style={styles.cardsContainer}>
                    {this.props.rewards ?
                        <RewardList
                            rewards={this.props.rewards}
                            onRewardPress={this.onRewardPress}
                        />
                    :
                        <Loading/>
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
    
})

const mapDispatchToProps = (dispatch) => ({
    getRewards: (uid) => dispatch(RewardActions.getRewardsRequest(uid)),
    
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Rewards)
