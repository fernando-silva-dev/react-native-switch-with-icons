import React, {Component} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';
import Thumb from './components/thumb';
// import Track from './components/track';

export default class SwitchWithIcons extends Component {
  constructor(props) {
    const {style = {}} = props;
    super(props);

    this._animatedValue = new Animated.Value(
      props.value ? this._maxAnimatedValue : this._minAnimatedValue,
    );

    const {height = 26, width = 52, ...otherStyles} = style;

    this._containerStyle = otherStyles;

    this._totalHeight = height;
    this._totalWidth = width;

    this._thumbSize = this._totalHeight;
    this._thumbRadius = Math.round(this._thumbSize / 2);

    this._thumbStyle = {
      height: this._thumbSize,
      width: this._thumbSize,
      borderRadius: this._thumbRadius,
    };

    this._trackMargin = Math.round(this._totalWidth / 52);

    this._trackStyle = {
      height: this._totalHeight - this._trackMargin * 2,
      width: this._totalWidth - this._trackMargin * 2,
      borderRadius: this._thumbRadius - this._trackMargin,
      margin: this._trackMargin,
    };

    this._pressedIndicatorStyle = {
      height: this._thumbSize * 2,
      width: this._thumbSize * 2,
      borderRadius: this._thumbSize,
      top: 0 - this._thumbRadius,
    };
  }

  _trackColor = this.props.trackColor || {
    true: 'rgb(144, 195, 240)',
    false: 'rgb(187, 194, 204)',
  };

  _disabledTrackColor = this.props.disabledTrackColor || '#BCBFC9';

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
    disabled: this.props.disabled,
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
    const {pressIndicator, disabled, value} = this.state;

    const trackColor = disabled
      ? this._disabledTrackColor
      : this._animatedValue.interpolate({
          inputRange: this._animatedRange,
          outputRange: [this._trackColor.false, this._trackColor.true],
        });

    const pressedIndicatorPosition = this._animatedValue.interpolate({
      inputRange: this._animatedRange,
      outputRange: [
        0 - this._thumbRadius,
        this._totalWidth - this._thumbRadius - this._thumbSize,
      ],
    });

    return (
      <View
        style={[
          {height: this._totalHeight, width: this._totalWidth},
          this._containerStyle,
        ]}>
        <TouchableWithoutFeedback
          disabled={disabled}
          onPress={() => this._handlePress()}>
          <View>
            <Animated.View
              style={[{backgroundColor: trackColor}, this._trackStyle]}
            />
            {pressIndicator && (
              <Animated.View
                style={[
                  styles.pressedIndicator,
                  this._pressedIndicatorStyle,
                  {
                    backgroundColor: "white", // TODO
                    left: pressedIndicatorPosition,
                  },
                ]}
              />
            )}
            <Thumb
              range={this._animatedRange}
              animatedValue={this._animatedValue}
              size={this._thumbSize}
              value={value}
              disabled={this.props.disabled}
              colors={this.props.thumbColor}
              width={this._totalWidth}
              radius={this._thumbRadius}
              icons={this.props.icon}
              noIcon={this.props.noIcon}
              iconColors={this.props.iconColor}
              disabledColor={this.props.disabledThumbColor}
              disabledIconColor={this.props.disabledIconColor}
              iconSize={this._thumbRadius}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
