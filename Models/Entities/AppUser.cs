
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace IcarufyGardenManager.Models.Entities
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        //public virtual ICollection<GardenBedOwners> GardenBeds { get; set; }

    }
}
