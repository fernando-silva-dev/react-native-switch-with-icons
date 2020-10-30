import React, { Component } from "react";
import {Animated, Image} from "react-native";
import {styles} from "../../styles";
import ic_switch_on from '../../img/SwitchOn.png';
import ic_switch_off from '../../img/SwitchOff.png';

export default class Thumb extends Component {
  constructor(props){
      super(props);
  }

  render(){
    const {
      disabled,
      range,
      animatedValue,
      width,
      size,
      value,
      colors = {
        true: 'rgb(52, 149, 235)',
        false: 'rgb(255, 255, 255)',
      }, 
      icons = {
        true: ic_switch_on,
        false: ic_switch_off,
      },
      iconColors = {
        true: '#FFFFFF',
        false: '#9499AD',
      },
      noIcon = false,
      disabledIconColor = '#FFFFFF',
      disabledColor = '#9499AD',
    } = this.props;

    const radius = Math.round(size / 2);

    const color = disabled
    ? disabledColor
    : animatedValue.interpolate({
        inputRange: range,
        outputRange: [colors.false, colors.true],
    });

    const position = animatedValue.interpolate({
        inputRange: range,
        outputRange: [0, width - size],
    });

    const pressedIndicatorPosition = animatedValue.interpolate({
      inputRange: range,
      outputRange: [
        0 - radius,
        width - radius - size,
      ],
    });

    const iconColor = disabled
      ? disabledIconColor
      : iconColors[value];

    return(
      <>
        {this.props.pressIndicator && (
          <Animated.View
            style={[
              styles.pressedIndicator,
              {
                backgroundColor: color,
                left: pressedIndicatorPosition,
                width: size * 2,
                borderRadius: size,
                top: 0 - radius,
                aspectRatio: 1,
              },
            ]}
          />
        )}
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: color, left: position, width: size, borderRadius: radius, aspectRatio: 1},
          ]}
        >
          {noIcon || (
            <Image
              source={icons[value]}
              style={[
                styles.icon,
                { tintColor: iconColor, width: '50%', aspectRatio: 1},
              ]}
            />
          )}
        </Animated.View>
      </>
    );
  }
}