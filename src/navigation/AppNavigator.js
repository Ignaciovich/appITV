import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    CrearCita,
    DatosCita,
    Escaner,
    HistorialCompleto,
    HistorialHoy,
    Login,
    Signup,
    Main,
    Informe,
} from '../views';
import {getColors as AppColors} from '../styles/colors';

const Stack = createStackNavigator();

function StackNavigator(params){
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name='Main' component={Main} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,              
                },
                title: "Principal",
            }}/>
            <Stack.Screen name="Login" component={Login} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,                
                },
            }}/>
            <Stack.Screen name="Signup" component={Signup} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,              
                },
                title: "Signup",
            }}/>
            <Stack.Screen name="Historial_hoy" component={HistorialHoy} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,       
                },
                title: "Citas para hoy",
            }}/>
            <Stack.Screen name="Historial_full" component={HistorialCompleto} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,       
                },
                title: "Historial de citas",
            }}/>
            <Stack.Screen name="Escaner" component={Escaner} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,           
                },
                title: "Escaner de QR",
            }}/>
            <Stack.Screen name="Informe" component={Informe} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,           
                },
                title: "Generar informe ITV",
            }}/>
            <Stack.Screen name="Datos" component={DatosCita} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,           
                },
                title: "Datos de cita",
            }}/>
            <Stack.Screen name="Crear" component={CrearCita} options={{
                headerStyle: {
                    backgroundColor: AppColors.backgrounLogin,
                    elevation: 0,          
                },
                title: "Creación de cita",
            }}/>
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    );
};