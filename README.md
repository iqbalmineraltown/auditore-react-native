# AwesomeTsProject

## Known Issues

- Unable to test on iOS due to lack of development hardware
- Tapping when keyboard is active will dismiss the keyboard
- Building fat APK, should be using AAB format but need to go through Playstore

## How to run on Android

1. Open terminal, run metro bundler with `npx react-native start` and let it run on background
1. Open android emulator or connect physical device with adb enabled
1. Open new terminal, run with `npx react-native run-android`

## Build Debug fat-apk

1. Make sure folderpath  `android/app/src/main/assets` exists or simply create
1. Run on root project:`react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
1. move to android folder `cd android`
1. run `./gradlew assembleDebug`

### one-liner for Powershell pre-7.0

```console
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res; cd android; ./gradlew assembleDebug
```

## Library Licenses

- [React Native](https://github.com/facebook/react-native/blob/0.66-stable/LICENSE)

- [Font Awesome](https://github.com/FortAwesome/react-native-fontawesome/blob/master/LICENSE.txt)

- [React Native Clipboard](https://github.com/react-native-clipboard/clipboard/blob/master/LICENSE)

- [React Native Root Toast](https://github.com/magicismight/react-native-root-toast/blob/master/LICENSE.txt)