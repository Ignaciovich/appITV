import React, { Component } from 'react';
import { 
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Picker,
    ToastAndroid,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import {mesesNoBisiestos, mesesBisiestos} from '../data/Meses';
import {constantes} from '../data/constantes';

export default class CrearCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operario: this.props.route.params.operario,
      usuario: {},
      coche: [],
      mes: (new Date().getMonth()+1),
      dia: new Date().getDate(),
      año: new Date().getFullYear(),
      hora: "",
      meses: [],
      dias: [],
      añoActual: new Date().getFullYear(),
      horasDia: [],
      coche: null,
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
  
    this.checkHorasDisponibles(this.state.dia, this.state.mes, this.state.año);
  }

  crearCita = () => {
    const {email, matricula, estacion, hora} = this.state;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email !== "" && regex.test(email.toLowerCase())){
      if (matricula !== "" && matricula.length === 8){
        if (estacion !== ""){
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
              this.setState({usuario: data});
              var vehiculo = {
                "matricula": matricula,
                "owner": this.state.usuario.id,
              }

              fetch("http://"+constantes.ip+":8080/itvApp/getCocheByOwnerMatricula", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify(vehiculo),
              }).then(response => {  
                return response.json();
              }).then(dato => { 
                this.setState({coche: dato})
                var cita = {
                  "matricula": this.state.coche.matricula,
                  "usuario": data.id,
                  "estacion": this.state.operario.estacion,
                  "operario": this.state.operario.id,
                  "resultado": 0,
                  "fecha": this.state.dia +"/"+ this.state.mes + "/" + this.state.año,
                  "hora": hora,
                };

                console.log(cita);

                fetch("http://"+constantes.ip+":8080/itvApp/createCita", {
                  method: "POST",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }, 
                  body:  JSON.stringify(cita),
                }).then(response => {  
                  if (response.status == 200){
                    ToastAndroid.show("Cita creada con éxito.", ToastAndroid.SHORT);
                    this.props.navigation.goBack();
                    return response.json();
                  }
                }).then(result => { 
                  return result;
                }); 
              });
            });
          }
        }
      }
    }

    
  }

  checkDia = async(value) => {
    this.setState({dia: value});

    this.checkHorasDisponibles(value, this.state.mes, this.state.año);
  }

  checkMes = (value) => {
    this.setState({mes: value});

    if (this.state.año % 4 == 0){
      this.setState({dias: mesesBisiestos[value-1].dias})
    }else{
      this.setState({dias: mesesNoBisiestos[value-1].dias})
    }

    this.checkHorasDisponibles(this.state.dia, value, this.state.año);
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

    this.checkHorasDisponibles(this.state.dia, this.state.mes, value);
  }

  checkHorasDisponibles = async(dia, mes, año) => {
    var horas = ["9:00", "10:00", "11:00", "12:00", "13:00", "17:00", "18:00", "19:00"];
    const cita = {
      "fecha": dia+"/"+mes+"/"+año,
      "estacion": this.state.operario.estacion,
    }
    this.setState({horasDia: horas});
    var lista = [];

    await fetch("http://"+constantes.ip+":8080/itvApp/getCitaByFecha", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(cita),
    }).then(response => {
      return response.json();   
    }).then(data => { 
      lista = data;
    });

    for (let i = 0; i < lista.length; i++){
        horas = horas.filter(value => value !== lista[i].hora);
    }
    
    if (horas.length > 0){
      this.setState({horasDia: horas});
    }else{
      this.setState({horasDia: ["No hay citas disponibles hoy."]});
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{color:"#FFF"}}>Correo usuario:</Text>
        <TextInput style={styles.input} keyboardType="email-address" onChangeText= {(value) => this.setState({email: value})}></TextInput>
        <Text style={{color:"#FFF"}}>Matrícula vehículo:</Text>
        <TextInput autoCapitalize="characters" style={styles.input} onChangeText= {(value) => this.setState({matricula: value})} placeholderTextColor= {AppColors.inputPlaceHolder} placeholder="Ej. 0000 AAA"></TextInput>
        <Text style={{color:"#FFF"}}>Fecha:</Text> 
        <View style={styles.view_horizontal}>
          <View style={{...styles.input, width: "34%"}}>
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
          <View style={{...styles.input, width: "28%", marginLeft: 5, }}>
            <Picker selectedValue={this.state.dia} onValueChange={(itemValue, itemIndex) => {this.checkDia(itemValue)}}>
              {
                this.state.dias.map((dia) => {
                  return(
                    <Picker.Item label={dia+""} value={dia} key={dia}/>
                  )
                })
              }
            </Picker>
          </View>
          <View style={{...styles.input, width: "35%", marginLeft: 5}}>
            <Picker selectedValue={this.state.año} onValueChange={(itemValue, itemIndex) => {this.checkAño(itemValue)}}>
              <Picker.Item label={this.state.añoActual+""} value={this.state.añoActual} key={this.state.añoActual}/>
              <Picker.Item label={this.state.añoActual+1+""}  value={this.state.añoActual+1} key={this.state.añoActual+1}/>
            </Picker>
          </View>
        </View>
        <Text style={{color:"#FFF"}}>Hora:</Text>
        <View style={styles.input}>
          <Picker selectedValue={this.state.hora} onValueChange={(value, index) => this.setState({hora: value})}>
            {
              this.state.horasDia.map((value) => {
                return(
                  <Picker.Item label={value+""} value={value} key={value}/>
                )
              })
            }
          </Picker>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.crearCita}>
          <Text style={styles.buttonText}>CREAR CITA</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgrounLogin,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: AppColors.inputLogin,
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  buttonContainer: {
      backgroundColor: AppColors.buttonLogin,
      height: 40,
      borderRadius: 5,
      justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: AppColors.white,
  },
  view_horizontal: {
    flexDirection: "row",
  },
});

/*
  var cita = {
                    "matricula": matricula,
                    "usuario": data.id,
                    "estacion": this.state.operario.estacion,
                    "operario": this.state.operario.id,
                    "resultado": 0,
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



                  
*/