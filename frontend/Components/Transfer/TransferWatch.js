import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Image, Text, FlatList, Linking, TouchableOpacity, } from 'react-native';
import { useMoralis } from 'react-moralis';
import { useNFTBalance } from '../../hooks/useNFTBalance';
import { useMoralisDapp } from '../../providers/MoralisDappProvider/MoralisDappProvider';
import { Divider, Card } from '@ui-kitten/components';
// import Animation from '../../splashLottie1.json';
// import LottieView from "lottie-react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import { getNativeByChain } from '../../helpers/networks';

const TransferWach = () => {
  const { NFTBalance, isLoading } = useNFTBalance();
  const { chainId } = useMoralisDapp();
  const { Moralis } = useMoralis();
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const Item = ({
    tokenAddress,
    image,
    nftName,
    chain,
    contractType,
    tokenId,
    video,
  }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemView}>
          <View
            style={{
              justifyContent: 'flex-start',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Image
              source={{ uri: image }}
              style={styles.nftImage}
              onPress={() =>
                Linking.openURL(video)
              }
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text style={styles.nameBig}>{nftName}</Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={showDialog}>
              <Text style={styles.buttonTextStyle}>Sell watch</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Portal>
            <Modal visible={visible} onDismiss={hideDialog}>
              <Text style={{...styles.dialogText, marginBottom: 20}}>
                Waiting to the buyer to pay and complete the transaction
              </Text>
                {/* <View> */}
                  <Image
                    style={{ maxWidth: '100%', alignSelf: 'center', margin: '5%' }}
                    source={require("../../../assets/image/qr.png")}
                  />
                {/* </View> */}
              <Button style={styles.modalButton} onPress={() =>
                Linking.openURL("https://etherscan.io/tx/0x71b23e51fe0cfe6f8e4c0708e50126c57ced6fc687ffd0406ba080c4c7bbb807")
              }>Verify Signature On-Chain</Button>
              <Button style={styles.modalButton} onPress={hideDialog}>Done</Button>
            </Modal>
          </Portal>
        </View>
      </View>
    );
  };

  const nftData = [
    {
      tokenAddress: '0xbe03ea86a1bb5461f54ab0e1322da61f4957cea2',
      image: 'https://lh3.googleusercontent.com/FY5rs0-3hbSLD_Xurp73hl2Mjht-Y-OCSvkyW2th7ujUO2NHWEgkszbThBHhJ6iX4s-O6zhHMc9sg2SJGHGOWl8Kc-qTkRFKDh9D=w650',
      video: 'https://openseauserdata.com/files/d672b77994361c5fee46131e943fe252.mp4#t=0.001',
      nftName: 'Daytona Silver Orange Dial',
      chain: 3,
      contractType: 'ERC721',
      tokenId: '112',
    },
    {
      tokenAddress: '0xbe03ea86a1bb5461f54ab0e1322da61f4957cea2',
      image: 'https://lh3.googleusercontent.com/4SrYcckq8upyKFBBRFrFiRUHxglf3qI9TPPqhXhedPrZJ8hi0-oQZyj0ZcAIZuZzOFpCgrS5-FkiitvsccasC0z8N7UWkduUWqEr=w650',
      video: 'https://openseauserdata.com/files/a1baab07a46edfb6c63e0365880ae1b7.mp4#t=0.001',
      nftName: 'Daytona Silver Blue Dial',
      chain: 3,
      contractType: 'ERC721',
      tokenId: '157',
    },
    {
      tokenAddress: '0xbe03ea86a1bb5461f54ab0e1322da61f4957cea2',
      image: 'https://lh3.googleusercontent.com/E2lLeABUqURw26lD_buZx4XXxRCCcBijKrDFe9rf-RHVOqlEI3imykR6v0sPI4saBQGF8jDFKm0WuM-7BOpjyayZidvYaEGD7I6-=w650',
      video: 'https://openseauserdata.com/files/da42e90d4a703b42947dcc9407763699.mp4#t=0.001',
      nftName: 'Daytona Gold Yellow Dial',
      chain: 3,
      contractType: 'ERC721',
      tokenId: '138',
    }
  ]

  const renderItem = ({ item }) => {
    <Text style={styles.headerText}>{item}</Text>
    return (
      <Item
        tokenAddress={item.tokenAddress}
        image={item.image}
        nftName={item.nftName}
        chain={chainId}
        contractType={item.contractType}
        tokenId={item.tokenId}
        video={item.video}
      />
    );
  };

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText} category="h4">
          My Watches
        </Text>
        <FlatList
          style={styles.assetsViewer}
          scrollEnabled={true}
          data={nftData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Provider>
  );
};

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
  headerText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 35,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 20,
    elevation: 5, //for android
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingBottom: 10,
  },
  itemView: {
    backgroundColor: 'white',
    width: '95%',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowRadius: 40,
  },
  nameBig: {
    fontSize: 25,
    color: '#414a4c',
    fontWeight: '600',
  },
  name: {
    fontSize: 18,
    color: '#414a4c',
    fontWeight: '600',
  },
  nftImage: {
    height: 60,
    borderRadius: 7,
    margin: '0%',
  },
  assetsViewer: {
    backgroundColor: 'black',
  },
  dialogText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 60,
    fontSize: 15
  },
  modalButton: {backgroundColor: '#7DE24E', margin: 10}
});

export default TransferWach;
