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
