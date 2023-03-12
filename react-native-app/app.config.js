module.exports = {
    name: 'knightlife',
    version: '1.0.6',
    extra: {
        API_BASE_URL: process.env.API_BASE_URL || "/api",
        API_ACCESS_KEY: process.env.API_VERSION_ACCESS_KEY || "",
        OPEN_BANKING_PROVIDER: process.env.OPEN_BANKING_PROVIDER || "truelayer",
        OPEN_BANKING_USE_SANDBOX: process.env.OPEN_BANKING_USE_SANDBOX || "false"
    },
};