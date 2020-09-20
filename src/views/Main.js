import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operario: this.props.route.params.operario,
    };
  }

  onPress = (id) => {
    if (id == 0){
      this.props.navigation.navigate('Historial_hoy', {"operario": this.state.operario});
    }else if (id == 1){
      this.props.navigation.navigate('Historial_full', {"operario": this.state.operario});
    }else if (id == 2){
      this.props.navigation.navigate('Crear', {"operario": this.state.operario});
    }else{
      this.props.navigation.navigate('Escaner', {"operario": this.state.operario});
    }
  };

  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => this.onPress(0)} style={styles.button}>
              <Text style={styles.text}>PENDIENTES HOY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPress(1)} style={styles.button}>
              <Text style={styles.text}>HISTORIAL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPress(2)} style={styles.button}>
              <Text style={styles.text}>AÑADIR CITA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPress(3)} style={styles.button}>
              <Text style={styles.text}>ESCANEAR QR</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgrounLogin,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: AppColors.buttonLogin,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 5,
    margin: 20
  },
  text: {
    textAlign: "center",
    color: AppColors.white,
  }
})
