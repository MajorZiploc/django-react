# https://minikube.sigs.k8s.io/docs/tutorials/kubernetes_101/
function minikube_up {
  # useful for finding free IP address
  # netstat -vanp tcp
  minikube start --driver docker --static-ip 192.168.200.200;
  minikube ip;
  minikube start --nodes 2 -p multinode-demo;
  kubectl get nodes;
  minikube status -p multinode-demo;
  kubectl apply -f hello-deployment.yaml;
  kubectl rollout status deployment/hello;
  kubectl apply -f hello-svc.yaml;
  kubectl get pods -o wide;
  minikube service list -p multinode-demo;
}

function minikube_down {
  minikube stop -p multinode-demo;
  minikube delete -p multinode-demo;
}

# https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/
function kompose_convert_up {
  # create k8s files from docker-compose.yml
  kompose convert;
  # up a local k8s env
  minikube start --driver docker --static-ip 192.168.200.200;
  # up services
  kubectl apply -f frontend-tcp-service.yaml,redis-master-service.yaml,redis-slave-service.yaml,frontend-deployment.yaml,redis-master-deployment.yaml,redis-slave-deployment.yaml;
  minikube service frontend;
  # view all services
  kubectl describe svc;
  # view service details of frontend
  # kubectl describe svc frontend;
}

function kompose_convert_down {
  kubectl delete -f frontend-tcp-service.yaml,redis-master-service.yaml,redis-slave-service.yaml,frontend-deployment.yaml,redis-master-deployment.yaml,redis-slave-deployment.yaml
  minikube stop;
  minikube delete;
}

# TODO: next step is to use on this projects docker compose
# may need to collaspe docker compose files into a deploy and local flavor
# see if you can provide a docker compose name to kompose convert
# NOTE: looks like you can provide multi docker compose files to kompose
# kompose -f docker-compose.yml -f docker-guestbook.yml convert
# generate a Chart file for Helm: kompose convert -c
