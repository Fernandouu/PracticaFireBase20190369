import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import FlatButton from '../components/Button';
import CustomInput from '../components/Input';

const LogIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); 
    const [isLogin, setIsLogin] = useState(true);
    
    const auth = getAuth();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                Alert.alert('Bienvenido', 'Has iniciado correctamente', [
                    {
                        text: 'OK', onPress: () =>  navigation.navigate('Home'),
                    },
                  ]);
            }
            setUser(user);
        });
    
        return () => unsubscribe();
    }, [auth, navigation]);
    
    const handleAuthentication = async () => {
        try {
            if (user) {
                console.log('Cerrando sesión');
                await signOut(auth);
            } else {
                if (isLogin) {
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('Ingresando');
                } else {
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log('Usuario creado');
                }
            }
        } catch (error) {
            console.error('Error de autenticación:', error.message);
            Alert.alert('Error de autenticación', 'Hubo un error al iniciar', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'OK'},
              ]);
        }
    };
    
    const goToRegistrar = () => { 
        navigation.navigate('Register');
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <CustomInput
                containerStyle={{ marginHorizontal: 20, marginTop: 10 }}
                placeholder={'Usuario'}
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
            <FlatButton style={styles.button} text='Iniciar Sesión' onPress={handleAuthentication} />
            <View style={styles.row}>
                <Text style={styles.text1}>¿No tienes cuenta?</Text>
                <TouchableOpacity onPress={goToRegistrar}>
                    <Text style={styles.link1}>Crea una cuenta</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textGoogle}>
                <TouchableOpacity>
                    <Text style={styles.linkGoogle}>Ingresa con Google</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default LogIn;

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
    linkGoogle: {
        fontSize: 16,
        marginTop: 20,
        color: 'blue',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textGoogle: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    Subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color:'#ff9800'
    },
    Button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
        paddingVertical: 20,
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flexGrow: 1,
    },
});
