import hashlib

def getEncoding(data:str, hashAlg:str = "sha256") -> str:
    '''
    Encodes string cryptographically

    data    : string to be encoded
    hashAlg : hash algorithm to ber used

    return  : hashed string 
    '''

    data_bytes = data.encode('utf-8')

    if hashAlg == "sha256":
        return hashlib.sha256(data_bytes).hexdigest()
