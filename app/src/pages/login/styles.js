import {KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import styled from "styled-components";

export const Container = styled(KeyboardAvoidingView)`
    justify-content: center;
    align-items: center;
    flex: 1;
    background: #f5f5f5;
    padding: 30px;
`;

export const Logo = styled(Image)`
    justify-content: center;
    align-items: center;
`;

export const Input = styled(TextInput)`
    height: 46px;
    align-self: stretch;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 20px;
    padding: 0 15px;
`;

export const Button = styled(TouchableOpacity)`
    height: 46px;
    align-self: stretch;
    background-color: #df4723;
    border-radius: 4px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled(Text)`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;
