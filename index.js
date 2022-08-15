import React from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';
import Thumb from './components/thumb';
import Track from './components/track';

export default class SwitchWithIcons extends React.Component {
  constructor(props) {
    super(props);
    
    this._animatedValue = new Animated.Value(
      props.value ? this._maxAnimatedValue : this._minAnimatedValue,
      );
  }

  _animationDuration = this.props.animationDuration || 200;

  _maxAnimatedValue = 100;
  _minAnimatedValue = 0;
  _animatedRange = [this._minAnimatedValue, this._maxAnimatedValue];

  _handlePress = () => {
    this.setState({pressIndicator: true});

    const value = !this.props.value;

    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  state = {
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

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value || this.state.pressIndicator) {
      Animated.timing(this._animatedValue, {
        toValue: this.props.value ? this._maxAnimatedValue : this._minAnimatedValue,
        duration: this._animationDuration,
        useNativeDriver: false,
      }).start();
    }
}

  render() {
    const {
      style = {},
      disabled,
      disabledTrackColor,
      trackColor,
      thumbColor,
      icon,
      noIcon,
      iconColor,
      disabledIconColor,
      disabledThumbColor,
      value,
    } = this.props;

    const {height = 26, width = 52} = style;

    const {pressIndicator} = this.state;

    return (
      <View
        style={style}
        >
        <TouchableWithoutFeedback
          disabled={disabled}
          onPress={this._handlePress}>
          <View>
            <Track
              range={this._animatedRange}
              animatedValue={this._animatedValue}
              disabled={disabled}
              width={width}
              height={height}
              disabledColor={disabledTrackColor}
              colors={trackColor}
            />
            <Thumb
              range={this._animatedRange}
              animatedValue={this._animatedValue}
              pressIndicator={pressIndicator}
              size={height}
              value={!!value}
              disabled={disabled}
              colors={thumbColor}
              width={width}
              icons={icon}
              noIcon={noIcon}
              iconColors={iconColor}
              disabledColor={disabledThumbColor}
              disabledIconColor={disabledIconColor}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
