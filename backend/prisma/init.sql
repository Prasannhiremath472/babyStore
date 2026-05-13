-- LittleNest PostgreSQL initialization
-- This runs only on first Docker startup

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For fuzzy text search

-- Create indexes for performance (Prisma handles schema, this adds extra ones)
-- These will be applied after migrations run
