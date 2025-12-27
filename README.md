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
