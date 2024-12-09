from model.resDBReq.assetData import AssetData

from dbConnect.resDBConnect import ResDBConnect
from dbConnect.mongoConnect import MongoConnect
from utils.cryptographyUtils import generate_keys
import ast

class ResDBQueries:
    def __init__(self):
        self.resDBConnect = ResDBConnect()
        self.mongoConnect = MongoConnect()


    def saveMessageinResDB(self, message : str, sender_username: str,
                           recipient_username: str, transactionId: str):
        print("Entering ReSDB Code:")

        signer_private_key, signer_public_key, recipient_public_key = generate_keys()
        print(transactionId)
        if transactionId == "Missing":
           print("building new asset data")
           asset_data = AssetData(transactionId=transactionId, sender_username=sender_username,
                                  receiver_username=recipient_username, content = message)
           query = self.resDBConnect.build_post_query_payload("CREATE", 1, signer_public_key, signer_private_key,
                                                              recipient_public_key, asset_data)
        else:
            print("querying existing asset data")
            data = self.getMessageFromResDB(transactionId)
            # Extract the asset string
            asset_str = data["getTransaction"]["asset"]
            # Convert the string to a dictionary using ast.literal_eval() (safer than eval)
            asset_dict = ast.literal_eval(asset_str)
            print(asset_dict)
            query = self.resDBConnect.build_post_payload("CREATE", 1, signer_public_key, signer_private_key,
                                                           recipient_public_key, asset_dict)


        print("Query: ", query)
        data = self.resDBConnect.execute(query)
        print("Response: ", data)
        return data

    def getMessageFromResDB(self, transaction_id: str):
        query = (self.resDBConnect.build_get_query_payload(transaction_id))
        print("Query: ", query)
        data = self.resDBConnect.execute(query)
        print("Response: ", data)
        return data

    def savePostinResDB(self, message : str, sender_username: str):
        signer_private_key = "5R4ER6smR6c6fsWt3unPqP6Rhjepbn82Us7hoSj5ZYCc"
        signer_public_key = "8fPAqJvAFAkqGs8GdmDDrkHyR7hHsscVjes39TVVfN54"
        recipient_public_key = "ECJksQuF9UWi3DPCYvQqJPjF6BqSbXrnDiXUjdiVvkyH"

        asset_data = AssetData(transactionId = "Missing", sender_username = sender_username,
                               receiver_username = "Missing", content = message)

        query = self.resDBConnect.build_post_query_payload("CREATE",
                                                           1, signer_public_key, signer_private_key,
                                                           recipient_public_key, asset_data)
        print ("Query: ", query)
        data = self.resDBConnect.execute(query)
        print("Response: ", data)
        return data






