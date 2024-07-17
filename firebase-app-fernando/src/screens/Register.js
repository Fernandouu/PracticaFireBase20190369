import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import FlatButton from '../components/Button';
import CustomInput from '../components/Input';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const auth = getAuth();
    
    const handleRegistration = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuario creado');
            Alert.alert('Registro Exitoso', 'El usuario ha sido creado correctamente', [
                {
                    text: 'OK', onPress: () => navigation.navigate('LogIn'),
                },
            ]);
        } catch (error) {
            console.error('Error de registro:', error.message);
            Alert.alert('Error de registro', 'Hubo un error al registrar el usuario', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'OK'},
            ]);
        }
    };

    const goToLogin = () => {
        navigation.navigate('LogIn');
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar</Text>
            <CustomInput
                containerStyle={{ marginHorizontal: 20, marginTop: 10 }}
                placeholder={'Correo Electrónico'}
                value={email}
                onChangeText={setEmail}
            />
            <CustomInput
                containerStyle={{ marginHorizontal: 20, marginTop: 15, marginBottom: 30 }}
                placeholder={'Contraseña'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <FlatButton style={styles.button} text='Registrar' onPress={handleRegistration} />
            <View style={styles.row}>
                <Text style={styles.text1}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={goToLogin}>
                    <Text style={styles.link1}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        justifyContent: 'center',
        padding: 20,
    },
    text1: {
        marginTop: 50,
        fontSize: 16
    },
    link1: {
        fontSize: 16,
        marginLeft: 5,
        marginTop: 50,
        color: 'blue'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
