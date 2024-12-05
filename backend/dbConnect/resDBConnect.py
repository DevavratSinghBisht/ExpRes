import requests
import json

class ResDBConnect:
    def __init__(self, transaction_id=None):
        self.url = "https://cloud.resilientdb.com/graphql"
        self.headers = {
            "Content-Type": "application/json"
        }

    def build_get_query_payload(self, transaction_id: str):
        if not transaction_id:
            raise ValueError("Transaction ID must be provided for getQuery.")
        return f"""
        query {{
          getTransaction(id: "{transaction_id}") {{
            id
            asset
          }}
        }}
        """

    def build_post_query_payload(self, operation, amount, signer_public_key,
                                 signer_private_key, recipient_public_key, asset_data):
        # Wrap the asset data in the 'data' key
        serialized_data = {
            "data": asset_data.dict()  # .dict() converts the model to a dictionary
        }

        # Wrap the asset data in triple quotes and escape inner quotes
        asset_data_with_quotes = f'"""{serialized_data}"""'

        return f"""
        mutation {{
          postTransaction(data: {{
            operation: "{operation}",
            amount: {amount},
            signerPublicKey: "{signer_public_key}",
            signerPrivateKey: "{signer_private_key}",
            recipientPublicKey: "{recipient_public_key}",
            asset: {asset_data_with_quotes}
            }}) {{
            id
          }}
        }}
        """

    def build_post_payload(self, operation, amount, signer_public_key,
                                 signer_private_key, recipient_public_key, asset_data):

        # Wrap the asset data in triple quotes and escape inner quotes
        asset_data_with_quotes = f'"""{asset_data}"""'

        return f"""
        mutation {{
          postTransaction(data: {{
            operation: "{operation}",
            amount: {amount},
            signerPublicKey: "{signer_public_key}",
            signerPrivateKey: "{signer_private_key}",
            recipientPublicKey: "{recipient_public_key}",
            asset: {asset_data_with_quotes}
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



