import React, {Component} from 'react';
import { 
    StyleSheet, 
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import Communications from 'react-native-communications';
import {constantes} from '../data/constantes';

export default class DatosCita extends Component {
    constructor(props){
        super(props);
        this.state = {
            cita: this.props.route.params.cita,
            operario: this.props.route.params.operario,
            usuario: {},
            coche: {},
            estacion: {},
        }
    };

    componentDidMount = () => {
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
            console.log("Aqui despues debería ir el usuario")
            console.log(data)
            if (data.id){
                this.setState({usuario: data})
            }else{
                ToastAndroid.show("Usuario o contraseña erróneos.", ToastAndroid.SHORT);
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
            console.log("Aqui debajo iria el coche")
            console.log(data)
            if (data.matricula){
                this.setState({coche: data})
            }else{
                ToastAndroid.show("Usuario o contraseña erróneos.", ToastAndroid.SHORT);
            }
        });
        console.log(this.state.operario);
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
            console.log("Aqui iria la estacion")
            console.log(data)
            if (data.id){
                this.setState({estacion: data})
            }else{
                ToastAndroid.show("Usuario o contraseña erróneos.", ToastAndroid.SHORT);
            }
        });
    }
    

    cargarresultado = () => {
        if (this.state.cita.resultado == 0){
            return (
                <Text style={styles.title}>Sin resultados.</Text>
            );
        }else if (this.state.cita.resultado == 1){
            return (
                <Text style={{...styles.title, color: AppColors.verde}}>Apta.</Text>
            );
        }else{
            return (
                <Text style={{...styles.title, color: AppColors.red}}>No apta.</Text>
            );
        }
    };

    cargarObservaciones = () => {
        if (this.state.cita.resultado != 0){
            return (
                <View>
                    <Text style={styles.subtitle}>Operario al cargo:</Text>
                    <View>
                        <Text>{this.state.operario.nombre}</Text>
                    </View>
                    <Text style={styles.subtitle}>Observaciónes del operario:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>{this.state.cita.observaciones}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.mandarCorreo}>
                        <Text style={styles.buttonText}>MANDAR POR CORREO</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    mandarCorreo = () => {
        Communications.email([this.state.email], null, null, "Informe ITV", cita);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.subcontainer}>
                    <View style={styles.view_horizontal}>
                        <Text style={styles.title}>Resultado evaluación: </Text>
                        {this.cargarresultado()}
                    </View>
                    <View>
                        <Text style={styles.title}>Información del vehículo:</Text>
                        <Text style={styles.subtitle}>Marca y modelo:</Text>
                        <View style={styles.view_contorno}>
                            <Text style={styles.text}>
                                {this.state.coche.marca + " " + this.state.coche.modelo}
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
                        <Text style={styles.subtitle}>Lugar:</Text>
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
                    {this.cargarObservaciones()}
                </View>
            </SafeAreaView>
        );
    };
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
