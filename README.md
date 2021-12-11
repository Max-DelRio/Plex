# Plex
1. Install node.js if not already installed on the computer
2. Download the project from github, found at https://github.com/Max-DelRio/Plex
3. Using the command line, or text editor of your choice go to the plex directory. Example: mine is  cd "V:\(V)Documents\Github\Plex\Plex"
4. When in the directory open the command line and type npm - g install firebase-tools
5. Then login with the gmail account linked to the firebase console with the command: firebase login
6. Then type firebase use --add and select the plex inventory system.
7. For the project alias, give it the name default
8. Type firebase emulators:start --only hosting
9. It will tell you which local host address to go to.
10. If you get an error saying is not digitally signed. Type Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass, and type firebase emulators:start --only hosting. Then type firebase emulators:start --only hosting
11.If you get an error saying you have to be logged in, type firebase login
12. Open your browser and go to the local host address listed to get to the sign in page.
13. Note: we found that the program does not run correctly on the FireFox browser. If it is not working for your preferred browser, try it on another one. We found that it works with Chrome and Microsoft Edge
14. There is no register button, as adding new users is done within the system, so we have a test account. 
15. Email: 123@gmail.com	Password: abc123
