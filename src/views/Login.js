import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    ToastAndroid
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import {constantes} from '../data/constantes';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            resultadoQuery: null,
        };
    };

    login = () => {
        /*fetch("http://"+constantes.ip+":8080/itvApp/userList")
        .then(response => response.json() )
        .then(data => console.log(data[0].email) )
        .catch(error => console.log(error));
        */
        
        if (this.state.email !== "" && this.state.password !== ""){
            var user = {
                "id": null,
                "email": this.state.email,
                "password": this.state.password,
            }

            fetch("http://"+constantes.ip+":8080/itvApp/loginOperario", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(user),
            })
            .then(response => {  
                return response.json();   
            })
            .then(data => { 
                if (data.id){
                    this.props.navigation.navigate('Main', {"operario": data})
                }else{
                    ToastAndroid.show("Usuario o contraseña erróneos.", ToastAndroid.SHORT);
                }
            });
        }else{
            ToastAndroid.show("Rellene correctamente los campos usuario y contraseña.", ToastAndroid.SHORT);
        }
    };

    register = () => {
        this.props.navigation.navigate('Signup');
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/logo-itv.png')}></Image>
                </View>
                <View style={styles.textContiner}>
                    <TextInput
                        style={styles.input} 
                        placeholder="Correo"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({email: value})}
                        keyboardType="email-address"
                        />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Contraseña"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="go"
                        secureTextEntry
                        autoCapitalize="none"
                        ref = {(input) => this.passwordInput = input}
                        onChangeText= {(value) => this.setState({password: value})}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                        <Text style={styles.buttonText}>ACCEDER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSignUp} onPress={this.register}>
                        <Text style={styles.buttonText}>¿No tienes cuenta aún? REGÍSTRATE</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgrounLogin
    },
    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: "cover",
    },
    textContiner: {
        padding: 20,
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
    buttonSignUp: {
        paddingVertical: 12,
        marginBottom: 10,
    },
    buttonText: {
        textAlign: "center",
        color: AppColors.white,
    },
});
