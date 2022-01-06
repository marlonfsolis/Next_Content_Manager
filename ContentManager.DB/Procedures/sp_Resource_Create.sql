CREATE PROCEDURE [dbo].[sp_Resource_Create]
	@title VARCHAR(500),
	@description VARCHAR(1000),
	@link VARCHAR(500),
	@imageUrl VARCHAR(500),
	@priority INT,
	@timeToFinish INT,
	@active BIT,
	@createdAt DATETIME
AS
BEGIN TRY
    DECLARE @ProcedureName VARCHAR(100) = 'sp_Resource_Create'
	DECLARE @ErrorMsg VARCHAR(500)
    
	IF EXISTS(
    	SELECT 1
    	FROM dbo.Resource r
		WHERE r.Title = @title
    ) BEGIN
		;THROW 51000, 'Resource already exist' , 1;
    END

	INSERT INTO Resource (Title, Description, Link, ImageUrl, Priority, TimeToFinish, Active, CreatedAt)
	VALUES (@title, @description, @link, @imageUrl, @priority, @timeToFinish, @active, @createdAt);
END TRY

BEGIN CATCH
    SET @ErrorMsg = 'STORED PROC ERROR'
	+ ' - PROC: ' + ISNULL(@ProcedureName, 'N/A')
	+ ' - LINE: ' + CAST(ISNULL(ERROR_LINE(), 0) as varchar)
	+ ' - MSG: ' + ERROR_MESSAGE()

		INSERT INTO ErrorLog (ErrorMessage, ErrorDetails, ErrorDate)
	VALUES (@ErrorMsg, '', GETDATE());
END CATCH
