pipeline {
    agent any

    tools {
        nodejs "nodejs-14" // Name of the NodeJS installation configured in Jenkins
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/kiran877/gemini_clone.git', branch: 'main'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                // Example deployment step - customize as needed
                sh 'npm run deploy'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
