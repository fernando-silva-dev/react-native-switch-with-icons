import { fireEvent } from "@testing-library/react-native";
import React from "react";
import {TouchableWithoutFeedback} from "react-native";
import renderer from "react-test-renderer";
import SwitchWithIcons from "../index.js";

jest.useFakeTimers();

it("renders", () => {
	renderer.create(<SwitchWithIcons value={false} onValueChange={jest.fn(() => {})} />);
});

it("switches on", () => {
	const callback = jest.fn(() => {});

	const renderTree = renderer.create(<SwitchWithIcons value={false} onValueChange={callback} />);
	fireEvent(renderTree.root.findByType(TouchableWithoutFeedback), "onPress");

	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0]).toEqual([true]);
});

it("switches off", () => {
	const callback = jest.fn(() => {});

	const renderTree = renderer.create(<SwitchWithIcons value={true} onValueChange={callback} />);
	fireEvent(renderTree.root.findByType(TouchableWithoutFeedback), "onPress");

	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0]).toEqual([false]);
});
