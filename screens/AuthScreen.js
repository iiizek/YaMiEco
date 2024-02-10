// import React from 'react';
// import styled from 'styled-components';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import { setAuthenticated } from '../redux/actions'
// import { connect } from 'react-redux';

// function AuthScreen(props) {
//     const Background = styled.View`
//         flex: 1;
//         background-color: #2d332f;
//     `;

//     const HeadingLogo = styled.View`
//         margin: 0 auto;
//         margin-top: 50px;
//         padding: 8px 26px;
//         background-color: #3c9d56;
//         border-radius: 10px;
//     `;

//     const LogoText = styled.Text`
//         font-size: 30px;
//         font-weight: 800;
//         color: white;
//     `;

//     const LogoTextEco = styled.Text`
//         font-size: 30px;
//         font-weight: 800;
//         color: #1ff20c;
//     `;

//     const WrapperAuth = styled.View`
//         width: 85%;
//         margin: 0 auto;
//         margin-top: 30%;
//         padding: 16px;
//         background-color: #3c9d56;
//         border-radius: 10px;
//         shadow-color: #000;
//         shadow-offset: 0px 2px;
//         shadow-opacity: 0.25;
//         shadow-radius: 3.84px;
//         elevation: 5;
//     `;

//     const AuthInputs = styled.View`
//         display: flex;
//         flex-direction: column;
//         gap: 16px;
//     `;

//     const Input = styled.TextInput`
//         background-color: #fff;
//         width: 100%;
//         padding: 8px;
//         font-size: 18px;
//         border-radius: 6px;
//         border: 2px solid #344839;
//     `;

//     const InputDate = styled.TextInput`
//         background-color: #fff;
//         width: 100%;
//         padding: 8px;
//         font-size: 18px;
//         border-radius: 6px;
//         border: 2px solid #344839;
//     `;

//     const FlexAuth = styled.View`
//         margin-top: 10px;
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//     `;

//     const ChooseAuth = styled.TouchableOpacity`
//         margin-top: 16px;
//         background-color: #344839;
//         padding: 8px;
//         border-radius: 6px;
//     `;
//     const ChooseAuthText = styled.Text`
//         font-size: 18px;
//         font-weight: 600;
//         color: white;
//     `;

//     const FlexAuthSocial = styled.View`
//         margin-top: 16px;
//     `;

//     const ChooseAuthSocial = styled.Image``;

//     const ForgetPassword = styled.TouchableOpacity`
//         margin: 0 auto;
//     `;
//     const ForgetPasswordText = styled.Text`
//         color: #fff;
//         font-size: 18px;
//         text-decoration: underline;
//         text-decoration-color: #fff;
//     `;

//     const Submit = styled.TouchableOpacity`
//         margin: 0 auto;
//         margin-top: 20px;
//         background-color: #344839;
//         padding: 12px;
//         border-radius: 6px;
//     `;
//     const SubmitText = styled.Text`
//         font-size: 18px;
//         font-weight: 800;
//         color: white;
//     `;
//     const [authType, setAuthType] = React.useState([true, false]);
//     const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
//     const [authForm, setAuthForm] = React.useState({
//         name: 'Иван Иванович Иванов',
//         email: 'examples@example.com',
//         date: '28.10.1998',
//         password: '**********',
//         password_confirmation: '**********',
//     });

//     const showDatePicker = () => {
//         setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//         setDatePickerVisibility(false);
//     };

//     const handleConfirm = (date) => {
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         setAuthForm({ ...authForm, date: `${day}.${month}.${year}` });
//         hideDatePicker();
//     };

//     const submitForm = () => {
//         props.setAuthenticated(true);
//     };

//     const mapDispatchToProps = {
//         setAuthenticated,
//     };

//     return (
//         <Background>
//             <HeadingLogo>
//                 <LogoText>
//                     ЯМЫ<LogoTextEco>ЭКО</LogoTextEco>
//                 </LogoText>
//             </HeadingLogo>

//             <WrapperAuth>
//                 <AuthInputs>
//                     <Input
//                         style={authType[0] === true ? { display: 'none' } : {}}
//                         placeholder="ФИО"
//                         placeholderTextColor="#8fa896"
//                         onChangeText={(text) => setAuthForm({ ...authForm, name: text })}
//                         value={authForm.name}
//                     />
//                     <Input
//                         placeholder="Эл. почта"
//                         placeholderTextColor="#8fa896"
//                         onChangeText={(text) => setAuthForm({ ...authForm, email: text })}
//                         value={authForm.email}
//                     />
//                     <InputDate
//                         style={authType[0] === true ? { display: 'none' } : {}}
//                         value={authForm.date ? authForm.date.toString() : ''}
//                         placeholder="Дата рождения"
//                         placeholderTextColor="#8fa896"
//                         onFocus={showDatePicker}
//                     />
//                     <DateTimePickerModal
//                         isVisible={isDatePickerVisible}
//                         mode="date"
//                         onConfirm={handleConfirm}
//                         onCancel={hideDatePicker}
//                     />
//                     <Input
//                         placeholder="Пароль"
//                         placeholderTextColor="#8fa896"
//                         onChangeText={(text) => setAuthForm({ ...authForm, password: text })}
//                         value={authForm.password}
//                     />
//                     <Input
//                         style={authType[0] === true ? { display: 'none' } : {}}
//                         placeholder="Повтор пароля"
//                         placeholderTextColor="#8fa896"
//                         onChangeText={(text) =>
//                             setAuthForm({ ...authForm, password_confirmation: text })
//                         }
//                         value={authForm.password_confirmation}
//                     />
//                 </AuthInputs>
//                 <FlexAuth>
//                     <ChooseAuth onPress={() => setAuthType([true, false])}>
//                         <ChooseAuthText style={{ color: '#fff' }}>Войти</ChooseAuthText>
//                     </ChooseAuth>
//                     <ChooseAuth onPress={() => setAuthType([false, true])}>
//                         <ChooseAuthText style={{ color: '#fff' }}>
//                             Зарегистрироваться
//                         </ChooseAuthText>
//                     </ChooseAuth>
//                 </FlexAuth>
//                 <FlexAuthSocial>
//                     <ChooseAuthSocial />
//                     <ChooseAuthSocial />
//                     <ChooseAuthSocial />
//                 </FlexAuthSocial>
//                 <ForgetPassword style={authType[0] === false ? { display: 'none' } : {}}>
//                     <ForgetPasswordText>Забыли пароль?</ForgetPasswordText>
//                 </ForgetPassword>
//                 <Submit>
//                     <SubmitText onPress={submitForm}>Подтвердить</SubmitText>
//                 </Submit>
//             </WrapperAuth>
//             <StatusBar theme="auto"></StatusBar>
//         </Background>
//     );
// }

// export default connect(null, mapDispatchToProps)(AuthScreen);
