import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';
import ArrowSvg from '../../assets/arrow.svg';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { useNavigation, useRoute} from '@react-navigation/native';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';


import { 
  Calendar, 
  DayProps, 
  generateInterval,
  MarkedDateProps
} from '../../components/Calendar';

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


interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

//tipar a interface CarDTO
interface Params{
  car: CarDTO;
}
export function Scheduling(){
  const [lastSelecdtDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const {car}  = route.params as Params;

  function handleConfirmRental(){
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
      Alert.alert('Selecione o intervalo para alugar.')
    }else{
      navigation.navigate('SchedulingDetails', {
        car, 
        dates: Object.keys(markedDates)
      });
    }
  }

  function handleBack(){
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps){
    let start = !lastSelecdtDate.timestamp ? date : lastSelecdtDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')

    })
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
            onPress={handleBack} 
            color={theme.colors.shape}
          />

          <Title>
            Escolha uma  {'\n'}
            data para {'\n'}
            loca??ao do va??culo        
          </Title>

          <RentalPeriod>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={!!rentalPeriod.startFormatted}> {rentalPeriod.startFormatted}</DateValue>
            </DateInfo>

            <ArrowSvg />

            <DateInfo>
              <DateTitle>ATE</DateTitle>
              <DateValue selected={!!rentalPeriod.endFormatted}> {rentalPeriod.endFormatted} </DateValue>
            </DateInfo>


          </RentalPeriod>

      </Header>


      <Content>
        <Calendar 
          marketDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>


      <Footer>
        <Button 
          title='Confirmar' 
          color="green" 
          onPress={handleConfirmRental} 
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>


    </Container>
  );
}