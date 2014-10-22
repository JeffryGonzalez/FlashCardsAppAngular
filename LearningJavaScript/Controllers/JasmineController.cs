using System;
using System.Web.Mvc;

namespace LearningJavaScript.Controllers
{
    public class JasmineController : Controller
    {
        [HttpGet]
        // /jasmine/run/stuff
        public ViewResult Run(string specName)
        {
            return View(specName);
        }
    }
}
