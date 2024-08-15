
# kaidu-customer-heatmap

**Author:** [Holden Folk](https://github.com/HoldenFolk).

This application is a React Native mobile app to configure the Kaidu Occupancy Scensors. It has working releases for both IOS and Android and is strongly typed with TypeScript. 

# Table of Contents

- [Configuring Environment](#usage)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [Global Variables and Project Settings](#global-variables-and-project-settings)
- [Deployment and CI](#deployment-and-ci)


# Configuring Environment

In order to set up your environment these steps were followed. Alternativlely, check the official [React Native Guide](https://reactnative.dev/docs/set-up-your-environment) to see the most recent guide. 

### Android:

#### Prerequisite:
Make sure you have installed Node 18 or higher and JDK 17 on your machine. The official React team recommend using chocolately to install these 

#### 1. Install Android Studio

[Download and install Android Studio](https://developer.android.com/studio/index.html). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

-   `Android SDK`
-   `Android SDK Platform`
-   `Android Virtual Device`

#### 2. Install the Android SDK

Look for and expand the  `Android 14 (UpsideDownCake)`  entry in the SDK manager in Andoird studio, then make sure the following items are checked:

-   `Android SDK Platform 34`
-   `Intel x86 Atom_64 System Image`  or  `Google APIs Intel x86 Atom System Image`

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the  `Android SDK Build-Tools`  entry, then make sure that  `34.0.0`  is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### 3. Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

1.  Open the  **Windows Control Panel.**
2.  Click on  **User Accounts,**  then click  **User Accounts**  again
3.  Click on  **Change my environment variables**
4.  Click on  **New...**  to create a new  `ANDROID_HOME`  user variable that points to the path to your Android SDK:
5. 
#### 4. Add platform-tools to Path

1.  Open the  **Windows Control Panel.**
2.  Click on  **User Accounts,**  then click  **User Accounts**  again
3.  Click on  **Change my environment variables**
4.  Select the  **Path**  variable.
5.  Click  **Edit.**
6.  Click  **New**  and add the path to platform-tools to the list.

The default location for this folder is:

```
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

You can then connect your android device via USB

### MacOS:

#### Node & Watchman[​](https://reactnative.dev/docs/set-up-your-environment?os=macos&platform=ios#node--watchman "Direct link to Node & Watchman")

React Native recommends installing Node and Watchman using  [Homebrew](https://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```
brew install node 
brew install watchman
```

If you have already installed Node on your system, make sure it is Node 18 or newer.

#### Xcode
Please use the  **latest version**  of Xcode.

The easiest way to install Xcode is via the  [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

#### Command Line Tools[​](https://reactnative.dev/docs/set-up-your-environment?os=macos&platform=ios#command-line-tools "Direct link to Command Line Tools")

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose  **Settings... (or Preferences...)**  from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

#### CocoaPods[​](https://reactnative.dev/docs/set-up-your-environment?os=macos&platform=ios#cocoapods "Direct link to CocoaPods")

[CocoaPods](https://cocoapods.org/)  is one of the dependency management system available for iOS. CocoaPods is a Ruby  [gem](https://en.wikipedia.org/wiki/RubyGems). You can install CocoaPods using the version of Ruby that ships with the latest version of macOS.

For more information, please visit  [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

After completing these installations you may then connect your device via lighing cable to your Mac. 
**Note:** Ensure that your Mac and iPhone are on the same network so that Metro can communicate between the two devices when running the development server!

# Installation

  

To install the necessary dependencies, ensure you have yarn installed, then run:

```bash

yarn install

```

### MacOS:

To easily install the correct cocoapods verion, install **bundler** and run: 

```bash
bundle install
```

Additionaly, In the 	`~/ios` folder, run 

```bash
pod install
```

# Available Scripts

  

In the project directory, you can run the following scripts:

-  **`yarn android`**: Run the local development server for Android.

-  **`yarn ios`**:  Runs the local development server for IOS.

-  **`yarn test`**: Runs the test suite.

-  **`yarn pod-install`**: Run pod installation in the ios folder

-  **`yarn lint`**: Runs ESLint on the project files.

-  **`yarn lint:fix`**: Runs ESLint and automatically fixes issues.

# Linting and Formatting

This project uses ESLint for linting and Prettier for code formatting. To run the linter, use:

```bash

yarn lint

```

To automatically fix linting issues, use:

```bash

yarn lint:fix

```

You MUST ensure all linting errors are resolved before deployment to ensure consistent code style and limmit errors.


# Contributing

If you want to contribute to this project, please follow these steps:
  

- Fork the repository
- Create a new branch (`git checkout -b feature/your-feature`)
- Commit your changes (`git commit -am 'Add new feature'`)
- Push to the branch (`git push origin feature/your-feature`)
- Create a new Pull Request to merge to **dev**
- After testing, create a a new pull request to merge **dev** to **main**


# Global Variables and Project Settings

This project uses a `.env` file and a `.env.prod` file to configure environment variabels. Use both of these files to configure the development environment and the production environment respectively. 


# Deployment

### Android:

To create a production ready APK for andoird navigate to the `android` folder and run
```bash
./gradlew assembleRelease
```

This will output your build to `./android/app/build/outputs/apk/release`

### IOS:
To create a production ready test app for IOS open the project in Xcode and **Archive** the current project. Then release the application to **TestFlight** for testing or for production.