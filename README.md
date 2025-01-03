# chat-app-nhom14
### Data Schema for Chat Application
1. User
    user_id (Primary Key, UUID or Integer): Unique identifier for the user.
    username (String, Unique): The display name of the user.
    email (String, Unique): The email address of the user.
    password_hash (String): Hashed password for authentication.
    public_key (String): The user's public key for encryption.
    created_at (Timestamp): The date and time when the user was created.
    last_login (Timestamp): The date and time when the user last logged in.
    profile_picture_url (String, Optional): URL to the user's profile picture.
2. ChatRoom
    chatroom_id (Primary Key, UUID or Integer): Unique identifier for the chat room.
    name (String): The name of the chat room.
    created_at (Timestamp): The date and time when the chat room was created.
    created_by (Foreign Key, user_id): The user who created the chat room.
    is_private (Boolean): Indicates if the chat room is private or public.
    password (String, Optional): Password for private chat rooms (if applicable).
    encryption_enabled (Boolean): Indicates if encryption is enabled for the chat room.
    encryption_type (String): Specifies the encryption method used in the chat room.
3. ChatMessage
    message_id (Primary Key, UUID or Integer): Unique identifier for the chat message.
    chatroom_id (Foreign Key, chatroom_id): The chat room where the message was sent.
    user_id (Foreign Key, user_id): The user who sent the message.
    content (Text): The content of the message (could be plaintext or encrypted).
    timestamp (Timestamp): The date and time when the message was sent.
    is_deleted (Boolean): Indicates if the message has been deleted (soft delete).
    is_encrypted (Boolean): Indicates if the message content is encrypted.
    encryption_method (String): Specifies the encryption method used for the message.
4. UserChatRoom (Join Table for Many-to-Many Relationship)
    user_id (Foreign Key, user_id): The user who is a member of the chat room.
    chatroom_id (Foreign Key, chatroom_id): The chat room the user is a member of.
    joined_at (Timestamp): The date and time when the user joined the chat room.
### Feature
    User Management: Users can register, log in, and manage their profiles, including public keys for encryption.
    Chat Room Management: Users can create and join chat rooms, with options for public or private settings and encryption.
    Message Handling: Users can send and receive messages, with support for encrypted content and message deletion.
    Many-to-Many Relationships: The UserChatRoom table allows for flexible membership in multiple chat rooms.
    This schema provides a solid foundation for a chat application that implements the functionalities of the MessengerClient class, ensuring secure and efficient messaging capabilities. You can further expand this schema based on additional