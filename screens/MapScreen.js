import React from 'react';
import { TouchableOpacity, Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components/native';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import { RadioButton } from 'react-native-paper';

const Container = styled.View`
    flex: 1;
    position: relative;
`;

const Map = styled(MapView)`
    flex: 1;
`;

const MarkerContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

const MarkerIcon = styled.Text`
    font-size: 12px;
`;

const MapScreen = () => {
    const [initialRegion, setInitialRegion] = React.useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [newMarker, setNewMarker] = React.useState({
        id: 0,
        title: '',
        description: '',
        radio: 'blue',
        coords: {
            latitude: 0,
            longitude: 0,
        },
    });
    const [markers, setMarkers] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [keyboardOpen, setKeyboardOpen] = React.useState(false);
	const [openFilter, setOpenFilter] = React.useState(false);

    const isFocused = useIsFocused();

    React.useEffect(() => {
        if (isFocused) {
            (async () => {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    alert('Permission to access location was denied');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                setInitialRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            })();
        }
    }, [isFocused]);

    const handleAddMarker = () => {
        const currentMarker = newMarker;
        setMarkers([...markers, currentMarker]);
        setNewMarker({
            id: currentMarker.id + 1,
            title: '',
            description: '',
            radio: 'blue',
            coords: {
                latitude: 0,
                longitude: 0,
            },
        });
        setModalVisible(false);
        setKeyboardOpen(false);
    };

    const handleMapPress = (e) => {
        const newMarkerCoordinate = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
        };

        setNewMarker({ ...newMarker, coords: newMarkerCoordinate });
    };

    return (
        <Container>
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
                    placeholder="Поиск по карте"
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
					onPress={() => setOpenFilter(!openFilter)}
					>
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

            <Map region={initialRegion} style={{ flex: 1 }} onPress={handleMapPress}>
                {markers.map((marker) => (
                    <Marker key={marker.id} title={marker.title} coordinate={marker.coords}>
                        <MarkerContainer
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: String(marker.radio),
                                borderRadius: 9999,
                            }}></MarkerContainer>
                    </Marker>
                ))}
                <Marker title={'You'} coordinate={initialRegion}>
                    <MarkerContainer>
                        <MarkerIcon
                            style={{
                                backgroundColor: '#33363f',
                                padding: 2,
                                borderRadius: 9999,
                                color: '#fff',
                            }}>
                            ВЫ
                        </MarkerIcon>
                    </MarkerContainer>
                </Marker>
                {newMarker.coords.latitude === 0 && newMarker.coords.latitude === 0 ? null : (
                    <Marker coordinate={newMarker.coords}>
                        <MarkerContainer
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: 'red',
                                borderRadius: 9999,
                                color: '#fff',
                            }}></MarkerContainer>
                    </Marker>
                )}
            </Map>

            <TouchableOpacity
                style={{
                    width: '15%',
                    position: 'absolute',
                    bottom: 10,
                    right: 15,
                    backgroundColor: 'white',
                    padding: 0,
                    borderRadius: 9999,
                }}
                onPress={() => setModalVisible(true)}>
                <Text
                    style={{
                        color: '#33363f',
                        fontSize: 44,
                        textAlign: 'center',
                        marginBottom: 5,
                    }}>
                    +
                </Text>
            </TouchableOpacity>

            <View
                style={{
                    position: 'absolute',
                    bottom: keyboardOpen ? 250 : 10,
                    left: 15,
                    width: '75%',
					zIndex: 200
                }}>
                {modalVisible && (
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#ccc',
                        }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                                borderRadius: 6,
                                padding: 10,
                            }}
                            onChangeText={(text) => setNewMarker({ ...newMarker, title: text })}
                            value={newMarker.title}
                            placeholder="Название метки"
                            onFocus={() => setKeyboardOpen(true)}
                            onBlur={() => setKeyboardOpen(false)}
                        />
                        <TextInput
                            style={{
                                height: 80,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                                textAlignVertical: 'top',
                                borderRadius: 6,
                                padding: 10,
                            }}
                            onChangeText={(text) =>
                                setNewMarker({ ...newMarker, description: text })
                            }
                            value={newMarker.description}
                            placeholder="Описание метки"
                            multiline={true}
                            onFocus={() => setKeyboardOpen(true)}
                            onBlur={() => setKeyboardOpen(false)}
                        />

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ border: '1px solid black' }}>
                                    <RadioButton
                                        value="blue"
                                        status={
                                            newMarker.radio === 'blue' ? 'checked' : 'unchecked'
                                        }
                                        onPress={() =>
                                            setNewMarker({ ...newMarker, radio: 'blue' })
                                        }
                                    />
                                </View>
                                <Text>Родник</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="brown"
                                    status={newMarker.radio === 'brown' ? 'checked' : 'unchecked'}
                                    onPress={() => setNewMarker({ ...newMarker, radio: 'brown' })}
                                />
                                <Text>Мусор</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="green"
                                    status={newMarker.radio === 'green' ? 'checked' : 'unchecked'}
                                    onPress={() => setNewMarker({ ...newMarker, radio: 'green' })}
                                />
                                <Text>Субботник</Text>
                            </View>
                        </View>

                        <Text style={{ fontWeight: 600, marginBottom: 6 }}>
                            Нажмите на нужное место на карте для выбора координат
                        </Text>
                        <Text>{`Ширина: ${newMarker.coords.latitude}`}</Text>
                        <Text>{`Долгота: ${newMarker.coords.longitude}`}</Text>
                        <Button title="Добавить метку" onPress={handleAddMarker} />
                        <Button
                            title="Отменить"
                            onPress={() => {
                                setModalVisible(false);
                                setKeyboardOpen(false);
                            }}
                        />
                    </View>
                )}
            </View>
        </Container>
    );
};

export default MapScreen;
