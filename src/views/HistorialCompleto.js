import React, { Component } from 'react';
import { 
    StyleSheet, 
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import CitasList from '../components/CitasList';
import {constantes} from '../data/constantes';
import FAB from '../components/FAB';
import {getColors as AppColors} from '../styles/colors';

export default class HistorialCompleto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operario: this.props.route.params.operario,
            citas: [],
        };
    }

    componentDidMount = () => {
        fetch("http://"+constantes.ip+":8080/itvApp/getCitaByOperario", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(this.state.operario.id),
        }).then(response => {  
                return response.json();   
        }).then(data => { 
            console.log(data);
            this.setState({citas: data})
        });
    }

    onPressItem = (param) => {
        this.props.navigation.navigate('Datos', {cita: param, operario: this.state.operario})
    }

    handleRefresh = () => {
        fetch("http://"+constantes.ip+":8080/itvApp/getCitaByOperario", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(this.state.operario.id),
        }).then(response => {  
                return response.json();   
        }).then(data => { 
            console.log(data);
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
                    <Text>No hay ninguna ITV realizada por usted.</Text>
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
    backgroundColor: "#FFF",
    },
});
