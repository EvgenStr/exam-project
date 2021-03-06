CREATE TABLE IF NOT EXISTS "Catalogs"(
  "id" SERIAL PRIMARY KEY,
  "catalogName" VARCHAR(32) NOT NULL CHECK("catalogName" != ''),
  "userId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE,
  "chats" BIGINT [],
  UNIQUE ("catalogName", "userId")
);
CREATE TABLE IF NOT EXISTS "Conversations"(
  "id" BIGSERIAL PRIMARY KEY,
  "cusomerId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE,
  "creatorId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE CHECK ("creatorId" != "cusomerId"),
  "blackList" BOOLEAN [2] DEFAULT '{false, false}',
  "favoriteList" BOOLEAN [2] DEFAULT '{false, false}',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Messages"(
  "id" BIGSERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE,
  "body" VARCHAR(256) NOT NULL CHECK("body" != ''),
  "conversationId" BIGINT NOT NULL REFERENCES "Conversations" ("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE IF EXISTS "Catalogs" CASCADE;
-- DROP TABLE IF EXISTS "Conversations" CASCADE;
-- DROP TABLE IF EXISTS "Messages" CASCADE;
