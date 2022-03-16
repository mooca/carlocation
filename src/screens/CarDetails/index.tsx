import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { useNavigation} from '@react-navigation/native';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
import x from '../../assets/speed.svg';


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
  About,
  Acessories,
  Footer
} from './styles'; 

export function CarDetails(){
  const navigation = useNavigation();


  function handleConfirmRental(){
    navigation.navigate('Scheduling');
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


        <About>
          Este é o imóvel poqieruqpo weproqiue 
          asdfasdfas dafsd afd  rqpowei r u q 
           asdf asd adsf adsf adf asdf adsf werq 
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" color="green" onPress={handleConfirmRental} />
      </Footer>
    </Container>
    
  );
}