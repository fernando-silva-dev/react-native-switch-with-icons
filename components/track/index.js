import React, {Component} from 'react';
import {Animated} from 'react-native';

export default class Track extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
        disabled,
        range,
        animatedValue,
        width,
        height,
        colors = {
            true: 'rgb(144, 195, 240)',
            false: 'rgb(187, 194, 204)',
        }, 
        disabledColor = '#BCBFC9',
      } = this.props;

      const margin = Math.round(height / 26);
      const radius = Math.round(height / 2);

      const color = disabled
        ? disabledColor
        : animatedValue.interpolate({
            inputRange: range,
            outputRange: [colors.false, colors.true],
        });

    const trackStyle = {
        backgroundColor: color,
        height: height - margin * 2,
        width: width - margin * 2,
        borderRadius: radius - margin,
        margin: margin,
      };
      
      return(
        <Animated.View
        style={trackStyle}
      />
      );
  }
}
