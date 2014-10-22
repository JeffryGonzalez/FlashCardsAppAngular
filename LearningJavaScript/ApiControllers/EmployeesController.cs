using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace LearningJavaScript.ApiControllers
{
    public class EmployeesController : ApiController
    {
        public IEnumerable<Employee> Get()
        {
            Thread.Sleep(2000);
            return new EmployeeLookups().All();
        }

        public Employee Get(int id)
        {
            var lookup = new EmployeeLookups();
            try
            {
                return lookup.GetById(id);
            }
            catch (EmployeeNotFoundException)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

    }


    public class EmployeeLookups
    {
        private Dictionary<int, Employee> Employees = new Dictionary<int, Employee>
        {
            { 1, new Employee { Id=1, Name="Bob Smith", Salary= 23000M }},
            { 2, new Employee { Id=2, Name="Jane Doe", Salary= 180000M }},
            { 3, new Employee { Id=3, Name="Steve Sawhill", Salary= 82000 }}
        };

        public IEnumerable<Employee> All()
        {
            return Employees.Values;
        }

        public Employee GetById(int id)
        {
            if (Employees.ContainsKey(id))
            {
                return Employees[id];
            }
            throw new EmployeeNotFoundException();
        }

    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
    }
}
