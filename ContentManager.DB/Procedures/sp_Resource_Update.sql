-- =============================================
-- Author: Marlon Fernandez
-- Create date: 2022-01-08
-- Description:	Update one resource by ResourceId
-- Updates:
-- Developer Name - Date - Description of the update
-- =============================================
CREATE PROCEDURE [dbo].[sp_Resource_Update]
	@resourceId INT,
	@title VARCHAR(500),
	@description VARCHAR(1000),
	@link VARCHAR(500),
	@imageUrl VARCHAR(500),
	@priority INT,
	@timeToFinish INT,
	@active BIT,
	@createdAt DATETIME,
	@errorCode VARCHAR(50) = '' OUTPUT,
	@errorLogId INT = 0 OUTPUT
AS
BEGIN TRY
	SET NOCOUNT ON
	SET @errorCode = ''
	SET @errorLogId = 0


	-- Local variables
	DECLARE @ProcedureName VARCHAR(100) = 'sp_Resource_Update'
	DECLARE @LogMessage TABLE(LogMessage VARCHAR(MAX), LogDate DATETIME)
	DECLARE @ErrorMsg VARCHAR(500)
	DECLARE @LocalTranStarted bit = 0
    

    INSERT INTO @LogMessage VALUES (@ProcedureName+' START', GETDATE())

	INSERT INTO @LogMessage VALUES ('ParameterList:', GETDATE())
	INSERT INTO @LogMessage VALUES ('@resourceId: ' + ISNULL(CAST(@resourceId AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('@title: ' + ISNULL(CAST(@title AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('@description: ' + ISNULL(CAST(@description AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('@link: ' + ISNULL(CAST(@link AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('@imageUrl: ' + ISNULL(CAST(@imageUrl AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('@priority: ' + ISNULL(CAST(@priority AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('@timeToFinish: ' + ISNULL(CAST(@timeToFinish AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('@active: ' + ISNULL(CAST(@active AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('@createdAt: ' + ISNULL(CAST(@createdAt AS VARCHAR), 'NULL'), GETDATE())
	INSERT INTO @LogMessage VALUES ('ProfileId: ' + ISNULL(CAST(0 AS VARCHAR), 'NULL'), GETDATE())
    


	----------------------------
	/* PRE-VALIDATION SECTION */
	----------------------------

	INSERT INTO @LogMessage VALUES ('[PRE-VAL] START', GETDATE());
	
	-- Place the data validation here --
	IF EXISTS(
    	SELECT 1
    	FROM dbo.Resource r
		WHERE r.Title = @title
		AND r.ResourceId != @resourceId
    ) BEGIN
		SET @errorCode = '401';
		INSERT INTO @LogMessage VALUES ('[ERROR] Resource already exist with this title', GETDATE());
		THROW 51000, 'Resource already exist with this title' , 1;
    END

	--------------------------------
	/* END PRE-VALIDATION SECTION */
	--------------------------------


	-- Begin Transaction to allow rollback
	IF @@TRANCOUNT = 0
	BEGIN
		BEGIN TRANSACTION @Procedurename 
		SET @LocalTranStarted = 1
	END

	UPDATE Resource 
	SET Title = @title
	   ,[Description] = @description
	   ,Resource_Link = @link
	   ,ImageUrl = @imageUrl
	   ,[Priority] = @priority
	   ,TimeToFinish = @timeToFinish
	   ,Active = @active
	   ,CreatedAt = @createdAt
	WHERE ResourceId = @resourceId;


	-- Commit transaction
	IF @LocalTranStarted = 1 and @@TRANCOUNT > 0	
	BEGIN
		COMMIT TRANSACTION @ProcedureName		
	END



	-- Return new resource created
	SELECT
		r.ResourceId
	   ,r.Title
	   ,r.[Description]
	   ,r.Resource_Link
	   ,r.ImageUrl
	   ,r.[Priority]
	   ,r.TimeToFinish
	   ,r.Active
	   ,r.CreatedAt
	FROM Resource r
	WHERE r.ResourceId = @resourceId

END TRY

BEGIN CATCH
	-- Rollback any changes if error occurs only when local transaction has occurred
	IF @LocalTranStarted = 1 and @@TRANCOUNT > 0
	BEGIN
		ROLLBACK TRANSACTION @ProcedureName
	END

	SET @ErrorMsg = 'STORED PROC ERROR'
	+ ' - PROC: ' + ISNULL(@ProcedureName, 'N/A')
	+ ' - LINE: ' + CAST(ISNULL(ERROR_LINE(), 0) AS VARCHAR(50))
	+ ' - MSG: ' + ERROR_MESSAGE()


	-- Write Error logs kept through SP
	INSERT INTO ErrorLog (ErrorMessage, ErrorDetail, StackTrace, ErrorDate)
		VALUES (@errorMsg, '', '', GETDATE())

	SELECT @errorLogId = SCOPE_IDENTITY()
	INSERT INTO ErrorLogTrace (ErrorLogId, TraceMessage, TraceDate)
		SELECT
			@errorLogId
		   ,LogMessage
		   ,LogDate
		FROM @LogMessage

	-- Set @errorCode to 1 to return failure to UI
	IF @errorCode = '' 
		SET @errorCode = '500';
END CATCH

