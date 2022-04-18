import React, { useEffect, useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import {Feather} from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute} from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryicon';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,

} from './styles'; 
import { api } from '../../services/api';
import { Alert } from 'react-native';


//tipar a interface CarDTO
interface Params{
  car: CarDTO;
  dates: string;
}

interface RentalPeriod {
  start: string;
  end: string;
}
export function SchedulingDetails(){

  const [loading, setLoading] = useState(false);

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const {car, dates}  = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental(){
    setLoading(true);

    if(!car.id) {
      Alert.alert('nenhum veículo' + car.id);
    }
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);


    // console.log(api.get(`/schedules_bycars/${car.id}`));
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ]

      //NOVO CAR USER
       await api.post(`/schedules_byuser`, {
         user_id: 1,
         car,
         startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyy'),
         endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyy'),
       });

    //EDITAR
    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
      .then(() => navigation.navigate('SchedulingComplete'))
      .catch(()=> {
        setLoading(false);
        Alert.alert('Não foi possível confirmar');
      })

      //NOVO POST
      // api.post(`/schedules_bycars`, {
        //id: car.id,
        // unavailable_dates
      // }).then(() => navigation.navigate('SchedulingComplete'))
      //   .catch(()=> Alert.alert('Não foi possível confirmar'))
  
  

    
  }
  function handleBack(){
    navigation.goBack();
  }

  useEffect(()=>{
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyy'),
    })
  },[])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={car.photos}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period> {car.rent.period}</Period>
            <Price>{car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>

        {   
          car.accessories.map(accessory => (
            <Accessory 
                key={accessory.type} 
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)} 
            />
          ))       
           
        }
        </Accessories>

      <RentalPeriod>
        <CalendarIcon>
          <Feather
            name="calendar"
            size={RFValue(24)}
            color={theme.colors.shape}
            />
        </CalendarIcon>
        <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
        </DateInfo>

          <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
          />

        <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
        </DateInfo>

      </RentalPeriod>


      <RentalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ { rentTotal }</RentalPriceTotal>
        </RentalPriceDetails>
      </RentalPrice>


      </Content>

      <Footer>
        <Button 
            title="Alugar agora" 
            color="green" 
            onPress={handleConfirmRental} 
            enabled={!loading}
            loading={loading}

        />
      </Footer>
    </Container>
    
  );
}