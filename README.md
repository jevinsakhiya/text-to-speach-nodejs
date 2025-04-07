```bash
git clone git@github.com:jevinsakhiya/text-to-speach-nodejs.git

```bash
# Install dependencies
npm install

# Install eSpeak
# For Windows, follow below instructions

# Download: https://espeak.sourceforge.net/download.html
# Add the folder containing espeak.exe (usually C:\Program Files\eSpeak\command_line) to your System PATH:
# Open Environment Variables
# Edit Path under System Variables
# Add: C:\Program Files\eSpeak\command_line\

## Compile and run the project

```bash
# development
$ npm run speak -- "This is an offline TTS demo" #whatever text need to convert to speech

## Run tests

```bash
# unit tests
$ npm run test:tts