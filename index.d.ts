import React from "react";
import {
    ViewStyle
} from "react-native";

declare module "react-native-switch-with-icons" {  
    interface Switchable {
        true: any,
        false: any,
    }
  
    interface SwitchWithIconsProps {
        value: boolean,
        onValueChange(value: boolean): void,
        animationDuration?: number,
        disabled?: boolean,
        disabledTrackColor?: string,
        trackColor?: Switchable,
        thumbColor?: Switchable,
        iconColor?: Switchable,
        icon?: Switchable,
        noIcon?: boolean,
        disabledIconColor?: string,
        disabledThumbColor?: string,
        style?: ViewStyle,
    }
  
    export default class SwitchWithIcons extends React.Component<SwitchWithIconsProps>{}
  }