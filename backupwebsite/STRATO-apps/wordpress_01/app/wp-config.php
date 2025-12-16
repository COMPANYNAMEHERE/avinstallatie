<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'dbs12447576' );

/** Database username */
define( 'DB_USER', 'dbu5589697' );

/** Database password */
define( 'DB_PASSWORD', 'QKDnC9NETTTB35hlFGICfSsZmtGRMLuRRNO' );

/** Database hostname */
define( 'DB_HOST', 'rdbms.strato.de' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '1kFzLC0LUDSx97IIH6P2ITyVuusxp9hNZALfouU7hmlvkx7VYD391kL0iG92ZNZr');
define('SECURE_AUTH_KEY',  '2xBkSW4MO5demJGvHx5EMv2GmDZ4a6GG2TQXnveyORXeJUFQ4w1cAZAJqMTlIWWe');
define('LOGGED_IN_KEY',    '7s7iaHXxftewFseIyH49XyvWoskDe4UNOa5vQUnnIlQfIhKHvPkHZLl4vkRTmXv0');
define('NONCE_KEY',        'AhX6EBCuxe9e1977WwlT9R6G2wWecVYdUy59YWZKijR2xoqlcDWmsTOok2jAfDaP');
define('AUTH_SALT',        '35IKaE3q3oX1F2aHALtM8dXGG9k09TFSR7aVPfNq8Uann5AjdFz8bXJvhH2iiIZa');
define('SECURE_AUTH_SALT', '9sHFcXArE4BtjmTkPp6G1OeiJl0Go6zxyeKXcrDid9apz5whHn4hPGQRHTcU2tT7');
define('LOGGED_IN_SALT',   'QhNgo8CU1vPdGcRparZnCQWAbIzB6I9r2pf0eivLSY1hRIllc86NWuLUhmPIIGu9');
define('NONCE_SALT',       'wrDKIqQg3Gbkds0DGYiq5dMnzzqChSLLfP7x5dW3nm9zcBnpPoDxK5PixU4K6ULd');

/**
 * Other customizations.
 */
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'zj5w_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

define( "WP_AUTO_UPDATE_CORE", true );