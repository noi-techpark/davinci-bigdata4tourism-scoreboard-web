pipeline {
    agent {
        dockerfile {
            filename 'docker/dockerfile-node'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')

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
                s3Upload(bucket: 'test-bigdata4tourism-web', acl: 'PublicRead', file: './dist')
            }
        }
    }
}
