using FullStack.API.Data;
using FullStack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{
    [ApiController]
    // [Route("api/employees")] or
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly FullStackDBContext _fullStackDBContextt;
        public EmployeesController(FullStackDBContext fullStackDBContext)
        {
            _fullStackDBContextt = fullStackDBContext;

        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _fullStackDBContextt.Employees.ToListAsync();
            return Ok(employees);
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest)
        {
            employeeRequest.Id = Guid.NewGuid();
            await _fullStackDBContextt.Employees.AddAsync(employeeRequest);
            await _fullStackDBContextt.SaveChangesAsync();

            return Ok(employeeRequest);

        }

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
        {
            var employee =
                await _fullStackDBContextt.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id,Employee updateEmployeeRequest)
        {
            var employee = await _fullStackDBContextt.Employees.FindAsync(id);

            if(employee == null)
            {
                return NotFound();
            }
            employee.Name = updateEmployeeRequest.Name;
            employee.Email = updateEmployeeRequest.Email;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Department = updateEmployeeRequest.Department;

            await _fullStackDBContextt.SaveChangesAsync();

            return Ok(employee);
        }
        [HttpDelete]
        [Route("{id:Guid}")]

        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await _fullStackDBContextt.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            _fullStackDBContextt.Employees.Remove(employee);
            await _fullStackDBContextt.SaveChangesAsync();

            return Ok(employee);
        }


    }
}
