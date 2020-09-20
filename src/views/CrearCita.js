import React, { Component } from 'react';
import { 
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Picker,
    BackHandler,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import {mesesNoBisiestos, mesesBisiestos} from '../data/Meses';

export default class CrearCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operario: this.props.route.params.operario,
      usuario: null,
      email: "",
      matricula: "",
      estacion: "",
      mes: (new Date().getMonth()+1),
      dia: new Date().getDate(),
      año: new Date().getFullYear(),
      hora: "",
      meses: [],
      dias: [],
      añoActual: new Date().getFullYear(),
    };
  }

  componentDidMount = () => {
    if (this.state.año % 4 == 0){
      this.setState({meses: mesesBisiestos});
      this.setState({dias: mesesBisiestos[this.state.mes-1].dias})
    }else{
      this.setState({meses: mesesNoBisiestos});
      this.setState({dias: mesesNoBisiestos[this.state.mes-1].dias})
    }
  }

  crearCita = () => {
    const {email, matricula, estacion, hora} = this.state;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email !== "" && regex.test(email.toLowerCase())){
      if (matricula !== "" && matricula.length === 8){
        if (estacion !== ""){
          const correcto = comprobarFecha();

          if (correcto){
            if (hora !== ''){
              var usuario = {
                "email": email,
              }

              fetch("http://"+constantes.ip+":8080/itvApp/getUserByEmail", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify(usuario),
              }).then(response => {  
                  return response.json();   
              }).then(data => { 
                  if (data.id){
                    var cita = {
                      "id": null,
                      "matricula": matricula,
                      "usuario": data.id,
                      "estacion": this.state.operario.estacion,
                      "operario": this.state.operario.id,
                      "resultado": 0,
                      "observaciones": null,
                      "fecha": this.state.dia +"/"+ this.state.mes + "/" + this.state.año,
                      "hora": hora,
                    }

                    fetch("http://"+constantes.ip+":8080/itvApp/createCita", {
                      method: "POST",
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      }, 
                      body:  JSON.stringify(cita),
                    }).then(function(response){  
                        return response.json();   
                    }).then(data => { 
                        console.log(data)
                        if (!data.status){
                            ToastAndroid.show("Cita registrada con éxito.", ToastAndroid.SHORT);
                            this.props.navigation.goBack();
                        }else{
                            ToastAndroid.show("La tarea no se ha registrado, pruebe más tarde.", ToastAndroid.SHORT);
                        }
                    });
                  }else{
                      ToastAndroid.show("Correo de usuario erróneo.", ToastAndroid.SHORT);
                  }
              });
            }
          }
        }
      }
    }
  }

  comprobarFecha = () =>{
    var correcto = true;
    const dia = new Date().getDate();
    const mes = new Date().getMonth()+1;
    const año = new Date().getFullYear();

    if (this.state.dia < dia){
      if (this.state.mes <= mes){
        if (this.state.año == año){
          correcto = false;
        }
      }
    }else{
      if (this.state.mes < mes){
        if (this.state.año == año){
          correcto = false;
        }
      }
    }

    return correcto;
  }

  checkMes = (value) => {
    this.setState({mes: value});

    if (this.state.año % 4 == 0){
      this.setState({dias: mesesBisiestos[value-1].dias})
    }else{
      this.setState({dias: mesesNoBisiestos[value-1].dias})
    }
  }

  checkAño = (value) => {
    this.setState({año: value});

    if (value % 4 == 0){
      this.setState({meses: mesesBisiestos})
      this.setState({dias: mesesBisiestos[this.state.mes-1].dias})
    }else{
      this.setState({meses: mesesNoBisiestos})
      this.setState({dias: mesesNoBisiestos[this.state.mes-1].dias})
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{color:"#FFF"}}>Correo usuario:</Text>
        <TextInput style={styles.input} keyboardType="email-address" onChangeText= {(value) => this.setState({email: value})}></TextInput>
        <Text style={{color:"#FFF"}}>Matrícula vehículo:</Text>
        <TextInput style={styles.input} onChangeText= {(value) => this.setState({matricula: value})} placeholderTextColor= {AppColors.inputPlaceHolder} placeholder="Ej. AAAA 000"></TextInput>
        <Text style={{color:"#FFF"}}>Estación:</Text>
        <TextInput style={styles.input} onChangeText= {(value) => this.setState({estacion: value})}></TextInput>
        <Text style={{color:"#FFF"}}>Fecha:</Text>
        <View style={styles.view_horizontal}>
          <View style={{...styles.view_contorno, width: "45%"}}>
            <Picker selectedValue={this.state.mes} onValueChange={(itemValue, itemIndex) => {this.checkMes(itemValue)}}>
              {
                this.state.meses.map((mes) => {
                  
                  return(
                    <Picker.Item label={mes.mes} value={mes.numero} key={mes.numero}/>
                  )
                })
              }
            </Picker>
          </View>
          <View style={{...styles.view_contorno, width: "22%", marginLeft: 5}}>
            <Picker selectedValue={this.state.dia} onValueChange={(itemValue, itemIndex) => {this.setState({dia: itemValue})}}>
              {
                this.state.dias.map((dia) => {
                  return(
                    <Picker.Item label={dia+""} value={dia} key={dia}/>
                  )
                })
              }
            </Picker>
          </View>
          <View style={{...styles.view_contorno, width: "30%", marginLeft: 5}}>
            <Picker selectedValue={this.state.año} onValueChange={(itemValue, itemIndex) => {this.checkAño(itemValue)}}>
              <Picker.Item label={this.state.añoActual+""} value={this.state.añoActual} key={this.state.añoActual}/>
              <Picker.Item label={this.state.añoActual+1+""}  value={this.state.añoActual+1} key={this.state.añoActual+1}/>
            </Picker>
          </View>
        </View>
        <Text style={{color:"#FFF"}}>Hora:</Text>
        <TextInput style={styles.input} onChangeText= {(value) => this.setState({hora: value})} placeholderTextColor={AppColors.inputPlaceHolder} placeholder="Ej. 18:00"></TextInput>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.crearCita}>
          <Text style={styles.buttonText}>CREAR CITA</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgrounLogin,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: AppColors.inputLogin,
    color: AppColors.white,
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
      backgroundColor: AppColors.buttonLogin,
      paddingVertical: 12,
      marginBottom: 10,
      borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: AppColors.white,
  },
  view_horizontal: {
    flexDirection: "row",
  },
})