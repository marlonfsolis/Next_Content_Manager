CREATE PROCEDURE [dbo].[sp_Resource_Delete]
	@resourceId INT
AS
BEGIN TRY
    DECLARE @ProcedureName VARCHAR(100) = 'sp_Resource_Delete'
	DECLARE @ErrorMsg VARCHAR(500)
		
	IF NOT EXISTS(SELECT 1 FROM Resource r WHERE r.ResourceId = @resourceId) 
	BEGIN  
		;THROW 51000, 'Resource not found' , 1;	
    END
    
	DELETE FROM Resource WHERE ResourceId = @resourceId
END TRY

BEGIN CATCH
	SET @ErrorMsg = 'STORED PROC ERROR'
	+ ' - PROC: ' + ISNULL(@ProcedureName, 'N/A')
	+ ' - LINE: ' + CAST(ISNULL(ERROR_LINE(), 0) AS VARCHAR)
	+ ' - MSG: ' + ERROR_MESSAGE()

	INSERT INTO ErrorLog (ErrorMessage, ErrorDetails, ErrorDate)
	VALUES (@ErrorMsg, '', GETDATE());

END CATCH
