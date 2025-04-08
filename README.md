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

# Install sok for mic/voice input
# Go to the official download page:
# 🔗 https://sourceforge.net/projects/sox/files/sox/14.4.2/
# Download the file:sox-14.4.2-win32.zip
# Extract the ZIP file (you'll get a folder like sox-14-4-2 with files like sox.exe, libgcc_s_dw2-1.dll, etc.)
# Move all files to C:\Program Files\sox\ or C:\Program Files (x86)\sox\
# Add path in system variable : C:\Program Files\sox\ or C:\Program Files (x86)\sox\
# Open cmd and check for success installation
#     sox --version

 
## Compile and run the project

```bash
# development
$ npm run speak -- "This is an offline TTS demo" #whatever text need to convert to speech
$ npm run speak #Speak something after Speak now... log to test stt

## Run tests

```bash
# unit tests
$ npm run test:tts #to test tts module
$ npm run test:sst #to test sst module