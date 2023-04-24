import { fireEvent, render } from "@testing-library/react-native";
import { TouchableOpacity } from "react-native";


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

