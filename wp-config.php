<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'dnacellr');

/** MySQL database username */
define('DB_USER', 'dnacellr');

/** MySQL database password */
define('DB_PASSWORD', 'magl.osb');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'lt7dv8zjk1dbdkgkmfjkt3bmgii2kwufx0nj9xaxobp8w5zljytdgwetadpfaz1k');
define('SECURE_AUTH_KEY',  '7wj3evn6akasogbxsoura2umvwumu8ri5cb6lxdejjx0rm8xke0jsccpw7aov98v');
define('LOGGED_IN_KEY',    'a5utnhxmxxabshuh3wot8boimz4dzswr0y44d9ayrjstwvlny7z6aazhii65httu');
define('NONCE_KEY',        'x1zolyea0q0fhwius0azav9wyywne3mxxp2ncqlrqsnswbnjeyon0uigrdcpmkdl');
define('AUTH_SALT',        'varhm9o7smcw8npe1lwnvbzupb9n14fu4bvyqkyu4y0emtfz0onaoa7ihylel3uy');
define('SECURE_AUTH_SALT', 'itdormqnuh8g9kyhpoewllxzrljlu5puzeavndvaz201rd9y5vifpig1ob71zlct');
define('LOGGED_IN_SALT',   '3kaeugqgshxdaohe3tqbu2gubexdczhlbaghnmzj5knj7mpri4gz7zjsj4zfkuwe');
define('NONCE_SALT',       '1szjji5tklfn2rqzvojg0ojhx2g9kwlmjiovhquvrajm7bncyspf6znvv63j1ydq');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
