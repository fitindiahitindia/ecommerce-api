pipeline{
    agent any
    environment{
        SONAR_HOME = tool "Sonar"
    }
    stages{
        stage("clone code from github"){
            steps{
                git url:"https://github.com/fitindiahitindia/ecommerce-api.git", branch:"master"
            }
        }
         
        stage("SonarQube Quality Analysis"){
            steps{
                withSonarQubeEnv("Sonar"){
                    sh "${SONAR_HOME}/bin/sonar-scanner -Dsonar.projectName=ecommerce-api -Dsonar.projectKey=ecommerce-api"
                }
            }
        }
        stage("OWASP Dependency Check"){
            steps{
                dependencyCheck additionalArguments: '--scan ./', odcInstallation:'DC'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage("Sonar Quality Gate Scan"){
            steps{
                timeout(time:2 ,unit:"MINUTES"){
                    waitForQualityGate abortPipeline:false
                }
            }
            
        }
        stage("trivy file system scan"){
            steps{
            sh "trivy fs --format table -o trivy-fs-report.html ."
            }
            
        }
    }
}
