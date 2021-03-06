import React, { Component } from 'react';
import { 
    StyleSheet, 
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import CitasList from '../components/CitasList';
import FAB from '../components/FAB';
import {constantes} from '../data/constantes';
import {getColors as AppColors} from '../styles/colors';

export default class HistorialHoy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fecha: new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear(),
            citas: [],
            operario: this.props.route.params.operario,
        };
    }

    componentDidMount = () => {
        const {fecha, operario} = this.state;
        const cita = {
            "fecha": fecha,
            "estacion": operario.estacion,
        }
        fetch("http://"+constantes.ip+":8080/itvApp/getCitaByFecha", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(cita),
        }).then(response => {  
                return response.json();   
        }).then(data => { 
            this.setState({citas: data})
        });
    }

    onPressItem = (param) => {
        this.props.navigation.navigate('Datos', {cita: param, operario: this.state.operario})
    }

    handleRefresh = () => {
        const {fecha, operario} = this.state;
        const cita = {
            "fecha": fecha,
            "estacion": operario.estacion,
        }
        fetch("http://"+constantes.ip+":8080/itvApp/getCitaByFecha", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(cita),
        }).then(response => {  
                return response.json();   
        }).then(data => { 
            this.setState({citas: data})
        });
    }

    comprobarITV = () => {
        if (this.state.citas.length > 0){
            return (
                <CitasList citas={this.state.citas} onPressItem={this.onPressItem}/>
            )
        }else{
            return (
                <View>
                    <Text>No hay ninguna ITV para el día de hoy.</Text>
                </View>
            )
        }
    }

    render() {
        return (
        <SafeAreaView style={styles.container}>
            {this.comprobarITV()}
            <FAB
                icon="ios-refresh"
                fabStyle={{backgroundColor: AppColors.buttonLogin}}
                textStyle={{color: AppColors.black}}
                onPress={this.handleRefresh}
            />
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
});

// new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()