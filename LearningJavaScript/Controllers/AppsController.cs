using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LearningJavaScript.Controllers
{
    public class AppsController : Controller
    {
        public ActionResult SimpleCalculator()
        {
            return View();
        }

        public ActionResult TemperatureConverter()
        {
            return View();
        }

        public ActionResult Demo1()
        {
            return View();
        }

        public ActionResult Employees()
        {
            return View();
        }

        public ActionResult AngularDemo()
        {
            return View();
        }

        public ActionResult FlashCards()
        {
            return View();
        }

        public ActionResult IndexedDbDemo()
        {
            return View();
        }

        public FileResult Manifest(string fileName)
        {
            return File("/" + fileName, "text/cache-manifest");
        }
    }
}
