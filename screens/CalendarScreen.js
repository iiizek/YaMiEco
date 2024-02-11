import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styled from'styled-components/native';
import { RadioButton } from 'react-native-paper';

const Container = styled.View`
    flex: 1;
	position: relative;
`;

const CalendarScreen = () => {

    const [openFilter, setOpenFilter] = React.useState(false);
    
  return (
      <Container>
          <Image
              source={require('../assets/stubs/calendar.jpg')}
              style={{ marginTop: 18, width: '100%', height: '70%' }}
          />
          <View
              style={{
                  display: 'flex',
                  flexDirection: 'row',
                  position: 'absolute',
                  right: 0,
                  top: -5,
                  zIndex: 101,
                  padding: 15,
              }}>
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
}

export default CalendarScreen