INSERT INTO "public"."user" ("id", "username", "password", "name", "lastname") VALUES
  (1, 'test', '$2b$04$D6gWXJXjX9I6J5XDhuPPqOJiFsXfzHZTo1Z2B1Mxz73q0xhv23Dai', 'Test1', 'User1'),
  (2, 'test2', '$2b$04$OoQwUe44xNYOB9Vd9.vJ/u5ZU7jSbR2npeodE.wfwMrYdy8qBB2ZK', 'Test2', 'User2');

SELECT setval('user_id_seq', 2, true);

INSERT INTO "public"."message" ("id", "content", "user_id") VALUES
  (1, 'This is a test message', 1),
  (2, 'Hello everyone!', 1),
  (3, 'How are you?', 2),
  (4, 'I am fine, thank you! How about you?', 1),
  (5, 'I am good, nice to meet you', 2);

SELECT setval('message_id_seq', 5, true);