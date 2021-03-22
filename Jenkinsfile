library 'reference-pipeline'
library 'AppServiceAccount'

pipeline{
	agent {
		docker {
			label 'docker'
			image 'nexus2.prod.cloud.fedex.com:8444/fdx/jenkins/headless-chrome-image'
		}
	}

	environment {
		APP_NAME = 'WLGN'
		PROD_APPROVERS = '574383,853733,5279553'
		PAM_ID = '2560001'
		RECIPIENTS = 'CIAMUIDeveloper@corp.ds.fedex.com'
		GIT_URL = 'git@gitlab.prod.fedex.com/APP3537405/wlgn.git'
		TEAMS_WEBHOOK = "https://outlook.office.com/webhook/e7a10cdc-9871-44e1-95c9-93787953f53d@b945c813-dce6-41f8-8457-5a12c2fe15bf/IncomingWebhook/8bb1e83a89024dab927e3d0390b67b48/85446532-f2f1-4ae1-b66f-98e0cf41a378"
		/* GITLAB_TOKEN = credentials('WLGN_SERVICE_ACCT_API_TOKEN') */
	}

	parameters{
		choice(choices: ['default','development','release','staging'], description: '', name: 'LEVEL')
		choice(choices: ['BOTH','EDC','WTC'], description: '', name: 'DATA_CENTER')
		booleanParam(name: 'HP_FORTIFY_SCAN', description: 'Run HP-Fortify Scan')
		booleanParam(name: 'NEXUSIQ_SCAN', description: 'Run NexusIQ Scan')
	}

	options {
		buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '10', daysToKeepStr: '', numToKeepStr: '10')
		 connection: gitLabConnection("GitLab-3537405-WLGN")

		gitlabBuilds(builds: ["PrepareEnvironment","Build","UnitTests","SonarQube","QualityGateCheck","NexusIQAnalysis","FortifyAnalysis","e2eTests"])
	}

	stages{
		stage('Parameter Initialization'){
			steps{
				script{
					def paramInit = load "${WORKSPACE}/build/paramInit.groovy"
					println("Current Directory : " + paramInit)
					paramInit(apiEndpoint_dev_release : 'https://api.sys.clwdev1.paas.fedex.com',
					apiEndpoint_staging_production_edcw: '',
					apiEndpoint_staging_production_wtc: '')
				}
			}
		}

		stage('Prepare-Environment'){
			when{
				expression { params.LEVEL=='default' || params.LEVEL=='development' || params.LEVEL=='release' }
			}
			steps{
				gitlabCommitStatus("PrepareEnvironment"){
					println("Inside Prepare_Env - gitlabCommitStatus")
					withNPM(npmrcConfig:"modern_webapp_npmrcfile"){
						script{
						    npmUtility(npmArgs: 'ci')
						    sh '''
								env
								node --version
								npm --version
							'''
						}
					}
				}

			    sh '''
                    chmod 755 bump.sh
                '''
			}
		}

		stage('CI'){
			when{
				expression { params.LEVEL=='default' || params.LEVEL=='development' || params.LEVEL=='release' }
			}
			failFast true

			parallel{
				stage('Build'){
					stages{
						stage('Build'){
							steps{
								gitlabCommitStatus("Build"){
									println("Inside Build - gitlabCommitStatus")
									npmUtility(npmArgs: 'run build')
								}
							}
						}
					}
				}

				stage('UTQuality'){
					stages{
					    stage('Lint'){
							steps{
								gitlabCommitStatus("Lint"){
									npmUtility(npmArgs: 'run lint')
								}
							}
						}

						stage('Unit-Tests'){
							steps{
								gitlabCommitStatus("UnitTests"){
									npmUtility(npmArgs: 'run test')
								}
							}
						}

						stage('SonarQube Analysis'){
							steps{
								gitlabCommitStatus("SonarQube"){
									script{
 										if(env.BRANCH_NAME=='master' || env.BRANCH_NAME.startsWith('deploy-')){
											sonarqube(projectKey: 'OCA_WLGN',
											projectName: 'OCA_WLGN',
											projectVersion: sh(script: 'node -p "require(\'${WORKSPACE}/package.json\').version"', returnStdout: true).trim() + '-' + env.BRANCH_NAME,
											src: 'src',
											profile: 'MAGIC',
											exclusions: '**/*spec.ts',
											tsCoveragePath: 'coverage/lcov.info',
											test: '',
											binaries: '')
										}
										else{
											sonarqube(projectKey: 'Fedex-WLGN-Story',
											projectName: 'Fedex-WLGN-Story',
											projectVersion: sh(script: 'node -p "require(\'${WORKSPACE}/package.json\').version"', returnStdout: true).trim() + '-' + env.BRANCH_NAME,
											src: 'src',
											profile: 'MAGIC',
											exclusions: '**/*spec.ts',
											tsCoveragePath: 'coverage/lcov.info',
											test: '',
											binaries: '')
										}
									}
								}
							}
						}

						stage('Quality Gate Check'){
							steps{
								gitlabCommitStatus("QualityGateCheck"){
									script{
										echo "Skipping Quality Check"
										//sonarQualityGate()
									}
								}
							}
						}
					}
				}

				stage('Security Scan'){
					stages{
						stage('NexusIQ'){
							/*when{
								expression { params.NEXUSIQ_SCAN==true || env.BRANCH_NAME.startsWith('deploy-') }
							}*/
							steps{
								gitlabCommitStatus("NexusIQAnalysis"){
									script{
                                        if(params.NEXUSIQ_SCAN==true || env.BRANCH_NAME.startsWith('deploy-')){
    										nexusIQAnalysis(iqAppName: '3537163_Web_User_Password_Retrieve/Reset',
	    									iqScanPattern: 'node_modules/**/*')
										}
									}
								}
							}
						}

						stage('HP-Fortify'){
							/*when{
								expression { params.HP_FORTIFY_SCAN==true || env.BRANCH_NAME.startsWith('deploy-') }
							}*/
							steps{
								gitlabCommitStatus("FortifyAnalysis"){
									script{
										echo "Skipping Fortify Analysis"
                                            if(params.NEXUSIQ_SCAN==true || env.BRANCH_NAME.startsWith('deploy-')){
    										    //angularFortifyAnalysis(fortifyID: '')
    									}
									}
								}
							}
						}
					}
				}
			}
		}

		stage('Nexus'){
			parallel{
				stage('Nexus-Upload'){
				when {
                    expression { (params.LEVEL=='default' || params.LEVEL=='development' || params.LEVEL=='release') && (env.BRANCH_NAME=='master' || env.BRANCH_NAME.startsWith('deploy-')) }
                }
                steps{
                    withNPM(npmrcConfig:"modern_webapp_npmrcfile"){
                        script{
                            ngNexusUpload(repositoryName: env.NEXUS_REPO,
                            groupName: env.APP_NAME,
                            artifactName: env.BRANCH_NAME)
                        }
                    }
                }
					//steps{
					//	withNPM(npmrcConfig:"modern_webapp_npmrcfile"){
					//		script{
					//		    npm run release
					//		}
					//	}
					//}
				}

				stage('Nexus-Download'){
					when {
						expression { !(params.LEVEL=='default' || params.LEVEL=='development' || params.LEVEL=='release') && (env.BRANCH_NAME.startsWith('deploy-')) }
					}
					stages{
						stage('Version Selection'){
							steps{
								script{
									ngNexusVerSelector(nexusCredentials: 'Modern_WebApp_NexusCred',
									repositoryName: env.NEXUS_REPO,
									groupName: env.APP_NAME,
									artifactName: env.BRANCH_NAME)
								}
							}
						}

						stage('Production-Approval'){
							when {
								expression { params.LEVEL=='production' }
							}
							options{
								timeout(time: 10, unit: 'MINUTES')
							}
							steps{
								script{
									mail bcc: '', body: "Build for application: ${env.APP_NAME} has been triggered on environment: ${params.LEVEL}.\n\nPlease go to Build URL: ${BUILD_URL} and verify the build", cc: '', from: '', replyTo: '', subject: "PROD Build Triggered | Build#${env.BUILD_NUMBER} for ${env.JOB_NAME}", to: env.RECIPIENTS
									input(
										message: "Do you want to deploy to ${params.LEVEL} environment?",
										submitter: "$PROD_APPROVERS"
									)
									echo("Confirmation Accepted")
								}
							}
						}

						stage('Artifact Download'){
							steps{
								script{
									ngNexusDownload(nexusCredentials: 'Modern_WebApp_NexusCred',
									repositoryName: env.NEXUS_REPO,
									groupName: env.APP_NAME,
									artifactName: env.BRANCH_NAME)
								}
							}
						}
					}
				}
			}
		}

		stage('Properties-File Update'){
			steps{
				script{
					configFileProvider([configFile(fileId: "${env.OAUTH_FILE_ID}", variable: 'OAUTH_FILE')]) {
						sh """
							cp src/level/${env.LEVEL_PROP} dist/assets/configs/level.json
							cp src/caas/${env.CAAS} dist/assets/configs/caas.json
							cp ${OAUTH_FILE} dist/assets/configs/oauth.json
							# cp src/Staticfile dist/Staticfile
						"""
					}
				}
			}
		}

		stage('CD'){
			/*when{
				expression { env.BRANCH_NAME!='master' }
			}*/
			stages{
				stage('PreDeploy Validation'){
					steps{
						script{
							sh '''
								ls -lartR ./dist
								# cat ./dist/assets/configs/oauth.json
							'''
						}
					}
				}

				stage('App Deployment - EDCW'){
					when{
						expression { env.DEPLOY_TO_EDC=='true' }
					}
					steps{
						script{
							pcfDeploy pamId: env.PAM_ID,
							url: env.EDCW_API_ENDPOINT,
							space: env.SPACE,
							cfcmd: "push ${env.PCF_APPNAME} -f manifest.yml -i ${env.REPLICAS}"
						}
					}
				}

				/*stage('App Deployment - WTC'){
					when{
						expression { env.DEPLOY_TO_WTC=='true' }
					}
					steps{
						script{
							pcfDeploy pamId: env.PAM_ID,
							url: env.WTC_API_ENDPOINT,
							space: env.SPACE,
							cfcmd: "push ${env.PCF_APPNAME} -f manifest.yml -i ${env.REPLICAS}"
						}
					}
				}*/
				
				stage('App Deployment'){
    				when{
    						expression { env.DEPLOY_TO_WTC=='true' }
    					}
					steps{
                        script{
						    def PCF_ENDPOINTS=[]
                    	    PCF_ENDPOINTS=["https://api.sys.clwdev1.paas.fedex.com","https://api.sys.clwdev2.paas.fedex.com", "https://api.sys.clwdev3.paas.fedex.com"]
                        	if(env.BRANCH_NAME.startsWith('master')){
                            	if(PCF_ENDPOINTS != null && PCF_ENDPOINTS.size() > 0) {
                            		for(i = 0; i < PCF_ENDPOINTS.size(); i++) {
                                        pcfDeploy pamId: env.PAM_ID,
                                        url: PCF_ENDPOINTS[i],
                                        space: env.SPACE,
                                        cfcmd: "push ${env.PCF_APPNAME} -f manifest.yml -i ${env.REPLICAS}"
                            		}
                            	}
                            }
                            else
                            {
							pcfDeploy pamId: env.PAM_ID,
							url: PCF_ENDPOINTS[0],
							space: env.SPACE,
							cfcmd: "push ${env.PCF_APPNAME} -f manifest.yml -i ${env.REPLICAS}"
                            }
						}
					}
				}
			}
		}

		stage('e2e'){
			steps{
				gitlabCommitStatus("e2eTests") {
					script{
					     echo "GoldenBed - TestRun"
               			npmUtility(npmArgs: 'run e2e:cypress')
						   echo "AllTestCases - TestRun"
						sh '''
							#!/bin/bash
							export HTTP_PROXY=http://internet.proxy.fedex.com:3128/
							export HTTPS_PROXY=http://internet.proxy.fedex.com:3128/
							export LD_LIBRARY_PATH=$WORKSPACE/lib/chrome/linux-x64
							export E2E_HEADLESS=true
						
						'''
						
					}
				}
			}
		}

		stage('Nexus Tagging'){
			when{
				expression{ params.LEVEL=='production' }
			}
			steps{
				script{
				    createNexusTag(nexusCredentials: 'Modern_WebApp_NexusCred',
				        appName: env.APP_NAME,
                    	repositoryName: env.NEXUS_REPO,
                    	groupName: env.APP_NAME,
                    	artifactName: env.BRANCH_NAME,
                    	artifactVersion: env.Selected_Version)
				}
			}
		}
	}
	post{
	    success {
            office365ConnectorSend color: '#00FF00', message: "SUCCESSFUL", status: "Build Success", webhookUrl: TEAMS_WEBHOOK
        }
        failure {
            office365ConnectorSend color: '#FF0000', message: "FAILED", status: "Build Failure", webhookUrl: TEAMS_WEBHOOK
        	script{
				mail bcc: '', body: "Build Status: ${currentBuild.currentResult}.\n\nPlease go to Build URL: ${RUN_DISPLAY_URL} and verify the build", cc: '', from: '', replyTo: '', subject: "Build#${env.BUILD_NUMBER}|${currentBuild.currentResult} for ${env.JOB_NAME}", to: env.RECIPIENTS
			}
        }
		always{
			script{
				//mail bcc: '', body: "Build Status: ${currentBuild.currentResult}.\n\nPlease go to Build URL: ${RUN_DISPLAY_URL} and verify the build", cc: '', from: '', replyTo: '', subject: "Build#${env.BUILD_NUMBER}|${currentBuild.currentResult} for ${env.JOB_NAME}", to: env.RECIPIENTS
				cleanWs()
			}
		}
	}
}
