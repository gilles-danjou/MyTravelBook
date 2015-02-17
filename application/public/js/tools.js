/**
 * Created by GDanjou on 12/02/15.
 */

updatePageTitle = function(pageTitle){
    var scope = angular.element(document.querySelector('#pageTitle')).scope();
    scope.main.pageTitle = pageTitle;
}

