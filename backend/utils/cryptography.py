import hashlib

def getEncoding(data:str, hasher:str = "sha256"):

    data_bytes = data.encode('utf-8')

    if hasher == "sha256":
        return hashlib.sha256(data_bytes).hexdigest()
