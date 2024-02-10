import React from 'react';
import { TouchableOpacity, Text, View, TextInput, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
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

const initialRegion = {
    latitude: 47.2312,
    longitude: 39.7232,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const markers = [
    {
        id: 1,
        title: '',
        coordinate: {
            latitude: 47.2312,
            longitude: 39.7232,
        },
    },
];



const MapScreen = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newMarkerTitle, setNewMarkerTitle] = React.useState('');
    const [newMarkerDescription, setNewMarkerDescription] = React.useState('');

    const handleAddMarker = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newMarker = {
                    id: markers.length + 1,
                    title: newMarkerTitle,
                    description: newMarkerDescription,
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                };

                setMarkers([...markers, newMarker]);
                setModalVisible(false);
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    };

    return (
        <Container>
            <Map region={initialRegion} style={{ flex: 1 }}>
                {markers.map((marker) => (
                    <Marker key={marker.id} title={marker.title} coordinate={marker.coordinate}>
                        <MarkerContainer>
                            <MarkerIcon>{marker.title}</MarkerIcon>
                        </MarkerContainer>
                    </Marker>
                ))}
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
                onPress={() => setModalVisible(true)}
                >
                <Text
                    style={{
                        color: '#33363f',
                        fontSize: 48,
                        textAlign: 'center',
                    }}>
                    +
                </Text>
            </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: 10, left: 15, width: '85%' }}>
                {modalVisible && (
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#ccc',
                        }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                            }}
                            onChangeText={(text) => setNewMarkerTitle(text)}
                            value={newMarkerTitle}
                            placeholder="Название метки"
                        />
                        <TextInput
                            style={{
                                height: 80,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                                textAlignVertical: 'top',
                            }}
                            onChangeText={(text) => setNewMarkerDescription(text)}
                            value={newMarkerDescription}
                            placeholder="Описание метки"
                            multiline={true}
                        />
                        <Button title="Добавить метку" onPress={handleAddMarker} />
                        <Button title="Отменить" onPress={() => setModalVisible(false)} />
                    </View>
                )}
            </View>
        </Container>
    );
};

export default MapScreen;
