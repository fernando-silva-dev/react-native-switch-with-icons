import React, {Component} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';
import Thumb from './components/thumb';
import Track from './components/track';

export default class SwitchWithIcons extends Component {
  constructor(props) {
    const {style = {}} = props;
    super(props);

    this._animatedValue = new Animated.Value(
      props.value ? this._maxAnimatedValue : this._minAnimatedValue,
    );

    const {height = 26, width = 52} = style;

    this._containerStyle = style;

    this._totalHeight = height;
    this._totalWidth = width;
  }

  _animationDuration = this.props.animationDuration || 200;

  _maxAnimatedValue = 100;
  _minAnimatedValue = 0;
  _animatedRange = [this._minAnimatedValue, this._maxAnimatedValue];

  _handlePress = () => {
    const newValue = !this.state.value;
    this.setState({pressIndicator: true});
    this.setValue(newValue);
  };

  state = {
    value: this.props.value ? true : false,
    pressIndicator: false,
  };

  componentDidMount() {
    this._listenerId = this._animatedValue.addListener(({value}) => {
      if (
        this.state.pressIndicator &&
        (value === this._minAnimatedValue || value === this._maxAnimatedValue)
      ) {
        this.setState({pressIndicator: false});
      }
    });
  }

  componentWillUnmount() {
    this._animatedValue.removeListener(this._listenerId);
  }

  setValue = (value) => {
    const newValue = value ? true : false;
    this.setState({value: newValue});

    if (this.props.onValueChange) {
      this.props.onValueChange(newValue);
    }

    Animated.timing(this._animatedValue, {
      toValue: newValue ? this._maxAnimatedValue : this._minAnimatedValue,
      duration: this._animationDuration,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const {pressIndicator, value} = this.state;

    return (
      <View
        style={this._containerStyle}
        >
        <TouchableWithoutFeedback
          disabled={this.props.disabled}
          onPress={() => this._handlePress()}>
          <View>
            <Track
              range={this._animatedRange}
              animatedValue={this._animatedValue}
              disabled={this.props.disabled}
              width={this._totalWidth}
              height={this._totalHeight}
              disabledColor={this.props.disabledTrackColor}
              colors={this.props.trackColor}
            />
            <Thumb
              range={this._animatedRange}
              animatedValue={this._animatedValue}
              pressIndicator={pressIndicator}
              size={this._totalHeight}
              value={value}
              disabled={this.props.disabled}
              colors={this.props.thumbColor}
              width={this._totalWidth}
              icons={this.props.icon}
              noIcon={this.props.noIcon}
              iconColors={this.props.iconColor}
              disabledColor={this.props.disabledThumbColor}
              disabledIconColor={this.props.disabledIconColor}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
