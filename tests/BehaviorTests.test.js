import { fireEvent, render } from "@testing-library/react-native";
import { TouchableOpacity, TextInput } from "react-native";

//tests press of 'Go' button on Login Screen
describe('<TouchableOpacity />', () => {
    it('Calls onPress', async () => {
        const onPress = jest.fn();
        const testID = "loginGoButton";
        const { getByTestId } = await render(
            <TouchableOpacity testID={testID} onPress={onPress} />
        )
        const button = getByTestId(testID);
        fireEvent.press(button);
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});

//tests change text of textinput on friends screen
describe('<TextInput />', () => {
    it('Calls onChangeText', async () => {
        const onChangeText = jest.fn();
        const testID = "addFriendsTextInput";
        const { getByTestId } = await render(
            <TextInput testID={testID} onChangeText={onChangeText} />
        )
        const textinput = getByTestId(testID);
        fireEvent.changeText(textinput);
        expect(onChangeText).toHaveBeenCalledTimes(1);
    });
});


