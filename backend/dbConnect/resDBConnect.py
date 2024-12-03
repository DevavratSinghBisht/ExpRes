import requests
import json

class ResDBConnect:
    def __init__(self, transaction_id=None):
        self.transaction_id = transaction_id
        self.url = "https://cloud.resilientdb.com/graphql"
        self.headers = {
            "Content-Type": "application/json"
        }

    def build_get_query_payload(self):
        if not self.transaction_id:
            raise ValueError("Transaction ID must be provided for getQuery.")
        return f"""
        query {{
          getTransaction(id: "{self.transaction_id}") {{
            id
            amount
            operation
            asset
            publicKey
            uri
            type
            signerPublicKey
          }}
        }}
        """

    def build_post_query_payload(self, operation, amount, signer_public_key,
                                 signer_private_key, recipient_public_key, asset_data):
        return f"""
        mutation {{
          postTransaction(data: {{
            operation: "{operation}",
            amount: {amount},
            signerPublicKey: "{signer_public_key}",
            signerPrivateKey: "{signer_private_key}",
            recipientPublicKey: "{recipient_public_key}",
            asset: "{json.dumps(asset_data)}"
          }}) {{
            id
          }}
        }}
        """

    def execute(self, query):
        payload = {"query": query}
        response = requests.post(self.url, json=payload, headers=self.headers)

        if response.status_code == 200:
            return response.json().get("data")
        else:
            raise Exception(f"Query failed with status code {response.status_code}: "
                            f"{response.text}")



