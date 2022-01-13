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
	@filterJson VARCHAR(MAX),
	@searchJson VARCHAR(MAX),
	@errorCode INT = 0 OUTPUT,
	@errorLogId INT = 0 OUTPUT
AS
BEGIN TRY
	
	---- Test Data
	--DECLARE @offsetRows INT = 0
	--	   ,@fetchRows INT = 10
	--	   ,@filterJson VARCHAR(MAX) = '{
	--			"priority": "4"
	--	   }'
	--	   ,@searchJson VARCHAR(MAX) = '{
	--			"title": "%1%"
	--	   }'
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
									'@filterJson: ' + ISNULL(CAST(@filterJson AS VARCHAR), 'NULL') + ' || ' +
									'@searchJson: ' + ISNULL(CAST(@searchJson AS VARCHAR), 'NULL') + ' || ' +
									'ProfileId: ' + ISNULL(CAST(0 AS VARCHAR), 'NULL')
									, GETDATE())


	----------------------------
	/* PRE-VALIDATION SECTION */
	----------------------------

	INSERT INTO @LogMessage VALUES ('[PRE-VAL] START', GETDATE());
	SET @errorCode = 2

	IF @offsetRows < 0
		OR @fetchRows < 0
	BEGIN
		;THROW 51000, 'The params offsetRows and fetchRows cannot be negative.', 1;
	END

	IF ISNULL(@filterJson,'') != ''
		AND ISJSON(@filterJson) = 0
	BEGIN
		;
		THROW 51000, 'The filterJson param is not a valid JSON.', 1;
	END

	IF ISNULL(@searchJson,'') != '' 
		AND ISJSON(@filterJson) = 0 
	BEGIN  
		;THROW 51000, 'The searchJson param is not a valid JSON.' , 1;
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


	-- Get the values to filter on
	DECLARE @title_filter VARCHAR(500)
		   ,@description_filter VARCHAR(1000)
		   ,@link_filter VARCHAR(500)
		   ,@imageUrl_filter VARCHAR(500)
		   ,@priority_filter INT
		   ,@timeToFinish_filter INT
		   ,@active_filter BIT
		   ,@createdAt_filter DATETIME
   SELECT
	   @title_filter = JSON_VALUE(@filterJson, '$.title')
	  ,@description_filter = JSON_VALUE(@filterJson, '$.description')
	  ,@link_filter = JSON_VALUE(@filterJson, '$.link')
	  ,@imageUrl_filter = JSON_VALUE(@filterJson, '$.imageUrl')
	  ,@priority_filter = JSON_VALUE(@filterJson, '$.priority')
	  ,@timeToFinish_filter = JSON_VALUE(@filterJson, '$.timeToFinish')
	  ,@active_filter = JSON_VALUE(@filterJson, '$.active')
	  ,@createdAt_filter = JSON_VALUE(@filterJson, '$.createdAt')


	-- Get the values to search on
	DECLARE @title_search VARCHAR(500)
		   ,@description_search VARCHAR(1000)
		   ,@link_search VARCHAR(500)
		   ,@imageUrl_search VARCHAR(500)
		   ,@priority_search INT
		   ,@timeToFinish_search INT
		   ,@active_search BIT
		   ,@createdAt_search DATETIME
   SELECT
	   @title_search = JSON_VALUE(@searchJson, '$.title')
	  ,@description_search = JSON_VALUE(@searchJson, '$.description')
	  ,@link_search = JSON_VALUE(@searchJson, '$.link')
	  ,@imageUrl_search = JSON_VALUE(@searchJson, '$.imageUrl')
	  ,@priority_search = JSON_VALUE(@searchJson, '$.priority')
	  ,@timeToFinish_search = JSON_VALUE(@searchJson, '$.timeToFinish')
	  ,@active_search = JSON_VALUE(@searchJson, '$.active')
	  ,@createdAt_search = JSON_VALUE(@searchJson, '$.createdAt')


	-- Get the final result
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

	-- filter
	WHERE (@title_filter IS NULL OR r.Title = @title_filter)
	AND (@description_filter IS NULL OR r.Description = @description_filter)
	AND (@link_filter IS NULL OR r.Link = @link_filter)
	AND (@imageUrl_filter IS NULL OR r.ImageUrl = @imageUrl_filter)
	AND (@priority_filter IS NULL OR r.Priority = @priority_filter)
	AND (@timeToFinish_filter IS NULL OR r.TimeToFinish = @timeToFinish_filter)
	AND (@active_filter IS NULL OR r.Active = @active_filter)
	AND (@createdAt_filter IS NULL OR r.CreatedAt = @createdAt_filter)

	-- search
	AND (@title_search IS NULL OR r.Title LIKE @title_search)
	AND (@description_search IS NULL OR r.Description LIKE @description_search)
	AND (@link_search IS NULL OR r.Link LIKE @link_search)
	AND (@imageUrl_search IS NULL OR r.ImageUrl LIKE @imageUrl_search)
	AND (@priority_search IS NULL OR r.Priority LIKE @priority_search)
	AND (@timeToFinish_search IS NULL OR r.TimeToFinish LIKE @timeToFinish_search)
	AND (@active_search IS NULL OR r.Active LIKE @active_search)
	AND (@createdAt_search IS NULL OR r.CreatedAt LIKE @createdAt_search)

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
