# set temporary access token from result of https://api.tink.com/api/v1/oauth/token
TINK_MOCK_BANK_TEMPORARY_ACCESS_TOKEN="eyJhbGciOiJFUzI1NiIsImtpZCI6IjFhNzY5MGYzLTAwNjEtNGUxMy1hYzJiLTU0YjZlY2E5Yjc0MCIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY4MjAwMDAsImlhdCI6MTY3NjgxMjgwMCwiaXNzIjoidGluazovL2F1dGgiLCJqdGkiOiIyNTdlY2M3Yi1hNmU4LTRiOTMtOTYzOS1mMDBlY2FkMTViMTciLCJvcmlnaW4iOiJtYWluIiwic2NvcGVzIjpbImFjY291bnRzOnJlYWQiLCJiYWxhbmNlczpyZWFkIiwidHJhbnNhY3Rpb25zOnJlYWQiXSwic3ViIjoidGluazovL2F1dGgvdXNlci80YjA5ZjIwZDdmY2Y0ZGE5OTc4M2U5NmIxZGI5ZTlmMSIsInRpbms6Ly9hcHAvaWQiOiJlZjY2NjA4MzVmNjc0MzNmOTUxNjAwZmM5MmQwZWFjNyIsInRpbms6Ly9hcHAvdmVyaWZpZWQiOiJmYWxzZSJ9.brL7t1Vx4MtMC41QbrbpRKiCOCRbs1nW2tzO7BdnAkPfDofrYTpEL3m19M5oGnqzQ7eVEL_UPUETcjrdgjNMog"

curl -v https://api.tink.com/data/v2/accounts \
    -H "Authorization: Bearer ${TINK_MOCK_BANK_TEMPORARY_ACCESS_TOKEN}"