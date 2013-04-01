Endorfina Entropy
=================

Web Application for Agent Systems.

(GitHub)

https://github.com/cirocavani/endorfina-entropy

(OpenShift)

https://entropy-cavani.rhcloud.com/

Gears
-----

Featuring
---------

* Vert.x 1.3.1
* Groovy 2.0
* MongoDB 2.2

* AngularJS 1.0.5
* Bootstrap 2.3.1

Missing
-------

Configuration
-------------

**Dev Eclipse**

Download MondoDB, latest from 2.2

	tar xzf mongodb-linux-x86_64-2.2.3.tgz --directory=/srv/Software

Download Vert.x, latest 1.3.1

	tar xzf vert.x-1.3.1.final.tar.gz --directory=/srv/Software

(replace `vert.x-1.3.1.final/conf/cluster.xml` with `misc/cluster.xml`)
(edit `vert.x-1.3.1.final/conf/cluster.xml` replacing both `${CLUSTER_IP_ADDRESS}` with `127.0.0.1`)

_MongoDB_

1. Main Menu, 'Run' > 'External Tools' > 'External Tools Configurations...'
1. Window 'External Tools', toolbar 'New launch configuration'
   * Name: `Entropy MongoDB`
   * Location: `/srv/Software/mongodb-linux-x86_64-2.2.3/bin/mongod`
   * Working Directory: `${workspace_loc:/entropy}`
   * Arguments: `--dbpath data/`
1. Button 'Run'

Console:

	Mon Apr  1 13:44:44 [initandlisten] MongoDB starting : pid=8332 port=27017 dbpath=data/ 64-bit host=cavani-workstation
	Mon Apr  1 13:44:44 [initandlisten] db version v2.2.3, pdfile version 4.5
	Mon Apr  1 13:44:44 [initandlisten] git version: f570771a5d8a3846eb7586eaffcf4c2f4a96bf08
	Mon Apr  1 13:44:44 [initandlisten] build info: Linux ip-10-2-29-40 2.6.21.7-2.ec2.v1.2.fc8xen #1 SMP Fri Nov 20 17:48:28 EST 2009 x86_64 BOOST_LIB_VERSION=1_49
	Mon Apr  1 13:44:44 [initandlisten] options: { dbpath: "data/" }
	Mon Apr  1 13:44:44 [initandlisten] journal dir=data/journal
	Mon Apr  1 13:44:44 [initandlisten] recover : no journal files present, no recovery needed
	Mon Apr  1 13:44:46 [initandlisten] preallocateIsFaster=true 25.1
	Mon Apr  1 13:44:48 [initandlisten] preallocateIsFaster=true 25.8
	Mon Apr  1 13:44:52 [initandlisten] preallocateIsFaster=true 26.54
	Mon Apr  1 13:44:52 [initandlisten] preallocateIsFaster check took 7.541 secs
	Mon Apr  1 13:44:52 [initandlisten] preallocating a journal file data/journal/prealloc.0
	Mon Apr  1 13:44:55 [initandlisten] 		713031680/1073741824	66%
	Mon Apr  1 13:44:58 [initandlisten] 		985661440/1073741824	91%
	Mon Apr  1 13:45:06 [initandlisten] preallocating a journal file data/journal/prealloc.1
	Mon Apr  1 13:45:09 [initandlisten] 		807403520/1073741824	75%
	Mon Apr  1 13:45:19 [initandlisten] preallocating a journal file data/journal/prealloc.2
	Mon Apr  1 13:45:22 [initandlisten] 		849346560/1073741824	79%
	Mon Apr  1 13:45:32 [websvr] admin web console waiting for connections on port 28017
	Mon Apr  1 13:45:32 [initandlisten] waiting for connections on port 27017

Terminal:

	/srv/Software/mongodb-linux-x86_64-2.2.3/bin/mongo
	use default_db;
	> switched to db default_db
	db.addUser('system', 'secret', false);
	> {
	> "user" : "system",
	> "readOnly" : false,
	> "pwd" : "b1112c6995626642879de67f23a3593e",
	> "_id" : ObjectId("5159bb96111ead04e8b7544b")
	> }
	db.auth('system', 'secret');
	> 1

_Entropy Agent_

1. Main Menu, 'Run' > 'External Tools' > 'External Tools Configurations...'
1. Window 'External Tools', toolbar 'New launch configuration'
   * Name: `Entropy Agent`
   * Location: `/srv/Software/vert.x-1.3.1.final/bin/vertx`
   * Working Directory: `${workspace_loc:/entropy}`
   * Arguments: `run src/Agent.groovy -conf conf/agent.config -cluster -cluster-host 127.0.0.1 -cluster-port 25501`
1. Button 'Run'

Console:

	Starting clustering...

_Entropy Web_

1. Main Menu, 'Run' > 'External Tools' > 'External Tools Configurations...'
1. Window 'External Tools', toolbar 'New launch configuration'
   * Name: `Entropy Agent`
   * Location: `/srv/Software/vert.x-1.3.1.final/bin/vertx`
   * Working Directory: `${workspace_loc:/entropy}`
   * Arguments: `run src/Web.groovy -conf conf/web.config -cluster -cluster-host 127.0.0.1 -cluster-port 25500`
1. Button 'Run'

Console:

	Starting clustering... 
	Attempting to install module vertx.mongo-persistor-v1.2.1 from http://vert-x.github.com:80/vertx-mods/mods/vertx.mongo-persistor-v1.2.1/mod.zip 
	Downloading module... 
	Installing module into directory 'mods' 
	Module vertx.mongo-persistor-v1.2.1 successfully installed 
	Attempting to install module vertx.auth-mgr-v1.1 from http://vert-x.github.com:80/vertx-mods/mods/vertx.auth-mgr-v1.1/mod.zip 
	Downloading module... 
	Installing module into directory 'mods' 
	Module vertx.auth-mgr-v1.1 successfully installed 
	Attempting to install module vertx.web-server-v1.0 from http://vert-x.github.com:80/vertx-mods/mods/vertx.web-server-v1.0/mod.zip 
	Downloading module... 
	Installing module into directory 'mods' 
	Module vertx.web-server-v1.0 successfully installed 

**OpenShift DIY**

Stop application

	ssh appid@appname-domain.rhcloud.com
	ctl_app stop

_Java 7_

(Download JDK, latest 7u17)

	scp jdk-7u17-linux-x64.tar.gz appid@appname-domain.rhcloud.com:~/app-root/data/
	ssh appid@appname-domain.rhcloud.com
	cd app-root/data
	tar xzf jdk-7u17-linux-x64.tar.gz
	ln -s jdk1.7.0_17 Java7
	rm jdk-7u17-linux-x64.tar.gz

_vert.x_

(Download vert.x, latest 1.3.1.final)

	scp vert.x-1.3.1.final.tar.gz appid@appname-domain.rhcloud.com:~/app-root/data/
	ssh appid@appname-domain.rhcloud.com
	cd app-root/data
	tar xzf vert.x-1.3.1.final.tar.gz
	ln -s vert.x-1.3.1.final vertx
	rm vert.x-1.3.1.final.tar.gz
	rm vertx/conf/cluster.xml

_MongoDB_

	ssh appid@appname-domain.rhcloud.com
	mongo
	use entropy;
	> switched to db entropy
    db.addUser('system', '...pw...', false);
	> {
	> "user" : "system",
	> "readOnly" : false,
	> "pwd" : "...hex...",
	> "_id" : ObjectId("...pw...")
	> }
	db.auth('system', 'UQggOxcY')
	> 1

_Environment_

Edit `~/app-root/data/.bash_profile`:

(template `misc/openshift_env.sh`)

	APP_MONGODB_USERNAME="system"
	APP_MONGODB_PASSWORD="..."
	APP_SMTP_HOST="smtp.gmail.com"
	APP_SMTP_PORT="465"
	APP_SMTP_SSL="true"
	APP_SMTP_AUTH="true"
	APP_SMTP_USERNAME="...@gmail.com"
	APP_SMTP_PASSWORD="..."
	
	export APP_MONGODB_USERNAME \
	APP_MONGODB_PASSWORD \
	APP_SMTP_HOST \
	APP_SMTP_PORT \
	APP_SMTP_SSL \
	APP_SMTP_AUTH \
	APP_SMTP_USERNAME \
	APP_SMTP_PASSWORD
	
	export PATH="${OPENSHIFT_DATA_DIR}vertx/bin:${OPENSHIFT_DATA_DIR}Java7/bin:$PATH"
	export JAVA_HOME="${OPENSHIFT_DATA_DIR}Java7"

(...)

	source .bash_profile
	
	export
	
	> declare -x APP_MONGODB_PASSWORD="..."
	> declare -x APP_MONGODB_USERNAME="system"
	> declare -x APP_SMTP_AUTH="true"
	> declare -x APP_SMTP_HOST="smtp.gmail.com"
	> declare -x APP_SMTP_PASSWORD="..."
	> declare -x APP_SMTP_PORT="465"
	> declare -x APP_SMTP_SSL="true"
	> declare -x APP_SMTP_USERNAME="...@gmail.com"
	> ...

	java -version
	
	> java version "1.7.0_17"
	> Java(TM) SE Runtime Environment (build 1.7.0_17-b02)
	> Java HotSpot(TM) 64-Bit Server VM (build 23.7-b01, mixed mode)

_Application Git_

Replace `<GIT CLONE>/.openshift/action_hooks/start` with `misc/openshift_start`

Replace `<GIT CLONE>/.openshift/action_hooks/stop` with `misc/openshift_stop`

Remove `<GIT CLONE>/diy/`
