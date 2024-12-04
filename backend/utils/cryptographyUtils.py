import hashlib
import nacl.signing
import nacl.public



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
       signer_private_key = nacl.signing.SigningKey.generate()
       signer_public_key = signer_private_key.verify_key

       # Generate another 32-byte private key (recipient)
       recipient_private_key = nacl.public.PrivateKey.generate()
       recipient_public_key = recipient_private_key.public_key

        # Convert the keys to bytes (32 bytes each)
       signer_private_key_bytes = signer_private_key.encode()
       signer_public_key_bytes = signer_public_key.encode()
       recipient_public_key_bytes = recipient_public_key.encode()

        # Print the keys in hexadecimal format
       print("Signer Private Key (32 bytes):", signer_private_key_bytes.hex())
       print("Signer Public Key (32 bytes):", signer_public_key_bytes.hex())
       print("Recipient Public Key (32 bytes):", recipient_public_key_bytes.hex())

       return signer_private_key_bytes, signer_public_key_bytes, recipient_public_key_bytes
