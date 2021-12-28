# Guide

## Linux Electron App build and Snapcraft Release

Clone the repo 

```bash
git clone https://github.com/Efshal/boilerplate-monorepo.git
```

Run npm install

```bash
npm install
```

Install snapcraft for releasing .snap of your electron app to Snapcraft

```bash
sudo apt update
sudo apt install snapd
```

Run snapcraft init to setup snap/snapcraft.yaml

```bash
snapcraft init
```

Register your app name, following steps from link below
https://snapcraft.io/docs/registering-your-app-name


Then set "name" key with registered app name in package.json
![carbon](https://user-images.githubusercontent.com/42158443/147568704-6ee479c1-6999-4445-99b8-82f2a8866228.png)


Also set "name" key with registered app name in snapcraft.yaml
![carbon(1)](https://user-images.githubusercontent.com/42158443/147569091-5fbf1fbe-3c7b-4b3d-9404-0c5ad288b320.png)


Run npm run electron:package to build .snap file of your Electron App

```bash
npm run electron:package
```
A "release" folder will be created in the root directory of your project with .snap file of your electron app. 

Return to the terminal and the location of your .snap file ("release" folder). You now need to authenticate the snapcraft command using your Snapcraft developer account credentials. This can be accomplished with the following:

```bash
snapcraft login
```

Next, upload the snap and release it into the stable channel, replace <snap-file-name> with your built snap. You can find the file in release folder
e.g(mysnap_0.0.0_amd64.snap):
  
```bash
snapcraft upload --release=stable <snap-file-name>.snap
```
  
Congratulations, your snap has now been released and is available on the Snap Store
You can also install your app via:

```bash
sudo snap install <app-name>
```




  
## Web Application build and Firebase Deployment

Build your project first

```bash
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

To create a key file, follow these steps from the fastlane official documentation. Once your key file is created, you can connect fastlane with your Google Play Console APIs.

1. You can validate your key using the command:
```bash
fastlane run validate_play_store_json_key json_key:/path/to/your/downloaded/file.json
```
  
2. Next, add your key file to fastlane. Open the fastlane/Appfile and update the json_key_file property with your key file location.
```bash
json_key_file("./api-key.json")
```
  
##### Writing Fastlane actions and lane:

Open Fastfile and write lanes for testing, increment version code, and deploying.

##### Test
![carbon(2)](https://user-images.githubusercontent.com/42158443/147600235-d6ab729f-8e6b-4eb8-a0e7-70795d623cd7.png)

  
Run 
```bash
fastlane test
```

#### Increment version code:

Versioning is much easier with fastlane; you simply need to add the plugin shown below:

```bash
fastlane add_plugin increment_version_code
```
  
Once the plugin is installed, open your Fastfile and add a lane to increment the version code automatically:

![carbon(3)](https://user-images.githubusercontent.com/42158443/147600633-4c2ab2d5-0f96-4e2b-b307-fe4948167734.png)
  
  
Run 
```bash
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
```bash
fastlane deploy
```
  
5. After Successful completion of fastlane

![image](https://user-images.githubusercontent.com/42158443/147601206-3b63e1bb-e782-408c-8793-03b79d1cb354.png)


6. You can direct to Google play console dashboard to see the recent release published through fastlane.
  
![image](https://user-images.githubusercontent.com/42158443/147601263-e8ad1539-7520-4026-8161-2b61d6bc8d45.png)


7. That’s it, we have successfully managed the application.

 
