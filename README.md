<p align="center">
<a href="https://github.com/Efshal/boilerplate-monorepo/actions/workflows/snapcraft-publish.yml"><img src="https://img.shields.io/badge/snapcraft--publish--action-passing-2ea44f?logo=Github+Actions&logoColor=gold" alt="snapcraft-publish-action - passing"></a>
<a href="https://github.com/Efshal/boilerplate-monorepo/blob/main/.github/workflows/web-firebase-deployment.yml"><img src="https://img.shields.io/badge/web--firebase--deployment--action-passing-2ea44f?logo=Github+Actions&logoColor=gold" alt="web-firebase-deployment-action - passing"></a>
</p>

# Guide

## Linux Electron App build, Snapcraft Release, and Actions

### Build and Release
Clone the repo 

```sh
git clone https://github.com/Efshal/boilerplate-monorepo.git
```

Run npm install

```sh
npm install
```

Install snapcraft for releasing .snap of your electron app to Snapcraft

```sh
sudo apt update
sudo apt install snapd
```

Run snapcraft init to setup snap/snapcraft.yaml

```sh
snapcraft init
```

Register your app name, following steps from this link 
https://snapcraft.io/docs/registering-your-app-name


Then set "name" key with registered app name in package.json
![carbon](https://user-images.githubusercontent.com/42158443/147568704-6ee479c1-6999-4445-99b8-82f2a8866228.png)


Also set "name" key with registered app name in snapcraft.yaml
![carbon(1)](https://user-images.githubusercontent.com/42158443/147569091-5fbf1fbe-3c7b-4b3d-9404-0c5ad288b320.png)


Run npm run electron:package to build .snap file of your Electron App

```sh
npm run electron:package
```
A "release" folder will be created in the root directory of your project with .snap file of your electron app. 

Return to the terminal and the location of your .snap file ("release" folder). You now need to authenticate the snapcraft command using your Snapcraft developer account credentials. This can be accomplished with the following:

```sh
snapcraft login
```

Next, upload the snap and release it into the stable channel, replace <snap-file-name> with your built snap. You can find the file in release folder
e.g(mysnap_0.0.0_amd64.snap):
  
```bash
snapcraft upload --release=stable <snap-file-name>.snap
```
  
Congratulations, your snap has now been released and is available on the Snap Store
You can also install your app via:

```sh
sudo snap install <app-name>
```

### Actions

This is a Github Action that can be used to publish [snap
packages](https://snapcraft.io) to the Snap Store built by [snapcore](https://github.com/snapcore/action-publish).
  
![carbon(9)](https://user-images.githubusercontent.com/42158443/147774289-49e4197d-ddd8-4e00-9a94-e1fbd55a820b.png)

This action is already written in [.github/workflows/sanpcraft.yaml](https://github.com/Efshal/boilerplate-monorepo/blob/main/.github/workflows/snapcraft-publish.yml), you have to first produce data using command below: 
```sh
$ snapcraft export-login --snaps=PACKAGE_NAME \
      --acls package_access,package_push,package_update,package_release \
      exported.txt
```
This will produce a file `exported.txt` containing the login data,
which should be a multi-line file starting with `[login.ubuntu.com]`.
  
In order to make the credentials available to the workflow, they
should be stored as a repository secret:

1. choose the "Settings" tab.
2. choose "Secrets" from the menu on the left.
3. click "Add a new secret".
4. set the name to `STORE_LOGIN`, and paste the contents of `exported.txt` as the value.
  
![secret](https://github.com/snapcore/action-publish/raw/master/add-secret.jpg)

This will build the project, upload the result to the store, and
release it to the `edge` channel.

  
## Web Application build and Firebase Deployment

Build your project first

```sh
ng build
```
 
 
Create a new project on Firebase

Click on Hosting section in Side Panel

Then Click Get Started
  
![image](https://user-images.githubusercontent.com/42158443/147596048-993d7c5c-959d-4af2-8d18-0eaa2389fa5b.png)

Follow Steps to Setup Firebase Hosting for your Project
  
Do not tick this option

![image](https://user-images.githubusercontent.com/42158443/147596223-291386d3-51d3-4865-8b6e-1f474ee30023.png)

On running `firebase init` a list of options will appear

Select `Firebase Hosting`

![image](https://user-images.githubusercontent.com/42158443/147598089-c60fa81c-57b8-4f22-b88d-5adcbade02be.png)


Answer these questions as done below:

![image](https://user-images.githubusercontent.com/42158443/147604151-9acdd36f-9544-4af5-931c-3962042f676f.png)


Run
 ```sh
  firebase deploy
 ```
Select Existing Project option and then select project you made earlier on firebase website.
  
Your Application will be deployed
  
    
## Android Build, Signing, and PlayStore Deployment

### Android Deployment

Now at this stage we are ready with the Android build after going through the overall process from generating the key to signed the build release.In order to deploy the build to the Google play console, we used Fastlane (The easiest way to build and release mobile apps.fastlane handles tedious tasks so you don’t have to.)
Following steps need to be followed:


#### Configuration

1. Firstly install the Firebase in respective OS (mac/windows/linux).
2. Ruby must be installed in the system for installing fastlane init.
3. After setting up the fastlane package, now you are good to go towards the real essence of fastlane.
4. Initialize the fastlane using “fastlane init” in the Android folder present in the root of the project for e.g root/Android/.
5. You will see the directory fastlane having 2 files named Appfile and Fastfile.
  
#### Creating Play Console credentials

To connect fastlane with Play Console, you need to provide appropriate credentials in the form of an API key file. This file contains the credentials that fastlane will use to connect to your Google Play Console account and make updates on your behalf.

To create a key file, follow these steps from the [fastlane official documentation](https://docs.fastlane.tools/getting-started/android/setup/#collect-your-google-credentials). Once your key file is created, you can connect fastlane with your Google Play Console APIs.

1. You can validate your key using the command:
```sh
fastlane run validate_play_store_json_key json_key:/path/to/your/downloaded/file.json
```
  
2. Next, add your key file to fastlane. Open the fastlane/Appfile and update the json_key_file property with your key file location.
```sh
json_key_file("./api-key.json")
```
  
##### Writing Fastlane actions and lane:

Open Fastfile and write lanes for testing, increment version code, and deploying.

##### Test
![carbon(8)](https://user-images.githubusercontent.com/42158443/147602400-a548b75e-80e3-4bb4-8b77-76128c9938f8.png)


Run 
```sh
fastlane test
```

#### Increment version code:

Versioning is much easier with fastlane; you simply need to add the plugin shown below:

```sh
fastlane add_plugin increment_version_code
```
  
Once the plugin is installed, open your Fastfile and add a lane to increment the version code automatically:
  
![carbon(7)](https://user-images.githubusercontent.com/42158443/147602359-1af4ee28-0568-4b53-a83b-cf329a04e51b.png)

  
Run 
```sh
fastlane increment_vc
  ```
  
#### Deploy
1. Google Play console changed its policy of accepting only AAB file rather than APK file, so the bundleRelease command will generate the aab file.
2. You need to first upload the aab file to Google play manually, following all the policy guidelines, so that Fastlane can handle the automating the deployment to Google Play after that.
3. In this case aab file manually uploaded to Internal Testing , Please make sure the package name should be defined in aab file must be similar to when initializing the fastlane init at the very start.

![image](https://user-images.githubusercontent.com/42158443/147601759-d11400b5-c44e-431d-8fcc-aad573f6c746.png)

  
4. Don't worry you can change that also AndroidManifest.xml (android/app/src/main/AndroidManifest.xml) file under the tag “package”, in build.gradle (android/app/build.gradle) file under the tag “applicationId”, and in Appfile (android/fastlane/Appfile) file under the tag “package_name”.

![carbon(4)](https://user-images.githubusercontent.com/42158443/147601638-aaf61ae3-0224-483f-b405-3dea88b13687.png)


Run 
```sh
fastlane deploy
```
  
5. After Successful completion of fastlane

![image](https://user-images.githubusercontent.com/42158443/147601206-3b63e1bb-e782-408c-8793-03b79d1cb354.png)


6. You can direct to Google play console dashboard to see the recent release published through fastlane.
  
![image](https://user-images.githubusercontent.com/42158443/147601263-e8ad1539-7520-4026-8161-2b61d6bc8d45.png)


7. That’s it, we have successfully managed the application.

 
