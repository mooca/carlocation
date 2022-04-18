import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { useNavigation, useRoute} from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

import {getAccessoryIcon} from '../../utils/getAccessoryicon';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import {
  Container,
  Header,
  CarImages,
  // Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles'; 
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar } from 'react-native';


//tipar a interface CarDTO
interface Params{
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation();
  const route = useRoute();
  const {car}  = route.params as Params;
  
  //animação
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event =>{
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  })
  const headerStyleAnimation = useAnimatedStyle(()=>{
    return{
      height: interpolate(
        scrollY.value,
        [0,200],
        [200,70],
        Extrapolate.CLAMP
      )
    }

  })
  //--animação
  function handleConfirmRental(){
    navigation.navigate('Scheduling', {car});
  }

  function handleBack(){
    navigation.goBack();
  }


  return (
    <Container>
      <StatusBar  
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View 
        style={headerStyleAnimation}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <CarImages>
          <ImageSlider imageUrl={car.photos}/>
        </CarImages>
      </Animated.View>

      {/* <Content> */}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal:24,
          paddingTop: getStatusBarHeight(),
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
      >


        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
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


        <About> 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about}   
        </About>
        </Animated.ScrollView>
      {/* </Content> */}

      <Footer>
        <Button title="Escolher período do aluguel" color="green" onPress={handleConfirmRental} />
      </Footer>
    </Container>
    
  );
}