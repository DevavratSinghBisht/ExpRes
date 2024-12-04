from utils.cryptographyUtils import get_encoding
from utils.cryptographyUtils import generate_keys
from model.resDBReq.assetData import AssetData

from dbConnect.resDBConnect import ResDBConnect
from dbConnect.mongoConnect import MongoConnect

class ResDBQueries:
    def __init__(self):
        self.resDBConnect = ResDBConnect()
        self.mongoConnect = MongoConnect()

    def saveMessageinResDB(self, message : str, sender_username: str,
                           transactionId: str, recipient_username: str):

        signer_private_key, signer_public_key = generate_keys()
        recipient_public_key = get_encoding(signer_public_key)
        asset_data = AssetData()

        if message.isForwarded:
           AssetData.transaction_id = self.mongoConnect.getPostFromMongo(message)


        query = self.resDBConnect.build_post_query_payload("SaveMessageInResDB",
                      50, signer_public_key,signer_private_key,
                      recipient_public_key, asset_data)
        data = self.resDBConnect.execute(query)

        return data

    def getMessageFromResDB(self, transaction_id: str):
        query = (self.resDBConnect.
                 build_get_query_payload("GetMessageFromResDB",transaction_id))
        data = self.resDBConnect.execute(query)
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






