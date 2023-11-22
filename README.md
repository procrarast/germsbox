# germsbox
Simple multibox Chromium extension for Germs.io.

Set the switcher key in the popup to switch between Germs.io windows. If one is not already open, one will be opened for you, with the same party URL.

There is apparently a background rendering quirk where switching between fullscreened windows in the Windows operating system. Not yet tested in Linux, but for the time being, please run the game in windowed mode for the best experience.


# Installation
This extension's source code is what is referred to as an "unpacked extension," since it's not built into a clean package for the Chrome store. As this is still in development, we need to change some settings to allow your computer to run this source code.
1. Clone the repo.

This can be done in a couple ways. You can download as .zip, or run a `git clone https://github.com/procrarast/germsbox.git` command in your terminal.

2. Navigate to your Chromium browser's search bar and go to `chrome://extensions.`

3. Within the extensions page, there is a Developer Mode button. Make sure it's checked, and click on "Load Unpacked."
  
4. Select the "germsbox" folder.

You should be good from here. Make sure it doesn't throw any errors and try running a new Germs tab, and set a keycode in the settings popup.

# Temporary Settings
As of right now, you have to manually enter a keycode in settings. You can find the keycode for any key at this website, which I do not own:
https://keycode-visualizer.netlify.app/

# TODO
Below is a list of features planned for the near future. 
- When switching between windows, send a 'keyup' event for the feed key.
- Get working keyboard events on germs.io
This can be done with script injection, allegedly, which is TBI.
