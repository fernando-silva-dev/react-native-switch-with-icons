import React, { Component } from "react";
import { Animated, Image, TouchableWithoutFeedback, View } from "react-native";
import ic_switch_on from "./img/SwitchOn.png";
import ic_switch_off from "./img/SwitchOff.png";
import { styles } from "./styles";

export default class SwitchWithIcons extends Component {
  constructor(props) {
    const { style = {}} = props;
    super(props);
    this._animatedValue = new Animated.Value(
      props.value ? this._maxAnimatedValue : this._minAnimatedValue,
    );

    const { height = 26, width = 52, ...otherStyles } = style;

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

    this._iconStyle = {
      height: this._thumbRadius,
      width: this._thumbRadius,
    };

    this._pressedIndicatorStyle = {
      height: this._thumbSize * 2,
      width: this._thumbSize * 2,
      borderRadius: this._thumbSize,
      top: 0 - this._thumbRadius,
    };
  }

  _thumbColor = this.props.thumbColor || {
    true: "rgb(52, 149, 235)",
    false: "rgb(255, 255, 255)",
  };

  _trackColor = this.props.trackColor || {
    true: "rgb(144, 195, 240)",
    false: "rgb(187, 194, 204)",
  };

  _iconColor = this.props.iconColor || {
    true: "#FFFFFF",
    false: "#9499AD",
  };

  _icon = this.props.icon || {
    true: ic_switch_on,
    false: ic_switch_off,
  };

  _disabledThumbColor = this.props.disabledThumbColor || "#9499AD";
  _disabledTrackColor = this.props.disabledTrackColor || "#BCBFC9";
  _disabledIconColor = this.props.disabledIconColor || "#FFFFFF";

  _animationDuration = this.props.animationDuration || 200;

  _maxAnimatedValue = 100;
  _minAnimatedValue = 0;
  _animatedRange = [this._minAnimatedValue, this._maxAnimatedValue];

  _handlePress = () => {
    const newValue = !this.state.value;
    this.setState({ pressIndicator: true });
    this.setValue(newValue);
  };

  state = {
    value: this.props.value ? true : false,
    disabled: this.props.disabled,
    pressIndicator: false,
  };

  componentDidMount() {
    this._listenerId = this._animatedValue.addListener(({ value }) => {
      if (
        this.state.pressIndicator &&
        (value === this._minAnimatedValue || value === this._maxAnimatedValue)
      ) {
        this.setState({ pressIndicator: false });
      }
    });
  }

  componentWillUnmount() {
    this._animatedValue.removeListener(this._listenerId);
  }

  setValue = value => {
    const newValue = value ? true : false;
    this.setState({ value: newValue });

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
    const { pressIndicator, disabled, value } = this.state;

    const trackColor = disabled
      ? this._disabledTrackColor
      : this._animatedValue.interpolate({
          inputRange: this._animatedRange,
          outputRange: [this._trackColor.false, this._trackColor.true],
        });

    const thumbColor = disabled
      ? this._disabledThumbColor
      : this._animatedValue.interpolate({
          inputRange: this._animatedRange,
          outputRange: [this._thumbColor.false, this._thumbColor.true],
        });

    const thumbPosition = this._animatedValue.interpolate({
      inputRange: this._animatedRange,
      outputRange: [0, this._totalWidth - this._thumbSize],
    });

    const pressedIndicatorPosition = this._animatedValue.interpolate({
      inputRange: this._animatedRange,
      outputRange: [
        0 - this._thumbRadius,
        this._totalWidth - this._thumbRadius - this._thumbSize,
      ],
    });

    const iconColor = disabled
      ? this._disabledIconColor
      : this._iconColor[value];

    return (
      <View
        style={[
          { height: this._totalHeight, width: this._totalWidth },
          this._containerStyle,
        ]}
      >
        <TouchableWithoutFeedback
          disabled={disabled}
          onPress={() => this._handlePress()}
        >
          <View>
            <Animated.View
              style={[{ backgroundColor: trackColor }, this._trackStyle]}
            />
            {pressIndicator && (
              <Animated.View
                style={[
                  styles.pressedIndicator,
                  this._pressedIndicatorStyle,
                  {
                    backgroundColor: thumbColor,
                    left: pressedIndicatorPosition,
                  },
                ]}
              />
            )}
            <Animated.View
              style={[
                this._thumbStyle,
                styles.thumb,
                { backgroundColor: thumbColor, left: thumbPosition },
              ]}
            >
              {this.props.noIcon || (
                <Image
                  source={this._icon[value]}
                  style={[
                    styles.icon,
                    { tintColor: iconColor },
                    this._iconStyle,
                  ]}
                />
              )}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
