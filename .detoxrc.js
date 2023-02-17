/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    // 'ios.debug': {
    //   type: 'ios.app',
    //   build: "xcodebuild -workspace ios/mayfly.xcworkspace -scheme mayfly -configuration Release -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build",
    //   binaryPath: "ios/build/Build/Products/Release-iphonesimulator/mayfly.app",
    'ios.release': {
      type: 'ios.app',
      build: "xcodebuild -workspace ios/mayfly.xcworkspace -scheme mayfly -configuration Release -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build",
      binaryPath: "ios/build/Build/Products/Release-iphonesimulator/mayfly.app"
    },
    // 'android.debug': {
    //   type: 'android.apk',
    //   binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
    //   build: 'cd android ; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug ; cd -',
    //   reversePorts: [
    //     8081
    //   ]
    // },
    'android.release': {
      type: 'android.apk',
      build: "cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release && cd ..",
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk"
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 12'
      }
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_2_API_30'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug'
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
