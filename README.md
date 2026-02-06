# devlog.

This is a devlog.

# deployment
- sudo chmod +x deploy.sh
- ./deploy.sh
- devlogdot.conf:
``` apacheconf
<VirtualHost *:80>
	ServerName devlogdot.duckdns.org
	ServerAlias www.devlogdot.duckdns.org

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/devlog

	ErrorLog ${APACHE_LOG_DIR}/devlogdot_error.log
	CustomLog ${APACHE_LOG_DIR}/devlogdot_access.log combined
</VirtualHost>
```
- sudo a2ensite devlogdot.conf
- sudo systemctl restart apache2.service

# content structure
@@@
#Title: Test
#Date: 27-12-2025
#Body: test

@@@
#Title: Test2
#Date: 29-12-2025
#Body: test2 ^img_test2.png^ test2

@@@
#Title: Test
#Date: 30-12-2025
#Body: test3 ^img_test3.png^

Two posts will be displayed. Entries with the same title will go under the same post. Images format is: ^img_*image_filename*^.
