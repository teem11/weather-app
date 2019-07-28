import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, ImageBackground, View} from 'react-native';
import {Constants} from 'expo';

export default class CityList extends React.Component {
    static navigationOptions = {
        title: 'Cities',
    };

    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            citiesA: [], citiesB: [], citiesC: [], citiesD: [], citiesE: [], citiesF: [], citiesG: [],
            citiesH: [], citiesI: [], citiesJ: [], citiesK: [], citiesL: [], citiesM: [], citiesN: [],
            citiesO: [], citiesP: [], citiesQ: [], citiesR: [], citiesS: [], citiesT: [], citiesU: [],
            citiesV: [], citiesX: [], citiesY: [], citiesZ: [],
        };
    }

    componentDidMount() {
        fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
            .then(response => response.json())
            .then(cities => {
                console.log('cities =', cities.length);
                this.setState({
                    cities
                });
            });
    }


    onPressCity(item) {
        this.props.navigation.navigate(
            'Detail',
            {
                city: item
            }
        );
    }

    renderItem(city) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
                <Text style={styles.text}>{city}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('./assets/flowers.png')}
                                 style={{width: '100%', height: '100%'}}>
                    <FlatList style={styles.text}
                              renderItem={({item}) => this.renderItem(item)}
                              keyExtractor={item => item}
                              data={this.state.cities}
                    />
                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
    },
    list: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
        opacity: 100
    },
    item: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        opacity:100
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});