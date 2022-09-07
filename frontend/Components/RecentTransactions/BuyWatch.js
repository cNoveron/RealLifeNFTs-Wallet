import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  Linking,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { getEllipsisTxt } from "../../utils/formatters";
import useERC20Transfers from "../../hooks/useERC20Transfers";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Divider, Button, Card } from "@ui-kitten/components";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import TransactionDetails from "./TransactionDetails";
import {
  ActivityIndicator,
  FAB,
  Modal,
  Portal, 
  Provider, 
} from "react-native-paper";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';

const Item = ({ address, Moralis, value, logo, hash }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemView}>
      <View style={{ flex: 0.5, justifyContent: "center" }}>
        <Text>🪙</Text>
        {/* <FontAwesomeIcon icon={faWallet} color="black" size={15} /> */}
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text style={styles.text}>{getEllipsisTxt(hash, 7)}</Text>
      </View>

      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
        <Text style={styles.text} numberOfLines={1}>
          {parseFloat(Moralis.Units.FromWei(value, 18)).toFixed(3)}
        </Text>
      </View>
    </View>
    <Divider />
  </View>
);


function BuyWatch() {
  const { ERC20Transfers } = useERC20Transfers();
  const { Moralis } = useMoralis();

  const [activityIndicatorIsVisible, setActivityIndicatorIsVisible] = useState(false)
  const [videoModalIsVisible, setVideoModalIsVisible] = useState(false)
  const [buttonsAreVisible, setButtonsAreVisible] = useState(false)
  const [verifyingAuth, setVerifyingAuth] = useState(false)
  const [verifyingOwner, setVerifyingOwner] = useState(false)
  const [authVerified, setAuthVerified] = useState(false)
  const [ownerVerified, setOwnerVerified] = useState(false)
  const [txModalIsVisible, setTxModalIsVisible] = useState(false)
  
  // console.log(ERC20Transfers ? ERC20Transfers[0] : "");

  useEffect(() => {}, [ERC20Transfers]);

  const showActivityIndicator = (ms) => {
    setActivityIndicatorIsVisible(true)
    setTimeout(() => setActivityIndicatorIsVisible(false), ms)
  }

  const onScan = () => {
    setActivityIndicatorIsVisible(true)
    setVideoModalIsVisible(true)
  };

  const openVerificationModal = () => {
    setVideoModalIsVisible(false)
    showActivityIndicator(2000)
  };

  const onVideoLoaded = () => {
    setActivityIndicatorIsVisible(false)
    setButtonsAreVisible(true)
  };

  const dismissVideoModal = () => {
    setActivityIndicatorIsVisible(false)
    setButtonsAreVisible(false)
    setVideoModalIsVisible(false)
    setVerifyingAuth(false)
    setVerifyingOwner(false)
    setAuthVerified(false)
    setOwnerVerified(false)
  };

  const dismissTxModal = e => {
    setTxModalIsVisible(false)
  };

  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  return (
    <Provider>


      <SafeAreaView style={styles.container}>

        <Text style={styles.headerText} category="h4">
          💰 Buy Watch
        </Text>

        <Text style={{ ...styles.dialogText, marginBottom: 20 }}>
          Scan the code from the seller to get a 3d view of the watch
        </Text>

        <QRCodeScanner
          onRead={onScan}
          flashMode={RNCamera.Constants.FlashMode.off}
          reactivate
        />
      
      </SafeAreaView>


      <Portal>

        <Modal 
          visible={videoModalIsVisible} 
          onDismiss={dismissVideoModal}
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'flex-start',
            paddingHorizontal: 0,
            paddingVertical: 0,
            paddingTop: 100,
          }}>

          <Video
            source={require('../../../assets/video/daytona-blue-dial.mp4')}
            onBuffer={() => {}} // Callback when remote video is buffering
            onLoad={onVideoLoaded} // 
            onError={() => {}} // Callback when video cannot be loaded
            repeat={true}
            resizeMode="contain"
            style={styles.backgroundVideo}
          />

          <View
            style={{
              justifyContent: 'space-evenly',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <Text style={styles.nameBig}>Rolex Daytona</Text>
            <Text style={styles.name}>Contract Type: ERC721</Text>
            <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>
              Token ID: 112
            </Text>
            <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>
              Token Address: 0xbe03ea86a1bb5461f54ab0e1322da61f4957cea2
            </Text>
            <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>
              Chain: Ethereum Mainnet
            </Text>
          </View>

        </Modal>
        
      </Portal>


      <Portal
        visible={activityIndicatorIsVisible}
        style={{display: 'flex', height: '100%'}}>
        <ActivityIndicator 
          animating={activityIndicatorIsVisible}
          size={100}
          style={{flex: 1}}/>
      </Portal>


      <Portal>

        <FAB
          animated
          icon="watch"
          label={authVerified ? "The watch is genuine" : "Verify authenticity"}
          loading={verifyingAuth}
          onPress={() => {
            setVerifyingAuth(true)
            setTimeout(() => setVerifyingAuth(false), 2000)
            setTimeout(() => setAuthVerified(true), 2000)
          }}
          style={styles.buttonStyle}
          visible={buttonsAreVisible}>
        </FAB>

        <FAB
          icon="account-check"
          label={ownerVerified ? "Seller is the legit owner" : "Verify ownership"}
          loading={verifyingOwner}
          onPress={() =>{
            setVerifyingOwner(true)
            setTimeout(() => setVerifyingOwner(false), 2000)
            setTimeout(() => setOwnerVerified(true), 2000)
          }}
          style={styles.buttonStyle}
          visible={buttonsAreVisible}>
        </FAB>

        <FAB
          icon="cash-100"
          label="Buy watch"
          onPress={() =>{
            dismissVideoModal()
            setTxModalIsVisible(true)
            showActivityIndicator(4000)
          }}
          style={styles.buttonStyle}
          visible={buttonsAreVisible}>
        </FAB>
      </Portal>


      <Portal>
        <Modal 
          visible={txModalIsVisible} 
          onDismiss={dismissTxModal}
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-around',
            marginTop: 0,
            paddingHorizontal: 30,
            paddingVertical: 20,
            paddingTop: 0,
          }}>
            {activityIndicatorIsVisible ?
              <>
                <ActivityIndicator 
                  animating={activityIndicatorIsVisible}
                  size={100}
                  style={{flex: 2}}/>

                <Text style={{...styles.info, flex: 3}}>
                  Preparando la transaccion...
                </Text>
              </>
              :
              <View style={{ 
                alignSelf: 'flex-start',
                display: 'flex', 
                flex: 1,
                flexDirection: 'column', 
                justifyContent: 'space-around',
              }}>
                <View style={{ 
                  alignSelf: 'flex-start',
                  display: 'flex', 
                  flex: 1,
                  flexDirection: 'row', 
                  justifyContent: 'flex-start',
                  height: 200,
                }}>
                  <Text style={{
                    alignSelf: 'flex-start',
                    color: 'black',
                    flex: 1,
                    fontWeight: '600',
                    fontSize: 35, 
                    paddingVertical: 30,
                    height: 100,
                    marginVertical: 0,
                  }} category="h4">
                    Confirm Purchase
                  </Text>
                </View>

                <View style={{ 
                  alignSelf: 'flex-start',
                  display: 'flex', 
                  flex: 6,
                  flexDirection: 'column', 
                  // height: 100,
                  justifyContent: 'space-around',
                }}>

                  {[
                    ['Seller', 'Amanda Scheffield'],
                    ['Comprador', 'Eduardo Valderrama'],
                    ['Price', '$576,500 MXN'],
                  ].map(([a,b]) => <View style={{
                    alignSelf: 'flex-start',
                    display: 'flex', 
                    flex: 2,
                    flexDirection: 'row', 
                    justifyContent: 'flex-start',
                  }}>
                    <Text style={{...styles.info}}>{a}</Text>
                    
                    <Text style={{...styles.info}}>{b}</Text>
                  </View>)}
                  <Button style={{...styles.buttonStyle, marginBottom: 400, marginTop: 20}} onPress={() =>
                    Linking.openURL("https://etherscan.io/tx/0x71b23e51fe0cfe6f8e4c0708e50126c57ced6fc687ffd0406ba080c4c7bbb807")
                  }>CONFIRM PURCHASE</Button>

                </View>
              </View>
            }
        </Modal>
      </Portal>


    </Provider>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#74E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 5,
  },
  greenButton: {
    backgroundColor: "#7DE24E",
  },
  buttonTextStyle: {
    color: "#FFF",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "50%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 0,
    marginTop: 0, // StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  viewContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 35,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  blue: {
    backgroundColor: "blue",
  },
  item: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  itemView: {
    backgroundColor: "white",
    padding: 20,
    // marginVertical: 8,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: "row",
  },
  subheader: {
    fontSize: 15,
    color: "#414a4c",
    paddingTop: 20,
    paddingHorizontal: 5,
    fontWeight: "600",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  title: {
    fontSize: 10,
    color: "black",
  },
  text: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
  flex1: {
    flex: 1,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  dialogText: {
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    display: 'flex'
  },
  modalButton: {
    backgroundColor: '#7DE24E',
    borderRadius: 20,
    margin: 10,
    height: 30,
    paddingVertical: 30,
  },
  nameBig: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '600',
  },
  info: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontWeight: '600',
  },
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // height: 100,
    // display: 'flex',
    // width: 100,
    flex: 1,
    marginTop: 30,
  },
  videoWrapper: {
    // flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
});

export default BuyWatch;

