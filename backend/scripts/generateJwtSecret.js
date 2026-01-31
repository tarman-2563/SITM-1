const crypto = require('crypto');

// Generate a cryptographically secure random JWT secret
const generateJwtSecret = () => {
  // Generate 64 bytes (512 bits) of random data and convert to hex
  const secret = crypto.randomBytes(64).toString('hex');
  return secret;
};

// Generate multiple options
console.log('🔐 Generated JWT Secrets (choose one):');
console.log('');

for (let i = 1; i <= 3; i++) {
  const secret = generateJwtSecret();
  console.log(`Option ${i}:`);
  console.log(`JWT_SECRET=${secret}`);
  console.log('');
}

console.log('📝 Instructions:');
console.log('1. Copy one of the JWT_SECRET values above');
console.log('2. Replace the current JWT_SECRET in your .env file');
console.log('3. Keep this secret secure and never commit it to version control');
console.log('4. Use different secrets for development, staging, and production');

// Also show the current weak secret for comparison
console.log('');
console.log('⚠️  Current weak secret:');
console.log('JWT_SECRET=sitm_jwt_secret_key_2024_secure_random_string');
console.log('');
console.log('✅ Replace with one of the secure secrets above');