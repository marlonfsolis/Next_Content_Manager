-- =============================================
-- Author: Marlon Fernandez
-- Create date: 2022-01-08
-- Description:	Delete one resource by ResourceId
-- Updates:
-- Developer Name - Date - Description of the update
-- =============================================
CREATE PROCEDURE [dbo].[sp_Resource_Delete]
	@resourceId INT = 0,
	@errorCode VARCHAR(50) = '' OUTPUT,
	@errorLogId INT = 0 OUTPUT
AS
BEGIN TRY
	SET NOCOUNT ON
	SET @errorCode = ''
	SET @errorLogId = 0

	-- Local variables
	DECLARE @ProcedureName VARCHAR(100) = 'sp_Resource_Delete'
	DECLARE @LogMessage TABLE(LogMessage VARCHAR(MAX), LogDate DATETIME)
	DECLARE @ErrorMsg VARCHAR(500)
	DECLARE @LocalTranStarted bit = 0

    INSERT INTO @LogMessage VALUES (@ProcedureName+' START', GETDATE())

	INSERT INTO @LogMessage VALUES ('ParameterList:' +
									'@resourceId: ' + ISNULL(CAST(@resourceId AS VARCHAR), 'NULL') + ' || ' +
									'ProfileId: ' + ISNULL(CAST(0 AS VARCHAR), 'NULL')
									, GETDATE())


	----------------------------
	/* PRE-VALIDATION SECTION */
	----------------------------

	INSERT INTO @LogMessage VALUES ('[PRE-VAL] START', GETDATE());
	
	-- Place the data validation here --
	IF NOT EXISTS(SELECT 1 FROM Resource r WHERE r.ResourceId = @resourceId) 
	BEGIN  
		SET @errorCode = '401';
		INSERT INTO @LogMessage VALUES ('[ERROR] Resource not found', GETDATE());
		THROW 51000, 'Resource not found' , 1;	
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


	-- Save the resource before delete to return later
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
	INTO #resource_save
	FROM Resource r
	WHERE r.ResourceId = @resourceId


	-- delete the resource
	DELETE FROM Resource WHERE ResourceId = @resourceId
	


	-- Commint transaction
	IF @LocalTranStarted = 1 and @@TRANCOUNT > 0	
	BEGIN
		COMMIT TRANSACTION @ProcedureName		
	END


	-- Return the resource
	SELECT
		rs.ResourceId
	   ,rs.Title
	   ,rs.Description
	   ,rs.Link
	   ,rs.ImageUrl
	   ,rs.Priority
	   ,rs.TimeToFinish
	   ,rs.Active
	   ,rs.CreatedAt
	FROM #resource_save rs


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
	IF @errorCode = '' 
		SET @errorCode = '500';

END CATCH
