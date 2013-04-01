def config = container.config

def agent_name = config.agent_name

def eb = vertx.eventBus

eb.registerHandler('agent') { message ->
	println "$agent_name: message received '${message.body}'"
	message.reply([status: 'ok', text: "$agent_name: message received '${message.body.text}'" as String])
}