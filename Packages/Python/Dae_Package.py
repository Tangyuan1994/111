import requests

distantAdress = "http://localhost:3000/"

def getData(id):
    return requests.get(distantAdress+"datasets/"+id)

print(getData("all").text)
print(getData("5330e2f3a0dd8ee433e3e702df012c19").text)

def postRate(id, rate):
    return requests.post(distantAdress+"document/"+id+"/addRate/"+str(rate))

print("\n","\n Ajout d'une note :",postRate("5330e2f3a0dd8ee433e3e702df012c19", 4).text)




