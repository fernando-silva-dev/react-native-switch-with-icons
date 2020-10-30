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
      radius,
      colors = {
        true: 'rgb(52, 149, 235)',
        false: 'rgb(255, 255, 255)',
      }, 
      icons = {
        true: ic_switch_on,
        false: ic_switch_off,
      },
      noIcon = false,
      iconColors = {
        true: '#FFFFFF',
        false: '#9499AD',
      },
      disabledIconColor = '#FFFFFF',
      disabledColor = '#9499AD',
    } = this.props;

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

    const iconColor = disabled
      ? disabledIconColor
      : iconColors[value];

    return(
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: color, left: position, height: size, width: size, borderRadius: radius },
          ]}
        >
          {noIcon || (
            <Image
              source={icons[value]}
              style={[
                styles.icon,
                { tintColor: iconColor, height: radius, width: radius},
              ]}
            />
          )}
        </Animated.View>
    );
  }
}