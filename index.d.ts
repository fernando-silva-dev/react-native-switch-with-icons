import React from "react";
import {
    ViewStyle
} from "react-native";

declare module "react-native-switch-with-icons" {  
    interface Switchable<T> {
        true: T,
        false: T,
    }
  
    interface SwitchWithIconsProps {
        value: boolean,
        onValueChange(value: boolean): void,
        animationDuration?: number,
        disabled?: boolean,
        disabledTrackColor?: string,
        trackColor?: Switchable<string>,
        thumbColor?: Switchable<string>,
        iconColor?: Switchable<string>,
        icon?: Switchable<any>,
        noIcon?: boolean,
        disabledIconColor?: string,
        disabledThumbColor?: string,
        style?: ViewStyle,
    }
  
    export default class SwitchWithIcons extends React.Component<SwitchWithIconsProps>{}
  }