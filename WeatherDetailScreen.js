import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Constants} from 'expo';

export default class WeatherDetailScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        const apiKey = 'b6907d289e10d714a6e88b30761fae22';
        const {navigation} = this.props;
        const city = navigation.getParam('city', null);
        //const city = 'Daejeon';

        fetch('https://openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
            .then(response => response.json())
            .then(info => {
                this.setState({
                    ...info,
                    isLoading: false,
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text>데이터를 불러오는 중입니다.</Text>
                </View>
            )
        }

        let celsius = this.state.main.temp;
        let windSpeed = this.state.wind.speed;
        let currentWeather = this.state.weather[0].description;
        let humidity = this.state.main.humidity;
        let checkTime = this.state.dt;


        return (
            <View style={styles.parent}>
                <View style={styles.child}>
                    <Image style={styles.icon} source={require('./assets/weather.jpg')} resizeMode={'contain'}/>
                    <Image style={styles.icon} source={require('./assets/temperature.jpg')} resizeMode={'contain'}/>
                    <Image style={styles.icon} source={require('./assets/wind2.jpg')} resizeMode={'contain'}/>
                    <Image style={styles.icon} source={require('./assets/humidity.jpg')} resizeMode={'contain'}/>
                    <Image style={styles.icon} source={require('./assets/clock.png')} resizeMode={'contain'}/>
                </View>
                <View style={styles.child}>
                    <Text style={styles.iconText}> 날씨:
                        {currentWeather}</Text>
                    <Text style={styles.iconText}> 온도: {celsius.toFixed(1)}</Text>
                    <Text style={styles.iconText}> 바람속도: {windSpeed.toFixed(1)} </Text>
                    <Text style={styles.iconText}> 습도: {humidity}</Text>
                    <Text style={styles.iconText}> 측정시간 : {checkTime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
    },
    parent: {
        flex: 3,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        borderColor: '#0099AA',
        borderWidth: 5,
        alignItems: 'center',
    },
    icon: {
        flex: 1,
        //borderColor: '#AA0099',
        //borderWidth: 2,
        opacity:50,
        alignItems: 'center',
    },
    iconText: {
        flex: 2,
        //borderColor: '#AA0099',
        //borderWidth: 2,
        flexDirection: 'row',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 24,
    },
    child: {
        flex: 2,
        //borderColor: '#AA0099',
        //borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'center',
    }
});
