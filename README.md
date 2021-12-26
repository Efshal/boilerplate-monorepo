# Foobar

Linux Electron App build and Snapcraft Release
## Installation

clone the repo 
```bash
git clone https://github.com/Efshal/boilerplate-monorepo.git
```
run npm install
```bash
npm install
```
run snapcraft init to setup snap/snapcraft.yaml
```bash
snapcraft init
```
![snapcraft yaml](https://user-images.githubusercontent.com/42158443/147403528-eac9be0a-f3ba-4de2-ad34-38daae020ca9.png)

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
