pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/kiran877/gemini_clone.git', 
                branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('my-react-app')
                }
            }
        }

        stage('Stop Previous Container') {
            steps {
                script {
                    // Try to stop any running container with the same name
                    sh 'docker stop my-react-app || true'
                    sh 'docker rm my-react-app || true'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image('my-react-app').run('--name my-react-app -d -p 8081:80')
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! The React app is available at http://<jenkins-server-ip>:8081'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
