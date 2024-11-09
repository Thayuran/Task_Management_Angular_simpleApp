using Microsoft.IdentityModel.Tokens;
using System.Drawing.Imaging;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagement.DTO;
using TaskManagement.Model;
using TaskManagement.Repository;

namespace TaskManagement.Services
{
    public class UserService:IUserService
    {

        private readonly IConfiguration _configuration;
        private readonly IUserCredentialRepository _credentialRepository;

        public UserService(IConfiguration configuration, IUserCredentialRepository userCredentialRepository)
        {

            _configuration = configuration;
            _credentialRepository = userCredentialRepository;
        }

        public async Task<TokenModel> AddRegister(UserCredentialsDTO userCredentialsDTO)
        {
            var user = new UserCredentials
            {
                FullName = userCredentialsDTO.FullName,
                Email = userCredentialsDTO.Email,
                Role = userCredentialsDTO.Role,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userCredentialsDTO.Password)
            };
            var newuser = await _credentialRepository.AddUser(user);
            var token = CreateToken(newuser);
            return token;
        }

        private TokenModel CreateToken(UserCredentials user)
        {
            var claimlist = new List<Claim>();

            claimlist.Add(new Claim("UserID", user.Id.ToString()));
            claimlist.Add(new Claim("Name", user.FullName));
            claimlist.Add(new Claim("Email", user.Email));
            claimlist.Add(new Claim("Role", user.Role.ToString()));


            var key = _configuration["Jwt:Key"];
            var secKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credential = new SigningCredentials(secKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credential);

            var tokenstring = new JwtSecurityTokenHandler().WriteToken(token);
            var response = new TokenModel();
            response.Token = tokenstring;

            return response;
        }


        public async Task<TokenModel> LoginUser(string email, string password)
        {
            var user = await _credentialRepository.GetUserByEmail(email);
            if (user == null)
            {
                throw new Exception("user not found");
            }
            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                throw new Exception("wrong password");
            }
            return CreateToken(user);
        }
    }
}
