SELECT TOP (1000)
      [id],
      [FirstName]
      ,[LastName]
      ,[Email]
      ,[UserName]
      ,[Password]
      ,[Token]
      ,[Role]
     
  FROM [FullStackDB].[dbo].[users]


ALTER TABLE users ADD id int NOT NULL;
ALTER TABLE users ADD PRIMARY KEY (id);

DROP TABLE users;


CREATE TABLE users (
    id int identity not null,
   FirstName char(255),
   LastName char(255),
    Email char(255),
    UserName char(255),
     Password char(255),
     Token char(255),
      Role char(255),
);


UPDATE TABLE users (
    id int identity not null,
	);