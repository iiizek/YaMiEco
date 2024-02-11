import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { RadioButton } from 'react-native-paper';

const Container = styled.View`
    flex: 1;
    position: relative;
`;

const FeedScreen = () => {
    const [openFilter, setOpenFilter] = React.useState(false);

    return (
        <Container>
            <Image 
				source={require('../assets/stubs/feed.jpg')}
				style={{ marginTop: 65, width: '100%', height: '100%' }}
			/>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    left: 0,
                    top: -5,
                    zIndex: 101,
                    padding: 15,
                }}>
                <TextInput
                    placeholder="Поиск по постам"
                    style={{
                        width: '70%',
                        marginRight: 15,
                        padding: 10,
                        backgroundColor: 'white',
                        borderRadius: 10,
                    }}
                />

                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: 'white',
                        borderRadius: 10,
                    }}
                    onPress={() => setOpenFilter(!openFilter)}>
                    <Text style={{ fontWeight: 600 }}>ФИЛЬТРЫ</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    zIndex: 102,
                    position: 'absolute',
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 12,
                    borderTopRightRadius: 0,
                    top: 57.5,
                    right: 15,
                    display: openFilter ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: 20,
                }}>
                <View
                    style={{
                        backgroundColor: 'lightgray',
                        padding: 8,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <RadioButton status="checked" disabled={true} />
                    <Text style={{ fontSize: 16 }}>Родники</Text>
                </View>
                <View
                    style={{
                        backgroundColor: 'lightgray',
                        padding: 8,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <RadioButton status="checked" disabled={true} />
                    <Text style={{ fontSize: 16 }}>Мусор</Text>
                </View>
                <View
                    style={{
                        backgroundColor: 'lightgray',
                        padding: 8,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <RadioButton status="checked" disabled={true} />
                    <Text style={{ fontSize: 16 }}>Загрязнения</Text>
                </View>
                <View
                    style={{
                        backgroundColor: 'lightgray',
                        padding: 8,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <RadioButton status="checked" disabled={true} />
                    <Text style={{ fontSize: 16 }}>Субботники</Text>
                </View>
            </View>
        </Container>
    );
};

export default FeedScreen;
