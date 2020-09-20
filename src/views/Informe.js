import React, { Component } from 'react';
import { 
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';

export default class Informe extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cita: this.props.route.params.cita,
        usuario: null,
        coche: null,
        operario: this.props.route.params.operario,
        estacion: null,
    }
  }

  componentDidMount = () => {
    cargarUsuario();  
    cargarCoche();
    cargarEstacion();
  }

  cargarUsuario = async() => {
    fetch("http://"+constantes.ip+":8080/itvApp/getUsuarioById", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body:  JSON.stringify(this.state.cita.usuario),
    }).then(function(response){  
        return response.json();   
    }).then(data => { 
        console.log(data)
        if (data.id){
            this.setState({usuario: data})
        }else{
            ToastAndroid.show("Usuario o contraseña erróneos.", ToastAndroid.SHORT);
        }
    });
  }

  cargarCoche = async() => {
    fetch("http://"+constantes.ip+":8080/itvApp/getCocheByMatricula", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body:  JSON.stringify(this.state.cita.matricula),
    }).then(function(response){  
        return response.json();   
    }).then(data => { 
        console.log(data)
        if (data.matricula){
            this.setState({coche: data})
        }else{
            ToastAndroid.show("Usuario o contraseña erróneos.", ToastAndroid.SHORT);
        }
    });
  }
  
  cargarEstacion = async() => {
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
        console.log(data)
        if (data.id){
            this.setState({estacion: data})
        }else{
            ToastAndroid.show("Usuario o contraseña erróneos.", ToastAndroid.SHORT);
        }
    });
  }

  generarInforme = () =>{
      
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subcontainer}>
                <View>
                    <Text style={styles.title}>Información del usuario:</Text>
                    <View>
                        <Text style={styles.subtitle}>Nombre completo:</Text>
                        <View style={styles.view_contorno}>
                            <Text style={styles.text}>
                                {this.state.usuario.nombre}
                            </Text>
                        </View>
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
                </View>
                <View>
                    <Text style={styles.subtitle}>Estación:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.estacion.nombre}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.subtitle}>Fecha y hora:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.cita.fecha} {this.state.cita.hora}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.subtitle}>Operario al cargo:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.operario.nombre}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.subtitle}>Observaciones:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>
                            {this.state.cita.obserciones}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.generarInforme}>
                    <Text style={styles.buttonText}>
                        GENERAR INFORME
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    subcontainer: {
        margin: 10,
        marginTop: 50,
    },
    view_horizontal:{
        flexDirection: "row",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    subtitle: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    buttonContainer: {
        backgroundColor: AppColors.buttonLogin,
        paddingVertical: 15,
        marginTop: 20,
        borderRadius: 5,
        height: 50,
    },
    buttonText: {   
        textAlign: "center",
        color: AppColors.white,
    },
    view_contorno:{
        backgroundColor: "#d9d9d9",
        marginBottom: 10,
        borderRadius: 5,
    },
    text: {
        padding: 5,
    }
    });
