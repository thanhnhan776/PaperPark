delete from Model_Tag_Mapping
go

delete from model
go

dbcc checkident ('model', reseed, 0)
go
