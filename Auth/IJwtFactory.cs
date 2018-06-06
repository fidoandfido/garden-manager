using System.Security.Claims;
using System.Threading.Tasks;

namespace IcarufyGardenManager.Auth
{
    public interface IJwtFactory
    {
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);
    }
}
