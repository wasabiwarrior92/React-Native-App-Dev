import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, TextInput, ImageBackground, View, ActivityIndicator, StatusBar} from 'react-native';
import { fetchWeather, fetchLocationId } from './utils/api';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			error: false,
			location: '',
			temperature: 0,
			weather: '',
		};
	}

	componentDidMount() {
		this.handleUpdateLocation('San Francisco');
	}

	handleUpdateLocation = city => {
		if(!city) return;

		this.setState({ loading: true }, async () => {
			try {
				const locationId = await fetchLocationId(city);
				const {location, weather, temperature } = await fetchWeather( locationId,);

				this.setState({
					loading: false,
					error: false,
					location,
					weather,
					temperature,
				});
			} catch (e) {
				this.setState({
					lodaing: false,
					error: true,
				});
			}
		});
	}
	render() {
		const { location } = this.state;

		return (
			<KeyboardAvoidingView style = {styles.container} behavior = "padding">
				<ImageBackground
					source = {getImageForWeather('Clear')}
					style = {styles.imageContainer}
					imageStyle = {styles.image}
				>
				<View style = {styles.detailsContainer}>
					<Text style = {[styles.largeText, styles.textStyle]}>{location}</Text>
					<Text style = {[styles.smallText, styles.textStyle]}>Light Cloud</Text>
					<Text style = {[styles.largeText, styles.textStyle]}>24°</Text>
					<SearchInput
						placeholder="Search any city"
						onSubmit={this.handleUpdateLocation}
					/>
				</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495E',
	},
	imageContainer: {
		flex: 1,
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	},
	detailsContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)',
		paddingHorizontal: 20,
	},
  	red: {
  		color: 'red',
  	},
  	textStyle: {
  		textAlign: 'center',
  		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regualr' : 'Roboto',
  		color: 'white',
  	},
  	largeText: {
  		fontSize: 44,
  	},
  	smallText: {
  		fontSize: 18,
  	},
});
