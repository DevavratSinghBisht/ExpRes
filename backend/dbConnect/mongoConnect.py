from pymongo import MongoClient
from datetime import datetime

from sympy.codegen.fnodes import use_rename

from model.request import UserRegReq, UserLoginReq, UserInfoReq


class MongoConnect:
    
    def __init__(self, db_url="mongodb://localhost:27017/", db_name="social_media", username="root", password="root"):
        # Include username and password in MongoClient
        self.client = MongoClient(db_url, username=username, password=password)
        self.db = self.client[db_name]
        self.users = self.db["users"]
        self.posts = self.db["posts"]

    # Create a User Profile
    def registerUser(self, req: UserRegReq):
        
        user = req.model_dump()
        try:
            del user['password2']
        except:
            pass
        user["username"] = UserRegReq.username
        user["email"] = UserRegReq.email
        user["firstName"] = UserRegReq.firstName
        user["lastName"] = UserRegReq.lastName
        user["dateOfBirth"] = UserRegReq.dateOfBirth
        user["contactNo"] = UserRegReq.contactNo
        user["email"] = UserRegReq.email
        user["password"] = UserRegReq.password
        user["password2"] = UserRegReq.password2
        user["profilePicture"] = UserRegReq.profilePicture
        user["created_at"] = datetime.now(datetime.timezone.utc)
        user["last_login_at"] = datetime.now(datetime.timezone.utc)
        user["visibility"] = False
        user["followers"] = []
        user["following"] = []
        result = self.users.insert_one(user)
        print(f"User created with ID: {result.inserted_id}")
   
    # Validate User During Login
    def loginUser(self, req: UserLoginReq):
        user = self.users.find_one({"username": req.username})
        if not user:
            print("Invalid username.")
            return False
        # Check the hashed password
        if user["password"] == req.password:
            print("Login successful!")
            return True
        else:
            print("Invalid password.")
            return False

    # Create a Post
    def createPost(self, username, content):
        user = self.users.find_one({"username": username})
        if not user:
            print(f"User {username} not found.")
            return
        post = {
            "username": user["username"],
            "content": content,
            "likes": 0,
            "comments": [],
            "created_at": datetime.now(datetime.timezone.utc)
        }
        result = self.posts.insert_one(post)
        print(f"Post created with ID: {result.inserted_id}")

    # Like a Post
    def likePost(self, post_id):
        post = self.posts.find_one({"_id": post_id})
        if not post:
            print(f"Post with ID {post_id} not found.")
            return
        self.posts.update_one({"_id": post_id}, {"$inc": {"likes": 1}})
        print(f"Post {post_id} liked!")

    # Add a Comment to a Post
    def addComment(self, post_id, username, comment_text):
        comment = {
            "username": username,
            "text": comment_text,
            "created_at": datetime.utcnow()
        }
        result = self.posts.update_one({"_id": post_id}, {"$push": {"comments": comment}})
        if result.modified_count:
            print(f"Comment added to post {post_id}.")
        else:
            print(f"Failed to add comment. Post {post_id} not found.")

    # Follow a User
    def followUser(self, follower_username, followee_username):
        follower = self.users.find_one({"username": follower_username})
        followee = self.users.find_one({"username": followee_username})

        if not follower or not followee:
            print(f"Follower or Followee user not found.")
            return

        # Update follower's "following" list
        self.users.update_one(
            {"_id": follower["_id"]},
            {"$addToSet": {"following": followee["_id"]}}
        )

        # Update followee's "followers" list
        self.users.update_one(
            {"_id": followee["_id"]},
            {"$addToSet": {"followers": follower["_id"]}}
        )

        print(f"{follower_username} is now following {followee_username}.")

    # View a Post
    def viewPost(self, post_id):
        post = self.posts.find_one({"_id": post_id})
        if not post:
            print(f"Post with ID {post_id} not found.")
            return
        user = self.users.find_one({"_id": post["user_id"]})
        print(f"Post by {user['username']}: {post['content']}")
        print(f"Likes: {post['likes']}")
        print(f"Comments:")
        for comment in post["comments"]:
            print(f"- {comment['username']}: {comment['text']}")

    def getUserPosts(self, username):
        user = self.users.find_one({"username": username})
        if not user:
            print(f"User {username} not found.")
            return
        
        user_posts = self.posts.find({"user_id": user["_id"]})
        print(f"Posts by {username}:")
        for post in user_posts:
            print(f"- ID: {post['_id']} | Content: {post['content']} | Likes: {post['likes']}")
        return user_posts

    def getUserInfo(self, req: UserInfoReq):
        user = self.users.find_one({"username": req.username})
        print(user)
        return user

    def getUserFollowers(self, username):
        user = self.users.find_one({"username": username})
        if not user:
            print(f"User {username} not found.")
            return
        user_followers = user["followers"]
        print(f"Followers by {username}:")
        for follower in user_followers:
            print(f"- username: {follower['username']}")
        return user_followers

    def makeUserFollower(self, receiver_username, sender_username):
        sender = self.users.find_one({"username": sender_username})
        if not sender:
            print(f"User {sender} not found.")
            return
        receiver = self.users.find_one({"username": receiver_username})
        if not receiver :
            print(f"User {receiver_username} not found.")
            return
        self.users.update_one(
            {"username": sender_username},  # Find the sender by username
            {"$addToSet": {"followers": receiver_username}}  # Add to followers list if not already present
        )
        print(f"{receiver_username} added as a follower to {sender_username}.")

        self.users.update_one(
            {"username": receiver_username},  # Find the reciever by username
            {"$addToSet": {"following": sender_username}}
        )

        print(f"{sender_username} started following {receiver_username}.")