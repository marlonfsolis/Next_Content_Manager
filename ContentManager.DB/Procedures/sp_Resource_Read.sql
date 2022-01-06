-- =============================================
-- Author: Marlon Fernandez
-- Create date: 2022-01-06
-- Description:	Read list of resources
-- Updates:
-- Developer Name - Date - Description of the update
-- =============================================
CREATE PROCEDURE [dbo].[sp_Resource_ReadList]
	@offsetRows INT = 0,
	@fetchRows INT = 10,
	@errorCode INT = 0 OUTPUT,
	@errorLogId INT = 0 OUTPUT
AS
BEGIN TRY
	
	-- Test Data
	--DECLARE @offsetRows INT = 0
	--	   ,@fetchRows INT = 10
	--	   ,@errorCode INT = 0
	--	   ,@errorLogId INT = 0	
	
	
	SET NOCOUNT ON
	SET @errorCode = 0
	SET @errorLogId = 0


	-- Local variables
	DECLARE @ProcedureName VARCHAR(100) = 'sp_Resource_ReadList'
	DECLARE @LogMessage TABLE(LogMessage VARCHAR(MAX), LogDate DATETIME)
	DECLARE @ErrorMsg VARCHAR(500)
	DECLARE @LocalTranStarted bit = 0

    INSERT INTO @LogMessage VALUES (@ProcedureName+' START', GETDATE())

	INSERT INTO @LogMessage VALUES ('ParameterList:' +
									'@offset: ' + ISNULL(CAST(@offsetRows AS VARCHAR), 'NULL') + ' || ' +
									'@limit: ' + ISNULL(CAST(@fetchRows AS VARCHAR), 'NULL') + ' || ' +
									'ProfileId: ' + ISNULL(CAST(0 AS VARCHAR), 'NULL')
									, GETDATE())


	----------------------------
	/* PRE-VALIDATION SECTION */
	----------------------------

	INSERT INTO @LogMessage VALUES ('[PRE-VAL] START', GETDATE());

	IF @offsetRows < 0
		OR @fetchRows < 0
	BEGIN
		SET @errorCode = 2
		;THROW 51000, 'The params offsetRows and fetchRows cannot be negative.', 1;
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
    

	-- Fetch all rows
	IF @fetchRows = 0 BEGIN  
    	SELECT @fetchRows = COUNT(1) FROM [Resource] r
    END

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
	FROM [Resource] r
	ORDER BY r.ResourceId
	OFFSET @offsetRows ROWS
	FETCH NEXT @fetchRows ROWS ONLY
	


	-- Commint transaction
	IF @LocalTranStarted = 1 and @@TRANCOUNT > 0	
	BEGIN
		COMMIT TRANSACTION @ProcedureName		
	END


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
	INSERT INTO ErrorLog (ErrorMessage, ErrorDetails, StackTrace, ErrorDate)
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
