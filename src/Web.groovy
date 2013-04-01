def config = container.config

def webServerConf = [
	host: config.webserver_host,
	port: config.webserver_port,
	bridge: true,
	inbound_permitted: [
		[
			address: 'vertx.basicauthmanager.login',
		],
		[
			address : 'agent',
			requires_auth : true,
		],
	],
	outbound_permitted: [[:]],
]

def mailConf = [
	host: config.smtp_host,
	port: config.smtp_port,
	ssl: config.smtp_ssl,
	auth: config.smtp_auth,
	username: config.smtp_username,
	password: config.smtp_password,
]

def mongoDbConf = [
	host: config.mongodb_host,
	port: config.mongodb_port,
	db_name: config.mongodb_dbname,
	username: config.mongodb_username,
	password: config.mongodb_password,
]

container.with {

	// Deploy a MongoDB persistor module
	deployModule('vertx.mongo-persistor-v1.2.1', mongoDbConf, 1) {
		def eb = vertx.eventBus
		def pa = 'vertx.mongopersistor'

		eb.send(pa, [action: 'delete', collection: 'users', matcher: [:]])
		eb.send(pa, [
			action: 'save',
			collection: 'users',
			document: [
				firstname: 'Ciro',
				lastname: 'Cavani',
				email: 'ciro.cavani@gmail.com',
				username: 'cavani',
				password: 'cavani',
			],
		])
	}

	// Deploy an auth manager to handle the authentication
	deployModule('vertx.auth-mgr-v1.1')

	// Deploy a Mailer (SMTP) module
	//deployModule('vertx.mailer-v1.1', mailConf)

	// Start the web server, with the config we defined above
	deployModule('vertx.web-server-v1.0', webServerConf)
}