import hashlib

from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend



def get_encoding(data: str, hash_alg: str = "sha256") -> str:
        data_bytes = data.encode("utf-8")

        if hash_alg == "sha256":
            return hashlib.sha256(data_bytes).hexdigest()
        elif hash_alg == "sha1":
            return hashlib.sha1(data_bytes).hexdigest()
        elif hash_alg == "md5":
            return hashlib.md5(data_bytes).hexdigest()
        else:
            raise ValueError(f"Unsupported hash algorithm: {hash_alg}")


def generate_keys(key_size: int = 2048):
        # Generate private key
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=key_size,
            backend=default_backend()
        )
        private_pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        ).decode("utf-8")

        # Generate public key
        public_key = private_key.public_key()
        public_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode("utf-8")

        return private_pem, public_pem
