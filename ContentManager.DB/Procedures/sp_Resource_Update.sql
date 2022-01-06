CREATE PROCEDURE [dbo].[sp_Resource_Update]
	@resourceId INT,
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
    DECLARE @ProcedureName VARCHAR(100) = 'sp_Resource_Update'
	DECLARE @ErrorMsg VARCHAR(500)
    
	IF EXISTS(
    	SELECT 1
    	FROM dbo.Resource r
		WHERE r.Title = @title
		AND r.ResourceId != @resourceId
    ) BEGIN
		;THROW 51000, 'Resource already exist with this title' , 1;
    END

	UPDATE Resource 
	SET Title = @title
	   ,Description = @description
	   ,Link = @link
	   ,ImageUrl = @imageUrl
	   ,Priority = @priority
	   ,TimeToFinish = @timeToFinish
	   ,Active = @active
	   ,CreatedAt = @createdAt
	WHERE ResourceId = @resourceId;

END TRY

BEGIN CATCH
    SET @ErrorMsg = 'STORED PROC ERROR'
	+ ' - PROC: ' + ISNULL(@ProcedureName, 'N/A')
	+ ' - LINE: ' + CAST(ISNULL(ERROR_LINE(), 0) as varchar)
	+ ' - MSG: ' + ERROR_MESSAGE()

		INSERT INTO ErrorLog (ErrorMessage, ErrorDetails, ErrorDate)
	VALUES (@ErrorMsg, '', GETDATE());
END CATCH

