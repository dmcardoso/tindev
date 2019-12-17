import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {TouchableOpacity} from "react-native";
import {
    Container,
    Logo,
    CardsContainer,
    Card,
    Avatar,
    Footer,
    Name,
    Bio,
    ButtonsContainer,
    Button,
    ImageButton,
    Empty,
    MatchContainer,
    ItsAMatch,
    MatchAvatar,
    MatchName,
    FecharText,
    Fechar, MatchBio,
} from './styles';
import AsyncStorage from "@react-native-community/async-storage";
import logo from '../../assets/images/logo.png';
import dislike from '../../assets/images/dislike.png';
import like from '../../assets/images/like.png';
import itsamatch from '../../assets/images/itsamatch.png';
import api from '../../services/api';

function Devs({navigation}) {
    const id = navigation.getParam('user');
    const [devs, setDevs] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const users = await api.get('/devs', {
                headers: {
                    user: id,
                },
            });

            setDevs(users.data);
        }

        loadUsers();
    }, [id]);

    useEffect(() => {
        const socket = io(api.defaults.baseURL, {query: {user: id}});

        socket.on('match', dev => {
            setMatchDev(dev);
        });
        return () => {
        };
    }, [id]);


    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    async function handleLike() {
        const [user, ...rest] = devs;

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: {
                user: id,
            },
        });

        setDevs(rest);
    }

    async function handleDislike() {
        const [user, ...rest] = devs;

        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: {
                user: id,
            },
        });

        setDevs(rest);
    }

    return (
        <Container>
            <TouchableOpacity onPress={handleLogout}>
                <Logo source={logo}/>
            </TouchableOpacity>
            <CardsContainer>
                {
                    devs.length > 0 ? devs.map((dev, index) =>
                            (
                                <Card key={dev._id} style={{zIndex: devs.length - index}}>
                                    <Avatar source={{uri: dev.avatar}}/>
                                    <Footer>
                                        <Name>{dev.name}</Name>
                                        <Bio numberOfLines={3}>{dev.bio}</Bio>
                                    </Footer>
                                </Card>
                            )) :
                        <Empty>Acabou! :(</Empty>
                }
            </CardsContainer>
            {devs.length > 0 && (
                <ButtonsContainer>
                    <Button onPress={handleDislike}>
                        <ImageButton source={dislike}/>
                    </Button>
                    <Button onPress={handleLike}>
                        <ImageButton source={like}/>
                    </Button>
                </ButtonsContainer>
            )}
            {matchDev && (
                <MatchContainer>
                    <ItsAMatch source={itsamatch}/>
                    <MatchAvatar source={{uri: matchDev.avatar}}/>
                    <MatchName>
                        {matchDev.name}
                    </MatchName>
                    <MatchBio>
                        {matchDev.bio}
                    </MatchBio>
                    <Fechar onPress={() => setMatchDev(null)}>
                        <FecharText>Fechar</FecharText>
                    </Fechar>
                </MatchContainer>
            )}
        </Container>
    );
}

export default Devs;
