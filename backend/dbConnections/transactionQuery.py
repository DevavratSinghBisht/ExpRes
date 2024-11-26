import requests


class TransactionGetQuery:
    def __init__(self, transaction_id):
        self.transaction_id = transaction_id
        self.url = "https://cloud.resilientdb.com/graphql"
        self.headers = {
            "Content-Type": "application/json"
        }

    @property
    def query(self):
        # Generate the GraphQL query string with the provided transaction_id
        return f"""
        query {{
          getTransaction(id: "{self.transaction_id}") {{
            id
            version
            amount
            metadata
            operation
            asset
            publicKey
            uri
            type
            signerPublicKey
          }}
        }}
        """

    def execute(self):
        # Prepare the payload with the query
        payload = {
            "query": self.query
        }

        # Send the POST request to the GraphQL API
        response = requests.post(self.url, json=payload, headers=self.headers)

        # Check if the request was successful and return the data or error
        if response.status_code == 200:
            return response.json().get("data")
        else:
            raise Exception(f"Query failed with status code {response.status_code}: {response.text}")
