CREATE TABLE Users (
    user_id CHAR(36) PRIMARY KEY,  -- Using CHAR(36) for UUID
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    public_key VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    profile_picture_url VARCHAR(255) NULL
);

CREATE TABLE ChatRooms (
    chatroom_id CHAR(36) PRIMARY KEY,  -- Using CHAR(36) for UUID
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by CHAR(36) NOT NULL,  -- Foreign key reference to Users
    is_private BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NULL,
    encryption_enabled BOOLEAN DEFAULT FALSE,
    encryption_type VARCHAR(50) NULL,
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE ChatMessages (
    message_id CHAR(36) PRIMARY KEY,  -- Using CHAR(36) for UUID
    chatroom_id CHAR(36) NOT NULL,  -- Foreign key reference to ChatRooms
    user_id CHAR(36) NOT NULL,  -- Foreign key reference to Users
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_encrypted BOOLEAN DEFAULT FALSE,
    encryption_method VARCHAR(50) NULL,
    FOREIGN KEY (chatroom_id) REFERENCES ChatRooms(chatroom_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE UserChatRoom (
    user_id CHAR(36) NOT NULL,  -- Foreign key reference to Users
    chatroom_id CHAR(36) NOT NULL,  -- Foreign key reference to ChatRooms
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, chatroom_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (chatroom_id) REFERENCES ChatRooms(chatroom_id) ON DELETE CASCADE
);