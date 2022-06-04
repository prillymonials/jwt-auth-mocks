export default {
  secret: "mySecretKey",
  // jwtExpiration: 3600,         // 1 hour
  // jwtRefreshExpiration: 86400, // 24 hours

  /* for development */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes

  /* for test */
  jwtExpiration: 150,          // 2.5 minutes
  jwtRefreshExpiration: 300,   // 5 minutes
};
