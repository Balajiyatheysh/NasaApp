import React from 'react'
import { View, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DetailsScreenRouteProp, ScreenParamList } from '../navigation/types';
import axios from 'axios'

const DetailScreen = () => {
  const [asteroidDetails, setAsteroidDetails] = React.useState<null | DetailsScreenRouteProp>(null)
  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamList, "Details">>()
  const { params: { AsteroidId } } = useRoute<RouteProp<ScreenParamList, "Details">>()
  const url: string = `https://api.nasa.gov/neo/rest/v1/neo/${AsteroidId}?api_key=bebnIzQMyvSKXryQwkaOmOpAfwIMQDnoXUpOwQcf`

  const fetch = async () => {
    try {
      const { data } = await axios.get(url)
      setAsteroidDetails(data)
    } catch (err) {
      alert('enter valid Asteroid Id')
      navigator.navigate("Home")
    }
  }
  React.useEffect(() => {
    fetch()
  }, [])

  return (
    <View style={{ flex: 1, paddingTop: 25, paddingHorizontal: 15 }}>
      <Text style={{fontSize: 18, paddingBottom: 12}}>Id:{asteroidDetails?.id}</Text>
      <Text style={{ fontSize: 18, paddingBottom: 12 }}>Name: {asteroidDetails?.name}</Text>
      <Text style={{ fontSize: 18 }}>Is potentially hazardous asteroid: {`${asteroidDetails?.is_potentially_hazardous_asteroid}`}</Text>
      <Text style={{ fontSize: 18 }}>Nasa_jpl_url: {asteroidDetails?.nasa_jpl_url}</Text>
    </View>
  );
};

export default DetailScreen;