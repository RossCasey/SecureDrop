-- Up
CREATE TABLE drops (
  id VARCHAR PRIMARY KEY,
  cipherText TEXT NOT NULL,
  claimed INTEGER DEFAULT 0,
  created DATETIME DEFAULT (strftime('%s', 'now')) 
);

-- Down
DROP TABLE drops;
