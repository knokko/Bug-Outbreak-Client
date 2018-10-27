# Bug-Outbreak-Client
The client/frontend for my work in progress game Bug Outbreak

I am trying to create a multiplayer game with a plain javascript frontend/client and a java server. I am just doing this for fun, so I may or may not finish the project.

Installation:

You should install github.com/knokko/Bug-Outbreak-Server first because you will need it before you can finish this client.

Then clone this repository to wherever you would like to work with it.

You can find all 'dependencies' in main.html at the begin of the script list. Every script that starts with ../../ ... refers to 1 of my repositories at github. Clone all those repositories to a folder and double click on the 'LibraryExporter.jar' in every folder once you cloned it. If I didn't break anything in the meantime, every folder will have a .js file that starts with the name of the folder next to it.

Now to back to main.html and edit the script tags such that they refer to those .js files.

Then open GameUtils.js and change the value of the constants to the values that you can see in the auth server console.

If I didn't mess up anything in the meantime, double clicking on main.html should start the client.
