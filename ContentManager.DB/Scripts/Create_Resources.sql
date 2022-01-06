USE ContentManager
GO

INSERT INTO [Resource] (Title, Description, Link, ImageUrl, Priority, TimeToFinish, Active, CreatedAt)
	VALUES 
	 ('Title 1', 'Description 1', 'Link 1', 'Image URL 1', 1, 50, 1, GETDATE())
	,('Title 2', 'Description 2', 'Link 2', 'Image URL 2', 1, 120, 1, GETDATE())
	,('Title 3', 'Description 3', 'Link 3', 'Image URL 3', 1, 120, 1, GETDATE())
	,('Title 4', 'Description 4', 'Link 4', 'Image URL 4', 2, 100, 1, GETDATE())
	,('Title 5', 'Description 5', 'Link 5', 'Image URL 5', 2, 100, 1, GETDATE())
	,('Title 6', 'Description 6', 'Link 6', 'Image URL 6', 3, 10, 0, GETDATE())
	,('Title 7', 'Description 7', 'Link 7', 'Image URL 7', 4, 130, 1, GETDATE())
	,('Title 8', 'Description 8', 'Link 8', 'Image URL 8', 4, 120, 1, GETDATE())
	,('Title 9', 'Description 9', 'Link 9', 'Image URL 9', 4, 100, 0, GETDATE())
	,('Title 10', 'Description 10', 'Link 10', 'Image URL 10', 4, 120, 1, GETDATE())
	,('Title 11', 'Description 11', 'Link 11', 'Image URL 11', 4, 120, 1, GETDATE())
	,('Title 12', 'Description 12', 'Link 12', 'Image URL 12', 5, 120,1, GETDATE())