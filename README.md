### Create template

To create a react native template run following: 

```sh
npx @react-native-community/cli init
```

or use `Expo` to create android folder

```sh
npx expo prebuild --clean
````


### Android

Make sure your `google-services.json` is in the correct location (`android/app/google-services.json`)

Add following to build `android/build.gradle`

```
buildscript {
    ...
    dependencies {
        classpath("com.google.gms:google-services:4.3.15")
    }
}
```

Add following to `android/app/build.gradle``

```

android {
    ...
    namespace "io.jrcmpr.pension"
    defaultConfig {
        applicationId "io.jrcmpr.pension"
        ...
    }
...
}

...
apply plugin: 'com.google.gms.google-services'
```

Add also


**Ensure `JAVA` installed**


To install in `OsX` using `brew`

```sh
brew install openjdk@17
```

**Ensure Android SDK installed**

Define Android SDK e.g. through following environment variable and update path:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin
```

**Generate debug keystore**

```sh
cd android/app
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
```



**Build**


```sh
cd android
./gradlew clean
./gradlew build
```
or use expo

```sh 
npm install -g eas-cli
eas build:configure
npx expo run:android
```

**Get SHA-1 fingerprint**

```sh
./gradlew signingReport
```

Example output:

```
> Task :app:signingReport
Variant: debug
Config: debug
....
SHA1: 1F:14:1B:16:31:32:F3:F4:55:A8:2C:27:45:55:55:25:21:D5:44:2D
...
```

Declare the fingerprint in [firebase project settings](https://console.firebase.google.com/project/pension-ex-1f88c/settings/general/android:io.jrcmpr.pension)