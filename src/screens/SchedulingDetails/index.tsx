import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import {Feather} from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation} from '@react-navigation/native';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';


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
  Acessories,
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
import { RFValue } from 'react-native-responsive-fontsize';

export function SchedulingDetails(){
  const theme = useTheme();
  const navigation = useNavigation();


  function handleConfirmRental(){
    navigation.navigate('SchedulingComplete');
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={['https://www.pngmart.com/files/10/Audi-PNG-File.png']}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>LAMBORGUINI</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period> ao Dia</Period>
            <Price>R$ 120</Price>
          </Rent>
        </Details>

        <Acessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Acessories>

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
            <DateValue>18/06/2022</DateValue>
        </DateInfo>

          <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
          />

        <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>22/06/2022</DateValue>
        </DateInfo>

      </RentalPeriod>


      <RentalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x 3 diarias</RentalPriceQuota>
            <RentalPriceTotal>R$ 1580</RentalPriceTotal>
        </RentalPriceDetails>
      </RentalPrice>


      </Content>

      <Footer>
        <Button title="Alugar agora" color="green" onPress={handleConfirmRental} />
      </Footer>
    </Container>
    
  );
}