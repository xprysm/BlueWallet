import React from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import loc from '../loc';
import { AddressInputScanButton } from './AddressInputScanButton';
import { useTheme } from './themes';
import DeeplinkSchemaMatch from '../class/deeplink-schema-match';
import triggerHapticFeedback, { HapticFeedbackTypes } from '../blue_modules/hapticFeedback';

interface AddressInputProps {
  isLoading?: boolean;
  address?: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBarScanned: (ret: { data?: any }) => void;
  scanButtonTapped?: () => void;
  launchedBy?: string;
  editable?: boolean;
  inputAccessoryViewID?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  testID?: string;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
}

const AddressInput = ({
  isLoading = false,
  address = '',
  testID = 'AddressInput',
  placeholder = loc.send.details_address,
  onChangeText,
  onBarScanned,
  scanButtonTapped = () => {},
  launchedBy,
  editable = true,
  inputAccessoryViewID,
  onBlur = () => {},
  onFocus = () => {},
  keyboardType = 'default',
}: AddressInputProps) => {
  const { colors } = useTheme();
  const stylesHook = StyleSheet.create({
    root: {
      borderColor: colors.formBorder,
      borderBottomColor: colors.formBorder,
      backgroundColor: colors.inputBackgroundColor,
    },
    input: {
      color: colors.foregroundColor,
    },
  });

  const onBlurEditing = () => {
    const validateAddressWithFeedback = (value: string) => {
      const isValid = DeeplinkSchemaMatch.isBitcoinAddress(value) || DeeplinkSchemaMatch.isLightningInvoice(value);

      triggerHapticFeedback(isValid ? HapticFeedbackTypes.NotificationSuccess : HapticFeedbackTypes.NotificationError);
      return isValid;
    };

    validateAddressWithFeedback(address);
    onBlur();
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.root, stylesHook.root]}>
      <TextInput
        testID={testID}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#81868e"
        value={address}
        style={[styles.input, stylesHook.input]}
        editable={!isLoading && editable}
        multiline={!editable}
        inputAccessoryViewID={inputAccessoryViewID}
        clearButtonMode="while-editing"
        onBlur={onBlurEditing}
        onFocus={onFocus}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
      />
      {editable ? (
        <AddressInputScanButton
          isLoading={isLoading}
          launchedBy={launchedBy}
          scanButtonTapped={scanButtonTapped}
          onBarScanned={onBarScanned}
          onChangeText={onChangeText}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1.0,
    borderBottomWidth: 0.5,
    minHeight: 44,
    height: 44,
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    minHeight: 33,
  },
});

export default AddressInput;
