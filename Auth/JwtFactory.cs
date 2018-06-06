using System;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.Extensions.Options;
using IcarufyGardenManager.Models;
using System.Collections.Generic;

namespace IcarufyGardenManager.Auth
{
    public class JwtFactory : IJwtFactory
    {
        private readonly JwtIssuerOptions _jwtOptions;

        public JwtFactory(IOptions<JwtIssuerOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
            ThrowIfInvalidOptions(_jwtOptions);
        }

        /// <summary>
        /// Generate an identity and the claims this user has based on the username and Id. 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="id"></param>
        /// <returns>ClaimsIdentity with valid claims for this user</returns>
        public ClaimsIdentity GenerateClaimsIdentity(string userName, string id)
        {
            // This list may change based on userName / id and accessing identity entity information.
            // For now, everyone is an ApiUser
            var validRoles = new List<String> { "ApiUser" };

            // create the claims - add the id, then all valid roles
            var claims = new List<Claim> { new Claim("id", id) };
            foreach (var role in validRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            
            // Give all users access to the API endpoints.
            return new ClaimsIdentity(new GenericIdentity(userName, "Token"), claims);
        }

        /// <summary>
        /// Create an encoded token using inject JwtOptions object, username, and any claims in the provided ClaimsIdentity
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="identity"></param>
        /// <returns>A generated Json Web Token with claims encoded</returns>
        public async Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity)
        {
            var claims = new List<Claim>
            {
                 new Claim(JwtRegisteredClaimNames.Sub, userName),
                 new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
                 new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),    
             };

            // Add all the claims in the supplied identity (this should be id, and any roles)
            foreach (var claim in identity.Claims)
            {
                claims.Add(claim);
            }

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: claims,
                notBefore: _jwtOptions.NotBefore,
                expires: _jwtOptions.Expiration,
                signingCredentials: _jwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }



        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private static long ToUnixEpochDate(DateTime date)
          => (long)Math.Round((date.ToUniversalTime() -
                               new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                              .TotalSeconds);

        private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }
    }
}
