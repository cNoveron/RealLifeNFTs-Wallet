import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
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
  Modal,
  Portal, 
  Provider, 
} from "react-native-paper";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

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
  const [scannerIsVisible, setScannerIsVisible] = useState(false);
  const [watchDataIsVisible, setWatchDataIsVisible] = useState(false);

  // console.log(ERC20Transfers ? ERC20Transfers[0] : "");

  useEffect(() => {}, [ERC20Transfers]);

  const showScanner = () => setScannerIsVisible(true);
  const hideScanner = () => setScannerIsVisible(false);
  const showWatchData = () => setWatchDataIsVisible(true);
  const hideWatchData = () => setWatchDataIsVisible(false);

  const onSuccess = e => {
    showWatchData()
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  return (
    <Provider>
      <Portal>

        <SafeAreaView style={styles.container}>

          <Text style={styles.headerText} category="h4">
            💰 Buy Watch
          </Text>

          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
            reactivate
            topContent={
              <Text style={{ ...styles.dialogText, marginBottom: 20 }}>
                Scan the code from the seller to:{'\n'}
                - View the watch{'\n'}
                - Verify its signature and buy it
              </Text>
            }
          />
            
        </SafeAreaView>

        <Modal visible={watchDataIsVisible} onDismiss={hideWatchData}>
          <ActivityIndicator/>
        </Modal>

      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 5,
  },
  buttonTextStyle: {
    color: "#000",
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
    marginTop: StatusBar.currentHeight || 0,
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
    paddingHorizontal: 60,
    fontSize: 15
  },
  modalButton: {backgroundColor: '#7DE24E', margin: 10}
});

export default BuyWatch;

