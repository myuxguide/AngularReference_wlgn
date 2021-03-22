#!/user/bin/env groovy
def call(Map config){
	def devInstance = (config.devInstance != null) ? config.devInstance : '1'
    def releaseInstance = (config.releaseInstance != null) ? config.releaseInstance : '1'
    def stagingInstance = (config.stagingInstance != null) ? config.stagingInstance : '3'
    def productionInstance = (config.productionInstance != null) ? config.productionInstance : '3'
	def snapshotNexusRepo = (config.snapshotNexusRepo != null) ? config.snapshotNexusRepo : 'modern-webapp-dev'
	def releaseNexusRepo = (config.releaseNexusRepo != null) ? config.releaseNexusRepo : 'modern-webapp-release'
	def datas = readYaml file: 'manifest.yml'
    def appName=datas.applications.name.join("")

	if(env.BRANCH_NAME.startsWith('deploy-') || env.BRANCH_NAME=='master'){
		env.NEXUS_REPO = releaseNexusRepo

		if((params.LEVEL=='default' || params.LEVEL=='release') && (params.DATA_CENTER=='BOTH' || params.DATA_CENTER=='WTC')){
    		env.DEPLOY_TO_EDC = false
    		env.DEPLOY_TO_WTC = true
    	}
    	else if((params.LEVEL=='staging' || params.LEVEL=='production') && params.DATA_CENTER=='BOTH'){
    		env.DEPLOY_TO_EDC = true
    		env.DEPLOY_TO_WTC = true
    	}
    	else if((params.LEVEL=='staging' || params.LEVEL=='production') && params.DATA_CENTER=='EDC'){
    		env.DEPLOY_TO_EDC = true
    		env.DEPLOY_TO_WTC = false
    	}
    	else if((params.LEVEL=='staging' || params.LEVEL=='production') && params.DATA_CENTER=='WTC'){
    		env.DEPLOY_TO_EDC = false
    		env.DEPLOY_TO_WTC = true
    	}
    	else if(params.LEVEL=='release' && params.DATA_CENTER=='EDC'){
    		error "Please do not select Data_Center as EDC for ${params.LEVEL} space"
    	}
    	else{
    		error "${env.BRANCH_NAME} branch cannot be deployed to ${params.LEVEL} space"
    	}

    	if(params.LEVEL=='default' || params.LEVEL=='release'){
    		env.SPACE = 'release'
			env.REPLICAS = releaseInstance
			env.PCF_APPNAME = appName+'-release'
			env.LEVEL_PROP = '3.json'
			env.CAAS = "caas.release.json"
			env.OAUTH_FILE_ID = 'OAUTH_CONFIG_RELEASE'
    	}
    	else if(params.LEVEL=='staging'){
    		env.SPACE = 'staging'
			env.REPLICAS = stagingInstance
			env.PCF_APPNAME = appName+'-stage'
			env.LEVEL_PROP = '6.json'
			env.CAAS = "caas.staging.json"
			env.OAUTH_FILE_ID = 'OAUTH_CONFIG_STAGE'
    	}
    	else if(params.LEVEL=='production'){
    		env.SPACE = 'production'
			env.REPLICAS = productionInstance
			env.PCF_APPNAME = appName+'-prod'
			env.LEVEL_PROP = '7.json'
			env.CAAS = "caas.prod.json"
			env.OAUTH_FILE_ID = 'OAUTH_CONFIG_PROD'
    	}
    }
    else{
    	env.NEXUS_REPO = snapshotNexusRepo

		if((params.LEVEL=='default' || params.LEVEL=='development') && (params.DATA_CENTER == 'BOTH' || params.DATA_CENTER == 'WTC')){
    		env.DEPLOY_TO_EDC = false
    		env.DEPLOY_TO_WTC = true
    	}
    	else if(params.LEVEL=='development' && params.DATA_CENTER=='EDC'){
    		error "Please do not select Data_Center as EDC for ${params.LEVEL} space"
    	}
    	else{
    		error "${env.BRANCH_NAME} branch cannot be deployed to ${params.LEVEL} space"
    	}

    	if(params.LEVEL=='default' || params.LEVEL=='development'){
    		env.SPACE = 'development'
			env.REPLICAS = devInstance
			env.PCF_APPNAME = appName+'-'+env.BRANCH_NAME
			env.LEVEL_PROP = "2.json"
			env.CAAS = "caas.develop.json"
			env.OAUTH_FILE_ID = "OAUTH_CONFIG_DEV"
    	}
    }

	if(params.LEVEL=='default' || params.LEVEL=='development' || params.LEVEL=='release'){
	    env.EDCW_API_ENDPOINT=config.apiEndpoint_dev_release
	    env.WTC_API_ENDPOINT=config.apiEndpoint_dev_release
	}
	else if(params.LEVEL=='staging' || params.LEVEL=='production'){
	    env.EDCW_API_ENDPOINT=config.apiEndpoint_staging_production_edcw
	    env.WTC_API_ENDPOINT=config.apiEndpoint_staging_production_wtc
	}
}
return this
