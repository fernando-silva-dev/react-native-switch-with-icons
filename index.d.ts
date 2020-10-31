declare module "react-native-switch-with-icons" {
    import { Component } from "react";
    import {
        ViewStyle
    } from "react-native";
  
    export interface ISwitchableObject {
        true: any,
        false: any,
    }
  
    export interface ISwitchWithIconsProps {
        animationDuration?: number,
        disabled?: boolean,
        disabledTrackColor?: string,
        trackColor?: ISwitchableObject,
        thumbColor?: ISwitchableObject,
        iconColor?: ISwitchableObject,
        icon?: ISwitchableObject,
        noIcon?: boolean,
        disabledIconColor?: string,
        disabledThumbColor?: string,
        value?: boolean,
        style: ViewStyle,
        onValueChange(value: boolean): void,
    }
  
    class SwitchWithIcons extends Component<ISwitchWithIconsProps> {}
  
    export default SwitchWithIcons;
  }