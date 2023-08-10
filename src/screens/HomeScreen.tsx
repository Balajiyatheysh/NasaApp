import React from 'react';
import { StyleSheet, View,Button, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamList } from '../navigation/types';
import Axios from 'axios'

const HomeScreen = () => {
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamList,"Home">>()
    const [asteroidId, setAsteroidId] = React.useState('');

    async function handleRandom() {
        try{
            const response = await Axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`)
        setAsteroidId(response.data.near_earth_objects[Math.floor(Math.random()*10)].id)
        navigator.navigate('Details', { AsteroidId: asteroidId })
            }catch(err){
            console.warn(err)
        }   
    }

       return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    value={asteroidId}
                    onChangeText={(asteroidId) => setAsteroidId(asteroidId)}
                    placeholder={'Enter Asteroid number'}
                    style={styles.inputStyle}
                />
                <Button
                    disabled={!asteroidId}
                    title='Search'
                    onPress={()=>navigator.navigate('Details',{AsteroidId:asteroidId})}
                />
                <Button
                    title='Random Asteriod'
                    onPress={handleRandom}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 10,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
    },
    inputStyle: {
        width: '80%',
        height: 44,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#DBDBD6',
    },
});