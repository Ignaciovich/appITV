import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Picker,
    ToastAndroid,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import {constantes} from '../data/constantes';

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordRepeat: '',
            nombre: '',
            estaciones: [],
            estacion: 1,
        };
    };

    componentDidMount = async() => {
        await fetch("http://"+constantes.ip+":8080/itvApp/estacionList")
        .then(response => response.json() )
        .then(data => {
            this.setState({estaciones: data})
        })
        .catch(error => console.log(error));
    };

    crearUsuario = () => {
        const {email, password, passwordRepeat, nombre, estacion} = this.state;
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regex.test(email.toLowerCase()) && email !== ""){
            if (password === passwordRepeat && password !== ""){
                if (password.length >= 2){
                    if (/\d/.test(password)){
                        if (nombre !== ""){
                            var operario = {
                                "id": null,
                                "email": email,
                                "password": password,
                                "nombre": nombre,
                                "estacion": estacion,
                            }
        
                            fetch("http://"+constantes.ip+":8080/itvApp/createOperario", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }, 
                            body:  JSON.stringify(operario),
                            }).then(response => {  
                                if (response.status != 200){
                                    ToastAndroid.show("Ya existe un operario con ese correo.", ToastAndroid.SHORT);
                                }
                            }).then(data => { 
                                ToastAndroid.show("Operario registrado con éxito.", ToastAndroid.SHORT);
                                this.props.navigation.goBack();
                            });
                            
                        }else{
                            ToastAndroid.show("Introduzca su nombre, por favor.", ToastAndroid.SHORT);
                        }
                    }else{
                        ToastAndroid.show("La contraseña debe contener algún carácter numérico.", ToastAndroid.SHORT);
                    }
                }else{
                    ToastAndroid.show("La contraseña debe tener una extensión minima de 8 carácteres.", ToastAndroid.SHORT);
                }
            }else{
                ToastAndroid.show("Introduzca la contraseña 2 veces, por favor.", ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show("Introduzca un correo correcto, por favor.", ToastAndroid.SHORT);
        }
    }

    cargarEstaciones = () => {
        const {estaciones} = this.state;

        if (estaciones.length > 0){
            return (
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={this.state.estacion} mode="dropdown" onValueChange={(itemValue, itemIndex) => {this.setState({estacion: itemValue})}}
                    >
                        {estaciones.map((estacion) => {
                            return(
                                <Picker.Item value={estacion.id} label={estacion.nombre} key={estacion.id}/>
                            )
                        })}
                    </Picker>
                </View>
            )
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.fullContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Correo"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({email: value})}
                        ref = {(input) => this.emailInput = input}
                        keyboardType="email-address"
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Contraseña"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordRepeatInput.focus()}
                        secureTextEntry
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({password: value})}
                        ref = {(input) => this.passwordInput = input}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Repetir contraseña"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.nameInput.focus()}
                        secureTextEntry
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({passwordRepeat: value})}
                        ref = {(input) => this.passwordRepeatInput = input}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Nombre completo"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        onSubmitEditing={() => this.telefonoInput.focus()}
                        autoCapitalize="words"
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({nombre: value})}
                        ref = {(input) => this.nameInput = input}
                    />
                    {this.cargarEstaciones()}
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.crearUsuario}>
                        <Text style={styles.buttonText}>FINALIZAR</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgrounLogin,
        justifyContent: 'center',
    },
    fullContainer: {
        padding: 20,
        marginTop: 20,
    },
    input: {
        backgroundColor: AppColors.inputLogin,
        color: AppColors.black,
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
    pickerContainer: {
        borderRadius: 5,
        backgroundColor: AppColors.inputLogin,
        marginBottom: 15,
        height: 40,
        justifyContent: 'center',
    },
    picker: {
        color: AppColors.inputPlaceHolder,
    },
    item: {
        color: AppColors.white,
    },               
})
