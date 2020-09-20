import React from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import {getColors as AppColors} from '../styles/colors';

import {BarCodeScanner} from 'expo-barcode-scanner';

export default class Escaner extends React.Component{
  state = {
    hasCameraPermission: null,
    scanned: false,
    operario: this.props.route.params.operario,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async() => {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  handleBarCodeScanned = ({type, data}) => {
    this.setState({scanned: true});
    this.props.navigation.navigate('Informe', {"operario": this.state.operario, "cita": data});
  };

  render(){
    const {
      hasCameraPermission,
      scanned
    } = this.state;

    if (hasCameraPermission === null) {
      return <Text> Esperando a permiso de acceso a cámara. </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No se ha facilitado acceso a la cámara. </Text>;
    }

    return(
      <View style = {sytles.container}>
        <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned} style = {StyleSheet.absoluteFillObject}/>
        {
          scanned && ( 
            <TouchableOpacity style={sytles.buttonContainer} onPress = {() => this.setState({scanned: false})}>
              <Text style={sytles.buttonText}>Pulsa para volver a escanear</Text>
            </TouchableOpacity>
          )
        } 
      </View>
    );
  }
}

const sytles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
      backgroundColor: AppColors.buttonLogin,
      paddingVertical: 15,
      height: 50,
  },
  buttonText: {   
      textAlign: "center",
      color: AppColors.white,
  },
})

