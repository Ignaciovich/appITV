import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import HR from './HR';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getColors as AppColors} from '../styles/colors';

const CitasList = ({citas, onPressItem}) => {
    
    return (
        <ScrollView style={styles.list}>
            {citas.map((cita) => (
                <View style={styles.stack} key={cita.id}>
                    <TouchableOpacity onPress={() => onPressItem(cita)} style={styles.button}>
                        <View style={styles.img_container}>
                            <Ionicons name="ios-calendar" size={80} color={AppColors.backgrounLogin} />   
                        </View>
                        <View>
                            <View style={styles.text_container}>
                                <Text style={styles.text_title}>Fecha: </Text>
                                <Text>{cita.fecha}</Text>
                            </View>
                            <View style={styles.text_container}>
                                <Text style={styles.text_title}>Hora: </Text>
                                <Text>{cita.hora}</Text>
                            </View>
                            <View style={styles.text_container}>
                                <Text style={styles.text_title}>Matrícula: </Text>
                                <Text>{cita.matricula}</Text>
                            </View>   
                        </View> 
                    </TouchableOpacity>
                    <HR/>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        width: Dimensions.get('window').width,
        paddingTop: 6,
    },
    stack: {
        marginTop: 10,
    },
    button: {
        flexDirection: "row",
        paddingLeft: 10,
    },
    text_container:{
        flexDirection: "row",
    },
    text_title:{
        fontWeight: "bold",  
    },
    img_container: {
        height: 80,
        width: 80,
        marginTop: -8,
    },
});

export default CitasList;

/*
            {citas.map((cita) => (
                <View style={styles.stack}>
                    <TouchableOpacity onPress={() => onPressItem(cita)} style={styles.button}>
                        <View>
                            <View style={styles.text_container}>
                                <Text style={styles.text_title}>Dirección: </Text>
                                <Text>{cita.estacion}</Text>
                            </View>
                            <View style={styles.text_container}>
                                <Text style={styles.text_title}>Fecha: </Text>
                                <Text>{cita.fecha} {cita.hora}</Text>
                            </View>
                            <View style={styles.text_container}>
                                <Text style={styles.text_title}>Matrícula: </Text>
                                <Text>{cita.coche}</Text>
                            </View>
                        </View>                        
                        <View style={styles.img_container}>
                            <Image style={styles.img} source={require('../../assets/icons8-info-48.png')}/>   
                        </View>
                    </TouchableOpacity>
                    <HR/>
                </View>
            ))}
*/