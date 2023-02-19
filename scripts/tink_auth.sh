# get auth token from code
# generate new code using link below:
# https://link.tink.com/1.0/transactions/connect-accounts/?client_id=e510fbadcd714f7ca5ef141d4923f6c1&redirect_uri=https%3A%2F%2Fconsole.tink.com%2Fcallback&market=GB&locale=en_US
TINK_MOCK_BANK_ONE_TIME_AUTH_CODE="c4a1fdeb26614182850ff0fcfc6977b6"

curl -v https://api.tink.com/api/v1/oauth/token \
    -d "code=${TINK_MOCK_BANK_ONE_TIME_AUTH_CODE}" \
    -d "client_id=${TINK_CLIENT_ID}" \
    -d "client_secret=${TINK_CLIENT_SECRET}" \
    -d "grant_type=authorization_code"
