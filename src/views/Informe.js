import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Picker,
    TextInput,
    ToastAndroid,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import {constantes} from '../data/constantes';

export default class Informe extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cita: this.props.route.params.cita,
        usuario: {},
        coche: {},
        operario: this.props.route.params.operario,
        estacion: {},
        resultado: 1,
        observaciones: "",
    }
  }

  componentDidMount = async() => {
    fetch("http://"+constantes.ip+":8080/itvApp/getUserById", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body:  JSON.stringify(this.state.cita.usuario),
    }).then(function(response){  
        return response.json();   
    }).then(data => { 
        if (data.id){
            this.setState({usuario: data});
        }
    });

    const coche = {
        "matricula": this.state.cita.matricula,
    }
    
    fetch("http://"+constantes.ip+":8080/itvApp/getCocheByMatricula", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body:  JSON.stringify(coche),
    }).then(function(response){  
        return response.json();   
    }).then(data => { 
        if (data.matricula){
            this.setState({coche: data});
        }
    });
    
    fetch("http://"+constantes.ip+":8080/itvApp/getEstacionById", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body:  JSON.stringify(this.state.operario.estacion),
    }).then(function(response){  
        return response.json();   
    }).then(data => { 
        if (data.id){
            this.setState({estacion: data});
        }
    });
  }

  generarInforme = () =>{
      const {cita, operario, observaciones, resultado} = this.state;

      
      if (observaciones !== ""){
        const citaUpdated = {
            "id": cita.id,
            "operario": operario.id,
            "observaciones": observaciones,
            "resultado": resultado,
        }
        console.log(operario);
        fetch("http://"+constantes.ip+":8080/itvApp/executeUpdateCita", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body:  JSON.stringify(citaUpdated),
        }).then(function(response){  
            return response.json();   
        }).then(function(data){
            console.log(data)
        });
    }else{
        ToastAndroid.show("Introduzca las observaciones, por favor.", ToastAndroid.SHORT);
    }
  }

  render() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.subcontainer}>
                    <Text style={styles.title}>Información del usuario:</Text>
                        <Text style={styles.subtitle}>Nombre:</Text>
                        <View style={styles.view_contorno}>
                            <Text style={styles.text}>
                                {this.state.usuario.nombre}
                            </Text>
                        </View>
                    <Text style={styles.title}>Información del vehículo:</Text>
                    <Text style={styles.subtitle}>Marca y modelo:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.coche.marca + " " +this.state.coche.modelo}
                        </Text>
                    </View>
                    <Text style={styles.subtitle}>Matrícula:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.coche.matricula}
                        </Text>
                    </View>
                    <Text style={styles.subtitle}>Estación:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.estacion.nombre}
                        </Text>
                    </View>
                    <Text style={styles.subtitle}>Fecha y hora:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.cita.fecha} {this.state.cita.hora}
                        </Text>
                    </View>
                    <Text style={styles.subtitle}>Operario al cargo:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.operario.nombre}
                        </Text>
                    </View>
                    <Text style={styles.subtitle}>Observaciones:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput style={styles.text} multiline onChangeText={(value) => this.setState({observaciones: value})}/>
                    </View>
                    <Text style={styles.subtitle}>Resultado:</Text>
                    <View style={styles.view_contorno}>
                        <Picker selectedValue={this.state.resultado} onValueChange={(value, index) => this.setState({resultado: value})}>
                            <Picker.Item value={1} label="Apto"/>
                            <Picker.Item value={2} label="No apto"/>
                        </Picker>
                    </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.generarInforme}>
                    <Text style={styles.buttonText}>
                        GENERAR INFORME
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgrounLogin,
    },
    subcontainer: {
       padding : 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
        color: AppColors.white,
    },
    subtitle: {
        fontWeight: "bold",
        marginBottom: 5,
        color: AppColors.white,
    },
    buttonContainer: {
        backgroundColor: AppColors.buttonLogin,
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
    },
    buttonText: {   
        textAlign: "center",
        color: AppColors.white,
    },
    view_contorno:{
        backgroundColor: AppColors.inputLogin,
        marginBottom: 15,
        borderRadius: 5,
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
    },
    text: {
        padding: 5,
        color: AppColors.white,
    }
    });
