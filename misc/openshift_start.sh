#!/bin/bash

. $OPENSHIFT_DATA_DIR/.bash_profile

cd $OPENSHIFT_REPO_DIR

echo "{" > conf/web.config
echo "\"webserver_host\":\"${OPENSHIFT_INTERNAL_IP}\"," >> conf/web.config
echo "\"webserver_port\":${OPENSHIFT_INTERNAL_PORT}," >> conf/web.config
echo "\"mongodb_host\":\"${OPENSHIFT_MONGODB_DB_HOST}\"," >> conf/web.config
echo "\"mongodb_port\":${OPENSHIFT_MONGODB_DB_PORT}," >> conf/web.config
echo "\"mongodb_dbname\":\"${OPENSHIFT_APP_NAME}\"," >> conf/web.config
echo "\"mongodb_username\":\"${APP_MONGODB_USERNAME}\"," >> conf/web.config
echo "\"mongodb_password\":\"${APP_MONGODB_PASSWORD}\"," >> conf/web.config
echo "\"smtp_host\":\"${APP_SMTP_HOST}\"," >> conf/web.config
echo "\"smtp_port\":${APP_SMTP_PORT}," >> conf/web.config
echo "\"smtp_ssl\":${APP_SMTP_SSL}," >> conf/web.config
echo "\"smtp_auth\":${APP_SMTP_AUTH}," >> conf/web.config
echo "\"smtp_username\":\"${APP_SMTP_USERNAME}\"," >> conf/web.config
echo "\"smtp_password\":\"${APP_SMTP_PASSWORD}\"" >> conf/web.config
echo "}" >> conf/web.config

echo "{" > conf/agent.config
echo "\"agent_name\":\"Entropy Agent 01\"" >> conf/agent.config
echo "}" >> conf/agent.config

sed -e "s/\${CLUSTER_IP_ADDRESS}/`echo ${OPENSHIFT_INTERNAL_IP}`/g" misc/cluster.xml > conf/cluster.xml

export CLASSPATH=${CLASSPATH}:${OPENSHIFT_REPO_DIR}conf

nohup bash -c "exec 'vertx' 'run' 'src/Web.groovy' -conf conf/web.config -cluster -cluster-host ${OPENSHIFT_INTERNAL_IP} -cluster-port 25500 &> ${OPENSHIFT_DIY_LOG_DIR}web.log" &> /dev/null &
echo $! > .openshift/web.pid
nohup bash -c "exec 'vertx' 'run' 'src/Agent.groovy' -conf conf/agent.config -cluster -cluster-host ${OPENSHIFT_INTERNAL_IP} -cluster-port 25501 &> ${OPENSHIFT_DIY_LOG_DIR}agent.log" &> /dev/null &
echo $! > .openshift/agent.pid
