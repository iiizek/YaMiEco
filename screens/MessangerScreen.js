import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { RadioButton } from 'react-native-paper';

const Container = styled.View`
    flex: 1;
    position: relative;
`;

const ImageContainer = styled.TouchableOpacity`
    flex: 1;
`;

const MessangerScreen = () => {
	const [openChat, setOpenChat] = React.useState(false);

    return (
        <Container onPress={() => setOpenChat(!openChat)}>
            <ImageContainer onPress={() => setOpenChat(!openChat)}>
                <Image
                    source={
                        !openChat
                            ? require('../assets/stubs/messanger1.jpg')
                            : require('../assets/stubs/messanger2.jpg')
                    }
                    style={{ marginTop: openChat ? 60 : 35, width: '100%', height: '56%' }}
                />
            </ImageContainer>

            <View
                style={
                    !openChat
                        ? {
                              display: 'flex',
                              flexDirection: 'row',
                              position: 'absolute',
                              left: 0,
                              top: -5,
                              zIndex: 101,
                              padding: 15,
                          }
                        : {
                              display: 'flex',
                              flexDirection: 'row',
                              position: 'absolute',
                              left: 0,
                              bottom: -5,
                              zIndex: 101,
                              padding: 15,
                          }
                }>
                <TextInput
                    placeholder={!openChat ? 'Поиск по чатам' : 'Сообщение'}
                    style={{
                        width: '98%',
                        marginRight: 15,
                        padding: 10,
                        backgroundColor: 'white',
                        borderRadius: 10,
                    }}
                />
            </View>
        </Container>
    );
};

export default MessangerScreen;
