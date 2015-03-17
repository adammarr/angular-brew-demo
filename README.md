# angular-brew-demo
AngularJS demo of a Brewery app. Uses AngularJS, ngResource, ngMockE2E, ui-router, Angular Material, node,
bower, and gulp. Code is divided up into modules as an example of development using a core module containing root
and shared code, along with modules - admin in this case. The code also uses MockE2E to simulate development
without a real back-end to integrate with. The gulp build contains normal build and prod build tasks,
however only "gulp mock" will create a working application, as there is no actual back-end developed for this
application.

Slides: http://slides.com/adammarr/angular

##Setup and Installation
Some prerequists are requires to setup and run this application

```
Install nodejs    https://nodejs.org/
Install git       https://help.github.com/articles/set-up-git/
Install bower     npm install -g bower   (-g means globally)
Install gulp      npm install -g gulp    (you can shorthand "install" as just "i")
Install karma     npm install -g karma-cli   (angular test framework)
```

If you are behind a corporate firewall, see your company's instructions for configuring the proxies for
each applciation above.

On windows machines you may have to add node's "npm" AppData folder to your *PATH*. To test this, run
**bower -v** and **gulp -v** from the command line. On a Mac, if you get EACCESS errors running **npm**
use sudo **sudo npm i -g gulp** to execute as su.

##Fetch git repo
Create and navigate to the folder you wish to clone the git repo into.
>**git clone {{repo}}**
Copy the repo link from the github "clone URL" with HTTPS or SSH. For SSH you may need to first create and
configure local SSH keys. https://help.github.com/articles/generating-ssh-keys/

You can also fork this repo into your own github account.

##Initialize
Once the git repo is on your local machine, it is time to initialize all the assets. Run: **npm install** from directory
where *package.json* is installed. Node can be configured to kick of bower on npm install complete. For now, kick off
bower manually **bower install**. Once all the assets are initialized, run gulp **gulp mock**. To watch files for changes
run gulp watch-mock.

##Hosting
Any web container for hosting should work. As a preference, I prefer to host web apps out of apache using vhosts, an example
vhost config is below - replace the paths as needed, you'll also need to ensure mod_rewrite is enabled:

```
<VirtualHost *:80>
    DocumentRoot "{{path_to_the_application_root}}"
    ServerName brewdemo.local
    ErrorLog "/private/var/log/apache2/brew.local-error_log"
    CustomLog "/private/var/log/apache2/brew.local-access_log" common

    RewriteEngine on

    RewriteCond %{REQUEST_URI} ^/ajs
    RewriteRule ^/(.*) /index.html
    
    <Directory "{{path_to_the_application_root}}">
		Options Indexes MultiViews FollowSymLinks
		AllowOverride All
		Require all granted
    </Directory>
</VirtualHost>
```

Then add **127.0.0.1	brewdemo.local** to your OS hosts file.

When using the preinstalled apache server on a Mac, you may need to set folder permissions so the _www user has access.

##Building with Gulp
There are 3 primary build task groups with this applications gulpfile.
1. **gulp mock** build with included mock module, and angular-mocks.js. This would only be needed while a backend was being developed.
2. **gulp** (default) the normal development build, assuming a backend was present.
3. **gulp prod** the fully minified and concat'd version, for building on a CI server, and deploying to Test and Prod environments.

As stated above, only **gulp mock** will generate a working application in this case. The others are included only for reference.

##Style Guide
This application follows arguably the best style guide for building scalable angular applications: https://github.com/johnpapa/angular-styleguide

The code templates used by this application are available here: https://github.com/johnpapa/angular-styleguide#file-templates-and-snippets




