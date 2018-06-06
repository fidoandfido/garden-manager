using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GardenManager.Controllers
{
    [Produces("application/json")]
    [Route("api/Data")]
    public class DataController : Controller
    {
        // GET: api/Data
        [HttpGet]
        public IEnumerable<dynamic> Get()
        {
            var returnData = new dynamic[] {
                new { Id = 1, value = "val1" },
                new { Id = 2, value = "val2" }
            };
            return returnData;
        }

        // GET: api/Data/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Data
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Data/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
