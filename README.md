# react-native-switch-with-icons

A simple switch component with icons in the thumb.

## Example

![example](./assets/example.gif)

## Installation

```bash
npm i react-native-switch-with-icons --save
```

or

```bash
yarn add react-native-switch-with-icons
```

## Usage

```js
import SwitchWithIcons from "react-native-switch-with-icons";

<SwitchWithIcons
  onValueChange={value => console.log(`Value has been updated to ${value}`)}
/>
```

## Properties

 Prop               | Description                           | Type      | Default
:------------------ |:------------------------------------- |:--------- |:---------------------------------------------------------
 value              | The initial value                     | Boolean   | false
 disabled           | Defines if user can interact          | Boolean   | false
 noIcon             | Sets the visibility of the icon       | Boolean   | false
 onValueChange      | Change value callback                 | Function  | -
 icon               | The icons to be displayed             | Object    | {true: SwitchOn, false: SwitchOff}
 trackColor         | The colors of the track               | Object    | {true: "rgb(144, 195, 240)", false: "rgb(187, 194, 204)"}
 thumbColor         | The colors of the thumb               | Object    | {true: "rgb(52, 149, 235)", false: "rgb(255, 255, 255)"}
 iconColor          | The colors of the icons               | Object    | {true: "#FFFFFF", false: "#9499AD"}
 disabledThumbColor | The color of the thumb when disabled  | String    | "#9499AD"
 disabledTrackColor | The color of the track when disabled  | String    | "#BCBFC9"
 disabledIconColor  | The color of the icon when disabled   | String    | "#FFFFFF"
 animationDuration  | The duration of the animation         | Number    | 200

## Methods

 Name          | Description
:------------- |:------------------
 setValue()    | Set current value

## Contributing

Pull requests are welcome.
