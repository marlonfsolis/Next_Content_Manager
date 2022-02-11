-- =============================================
-- Author: Marlon Fernandez
-- Create date: 2022-01-08
-- Description:	Create one resource
-- Updates:
-- Developer Name - Date - Description of the update
-- =============================================
CREATE PROCEDURE [dbo].[sp_Resource_Create]
	@title VARCHAR(500),
	@description VARCHAR(1000),
	@link VARCHAR(500),
	@imageUrl VARCHAR(500),
	@priority INT,
	@timeToFinish INT,
	@active BIT,
	@createdAt DATETIME,
	@errorCode INT = 0 OUTPUT,
	@errorLogId INT = 0 OUTPUT
AS
BEGIN TRY
	SET NOCOUNT ON
	SET @errorCode = 0
	SET @errorLogId = 0


	-- Local variables
	DECLARE @ProcedureName VARCHAR(100) = 'sp_Resource_Create'
	DECLARE @LogMessage TABLE(LogMessage VARCHAR(MAX), LogDate DATETIME)
	DECLARE @ErrorMsg VARCHAR(500)
	DECLARE @LocalTranStarted bit = 0
	DECLARE @newResource INT = 0


    INSERT INTO @LogMessage VALUES (@ProcedureName+' START', GETDATE())

	INSERT INTO @LogMessage VALUES ('ParameterList:' +
									'@title: ' + ISNULL(CAST(@title AS VARCHAR), 'NULL') + ' || ' +
									'@description: ' + ISNULL(CAST(@description AS VARCHAR), 'NULL') + ' || ' +
									'@link: ' + ISNULL(CAST(@link AS VARCHAR), 'NULL') + ' || ' +
									'@imageUrl: ' + ISNULL(CAST(@imageUrl AS VARCHAR), 'NULL') + ' || ' +
									'@priority: ' + ISNULL(CAST(@priority AS VARCHAR), 'NULL') + ' || ' +
									'@timeToFinish: ' + ISNULL(CAST(@timeToFinish AS VARCHAR), 'NULL') + ' || ' +
									'@active: ' + ISNULL(CAST(@active AS VARCHAR), 'NULL') + ' || ' +
									'@createdAt: ' + ISNULL(CAST(@createdAt AS VARCHAR), 'NULL') + ' || ' +
									'ProfileId: ' + ISNULL(CAST(0 AS VARCHAR), 'NULL')
									, GETDATE())
    

	----------------------------
	/* PRE-VALIDATION SECTION */
	----------------------------

	INSERT INTO @LogMessage VALUES ('[PRE-VAL] START', GETDATE());
	
	-- Place the data validation here --
	IF EXISTS(
    	SELECT 1
    	FROM dbo.Resource r
		WHERE r.Title = @title
    ) BEGIN
		;THROW 51000, 'Resource already exist with this title' , 1;
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


	INSERT INTO Resource (Title, Description, Link, ImageUrl, Priority, TimeToFinish, Active, CreatedAt)
	VALUES (@title, @description, @link, @imageUrl, @priority, @timeToFinish, @active, @createdAt);

	SELECT @newResource = SCOPE_IDENTITY()

	-- Commit transaction
	IF @LocalTranStarted = 1 and @@TRANCOUNT > 0	
	BEGIN
		COMMIT TRANSACTION @ProcedureName		
	END


	-- Return new resource created
	SELECT
		r.ResourceId
	   ,r.Title
	   ,r.Description
	   ,r.Link
	   ,r.ImageUrl
	   ,r.Priority
	   ,r.TimeToFinish
	   ,r.Active
	   ,r.CreatedAt
	FROM Resource r
	WHERE r.ResourceId = @newResource


	INSERT INTO @LogMessage VALUES (@ProcedureName+' END', GETDATE())

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
	IF @errorCode = 0 
		SET @errorCode = 1;
END CATCH
