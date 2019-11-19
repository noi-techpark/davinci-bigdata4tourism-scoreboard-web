pipeline {
    agent {
        dockerfile {
            filename 'docker/dockerfile-node'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    environment {
        ES_HOST = "https://bigdata4tourism.davinci.bz.it/elasticsearch/"
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn run test'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run generate'
            }
        }
        stage('Upload') {
            steps {
                s3Upload(bucket: 'test-tourism-web', acl: 'PublicRead', file: './dist')
            }
        }
    }
}
