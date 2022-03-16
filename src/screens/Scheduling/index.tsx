import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { useNavigation} from '@react-navigation/native';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles'; 

export function Scheduling(){
  const theme = useTheme();
  const navigation = useNavigation();


  function handleConfirmRental(){
    navigation.navigate('SchedulingDetails');
  }
  return (
    <Container>
        <Header>
          <StatusBar
            barStyle='light-content'
            translucent
            backgroundColor='transparent'
          />
          <BackButton 
            onPress={()=>{}} 
            color={theme.colors.shape}
          />

          <Title>
            Escolha uma  {'\n'}
            data para {'\n'}
            locaçao do vaículo        
          </Title>

          <RentalPeriod>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={true}> 16/06/2021</DateValue>
            </DateInfo>

            <ArrowSvg />

            <DateInfo>
              <DateTitle>ATE</DateTitle>
              <DateValue selected={false}> </DateValue>
            </DateInfo>


          </RentalPeriod>

      </Header>


      <Content>
        <Calendar />
      </Content>


      <Footer>
        <Button title='Confirmar' color="green" onPress={handleConfirmRental} />
      </Footer>


    </Container>
  );
}