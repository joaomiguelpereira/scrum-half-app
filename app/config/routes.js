var routes = [

    {method:"GET",
        path:"/projects",
        handler:"projectsCtrl.list"},

    {method:"GET",
        path:"/version",
        handler:"applicationCtrl.version"}

];

module.exports = routes;
