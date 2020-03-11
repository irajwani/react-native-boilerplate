import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import Container from '../../Components/Container';
import HeaderRow from '../../Components/HeaderRow'
import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';

import NavigationService from '../../Services/NavigationService'
import { Images, Fonts, Colors, Strings } from '../../Theme'
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'react-native-firebase';
import shadowStyles from '../../StyleSheets/shadowStyles';

let {privacy, contact} = Strings

let {BackArrow} = Images;

export default class Settings extends Component {
    state = {
        document: contact,
        isDocumentVisible: false,

        isExitVisible: false,
    }

    settings = [
        {text: "Account", icon: "account", onPress: () => NavigationService.navigate('Register') },
        {text: "Privacy Policy", icon: "lock", onPress: () => this.toggleDocumentModal("privacy") },
        {text: "Help", icon: "help-circle", onPress: () => this.toggleDocumentModal("contact") },
        {text: "Log out", icon: "logout-variant", onPress: () => this.toggleExitModal() },
    ]

    toggleDocumentModal = (doc = 'contact') => {
        console.log('pressed');
        this.setState({isDocumentVisible: !this.state.isDocumentVisible, document: doc == "privacy" ? privacy : contact});
    }

    renderDocumentModal = () => (
        <Modal
            rounded={false}
            modalStyle={{...shadowStyles.blackShadow, }}
            modalTitle={<ModalTitle hasTitleBar={false} title={this.state.document.title} titleTextStyle={{...Fonts.style.medium, color: Colors.primary, fontWeight: "400"}}/>}
            visible={this.state.isDocumentVisible}
            onTouchOutside={this.toggleDocumentModal}
            modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
            })}
            swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
            swipeThreshold={200} // default 100
            onSwipeOut={this.toggleDocumentModal}
            footer={
            <ModalFooter bordered={true} >
                <ModalButton
                    text="Okay!"
                    textStyle={{...Fonts.style.medium,color: Colors.primary}}
                    onPress={this.toggleDocumentModal}
                />
            </ModalFooter>
            }
        >
            <ModalContent>
                <Text>{this.state.document.text}</Text>
            </ModalContent>
        </Modal>
    )

    toggleExitModal = () => this.setState({isExitVisible: !this.state.isExitVisible})

    renderExitModal = () => (
        
        
        <Modal
            rounded={false}
            modalStyle={{...shadowStyles.blackShadow, }}
            modalTitle={<ModalTitle hasTitleBar={false} title="Log Out" titleTextStyle={{...Fonts.style.medium, color: Colors.primary, fontWeight: "400"}}/>}
            visible={this.state.isExitVisible}
            onTouchOutside={this.toggleExitModal}
            modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
            })}
            swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
            swipeThreshold={200} // default 100
            onSwipeOut={this.toggleExitModal}
            footer={
            <ModalFooter bordered={false} >
            <ModalButton
                text="YES"
                textStyle={{...Fonts.style.medium,color: Colors.primary}}
                onPress={() => {
                    this.toggleExitModal();
                    this.logOut();
                }}
            />
            <ModalButton
                text="NO"
                textStyle={{...Fonts.style.medium,color: Colors.primary}}
                onPress={this.toggleExitModal}
            />
            </ModalFooter>
            }
        >
            <ModalContent>
                <Text>Are you sure you want to log out?</Text>
            </ModalContent>
        </Modal>
              

    )

    render() {
        return (
            <Container>
                <HeaderRow backgroundColor={Colors.primary}>
                    <BackArrow onPress={() => NavigationService.goBack()}/>
                    
                    <Text style={styles.headerText}>Settings</Text>
                </HeaderRow>

                <View style={styles.bodyContainer}>
                {this.settings.map((setting, index) => (
                    <TouchableOpacity 
                        key={index} style={styles.settingCard} onPress={setting.onPress}
                    >
                        <Icon
                            name={setting.icon}
                            size={28}
                            color={Colors.white}
                        />
                        <Text style={styles.setting}>{setting.text}</Text>
                    </TouchableOpacity>
                ))}
                </View>

                {this.renderExitModal()}
                {this.renderDocumentModal()}
            </Container>
        )
    }
}
