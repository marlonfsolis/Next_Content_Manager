CREATE TABLE [dbo].[ErrorLog]
(
	ErrorLogId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	ErrorMessage VARCHAR(MAX),
	ErrorDetails VARCHAR(MAX),
    StackTrace VARCHAR(MAX) NULL,
	ErrorDate DATETIME,
)
