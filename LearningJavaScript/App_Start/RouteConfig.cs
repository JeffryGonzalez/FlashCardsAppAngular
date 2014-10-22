using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace LearningJavaScript
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("flashcards-manifest",
                "flashcards/manifest",
                new { controller = "Apps", action = "Manifest", fileName = "flashcards.txt" }
                );


            // /jasmine/run/stuff
            routes.MapRoute(
                name: "JasmineRoute",
                url: "jasmine/run/{specName}",
                defaults: new { controller = "Jasmine", action = "Run", specName = "SpecRunner" }
                );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}