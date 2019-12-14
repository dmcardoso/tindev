import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {Container, Logo, Input, Button, ButtonText} from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import logo from '../../assets/images/logo.png';
import api from '../../services/api';

function Login({navigation}) {
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Devs', {user});
            }
        });
    }, []);

    async function handleLogin() {
        const response = await api.post('/devs', {username: user});

        const {_id} = response.data;

        await AsyncStorage.setItem('user', _id);
        navigation.navigate('Devs', {user: _id});
    }

    return (
        <Container
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <Logo source={logo}/>
            <Input
                placeholder="Digite seu usuário no Github"
                autoCapitalize="none"
                autoCorrect={false}
                value={user}
                onChangeText={setUser}
                placeholderTextColor="#999"
            />
            <Button onPress={handleLogin}>
                <ButtonText>Entrar</ButtonText>
            </Button>
        </Container>
    );
}

export default Login;
