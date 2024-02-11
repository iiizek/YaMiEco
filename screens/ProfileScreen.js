import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    position: relative;
`;

const ProfileScreen = () => {
    return (
        <Container>
            <Image
                source={require('../assets/stubs/profile.jpg')}
                style={{ marginTop: 18, width: '100%', height: '106%' }}
            />
        </Container>
    );
};

export default ProfileScreen;
