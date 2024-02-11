import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Button,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components/native';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import { RadioButton } from 'react-native-paper';

import * as filtersJSON from '../json/filters.json';

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
        date: '',
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
	const [selectedMarker, setSelectedMarker] = React.useState(null);

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
        const currentTime = new Date();

        const today =
            currentTime.getDate() +
            '.' +
            (currentTime.getMonth() + 1) +
            '.' +
            currentTime.getFullYear();

        setNewMarker((prevState) => ({ ...prevState, date: today }));

        const currentMarker = newMarker;
        setMarkers((prevMarkers) => [...prevMarkers, currentMarker]);

        setNewMarker((prevState) => ({
            id: prevState.id + 1,
            date: '',
            title: '',
            description: '',
            radio: 'blue',
            coords: {
                latitude: 0,
                longitude: 0,
            },
        }));

        setModalVisible(false);
        handleOpenKeyboard(false);
    };

    const handleMapPress = (e) => {
        const newMarkerCoordinate = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
        };

        setNewMarker({ ...newMarker, coords: newMarkerCoordinate });
    };

    handleOpenKeyboard = (bool) => {
        if (Platform.OS === 'ios') {
            setKeyboardOpen(bool);
        }
    };

    const deleteMarker = (id) => {
        setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== id));
		setSelectedMarker(null);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        justifyContent: 'center',
                        alignItems: 'center',
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
                    {filtersJSON.mapFilters.map((filters) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'lightgray',
                                    padding: 8,
                                    borderRadius: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                key={filters.id}>
                                <RadioButton status="checked" disabled={true} />
                                <Text style={{ fontSize: 16 }}>{filters.name}</Text>
                            </View>
                        );
                    })}
                </View>

                <Map region={initialRegion} style={{ flex: 1 }} onPress={handleMapPress}>
                    {markers.map((marker) => {
                        markerType = {
                            blue: 'Родник',
                            brown: 'Мусор',
                            green: 'Субботник',
                            yellow: 'Загрязнение',
                        };
                        return (
                            <Marker
                                key={marker.id}
                                title={marker.title}
                                coordinate={marker.coords}
                                onPress={() => {
                                    if (selectedMarker === null) {
                                        setSelectedMarker(marker.id);
                                    } else if (selectedMarker === marker.id) {
                                        setSelectedMarker(null);
                                    }
                                }}>
                                <MarkerContainer
                                    style={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: String(marker.radio),
                                        borderRadius: 9999,
                                    }}>
                                    <Text style={{ color: '#fff' }}>
                                        {selectedMarker === marker.id ? 'x' : ''}
                                    </Text>
                                </MarkerContainer>

                                <View
                                    style={{
                                        padding: 10,
                                        borderRadius: 8,
                                        backgroundColor: '#fff',
                                        display: selectedMarker === marker.id ? 'block' : 'none',
                                        width: 150,
                                        zInedx: 201,
                                    }}>
                                    <Text style={{ fontSize: 18, fontWeight: 600 }}>
                                        {marker.title}
                                    </Text>
                                    <Text>{marker.description}</Text>
                                    <Text style={{ color: marker.radio }}>
                                        {markerType[marker.radio]}
                                    </Text>
                                    <Text>{marker.date}</Text>
                                    <Button
                                        title="Удалить"
                                        onPress={() => deleteMarker(marker.id)}></Button>
                                </View>
                            </Marker>
                        );
                    })}
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
                    {(newMarker.coords.latitude === 0 && newMarker.coords.latitude === 0) ||
                    !modalVisible ? null : (
                        <Marker coordinate={newMarker.coords}>
                            <MarkerContainer
                                style={{
                                    zIndex: 200,
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
                    onPress={() => {
                        setModalVisible(!modalVisible);
                        setNewMarker({
                            ...newMarker,
                            date: '',
                            title: '',
                            description: '',
                            radio: 'blue',
                            coords: {
                                latitude: 0,
                                longitude: 0,
                            },
                        });
                    }}>
                    <Text
                        style={{
                            color: '#33363f',
                            fontSize: 44,
                            textAlign: 'center',
                            marginBottom: 5,
                        }}>
                        {modalVisible ? 'x' : '+'}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        position: 'absolute',
                        bottom: keyboardOpen ? 250 : 10,
                        left: 15,
                        width: '75%',
                        zIndex: 200,
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
                                onFocus={() => handleOpenKeyboard(true)}
                                onBlur={() => handleOpenKeyboard(false)}
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
                                onFocus={() => handleOpenKeyboard(true)}
                                onBlur={() => handleOpenKeyboard(false)}
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
                                        status={
                                            newMarker.radio === 'brown' ? 'checked' : 'unchecked'
                                        }
                                        onPress={() =>
                                            setNewMarker({ ...newMarker, radio: 'brown' })
                                        }
                                    />
                                    <Text>Мусор</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value="green"
                                        status={
                                            newMarker.radio === 'green' ? 'checked' : 'unchecked'
                                        }
                                        onPress={() =>
                                            setNewMarker({ ...newMarker, radio: 'green' })
                                        }
                                    />
                                    <Text>Субботник</Text>
                                </View>
                            </View>

                            <Text style={{ fontWeight: 800, marginBottom: 6, color: 'blue' }}>
                                Нажмите на нужное место на карте для выбора координат
                            </Text>
                            <Text>{`Ширина: ${newMarker.coords.latitude}`}</Text>
                            <Text>{`Долгота: ${newMarker.coords.longitude}`}</Text>
                            <Button title="Добавить метку" onPress={handleAddMarker} />
                            <Button
                                title="Добавить фотографию"
                                onPress={() => {
                                    setModalVisible(false);
                                    setKeyboardOpen(false);
                                }}
                            />
                        </View>
                    )}
                </View>
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default MapScreen;
