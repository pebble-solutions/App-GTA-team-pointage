/**
 * Centre verticalement un espace de travail dans la vue.
 * La structure html dans la vue doit être la suivante : ElementID-wrapper > ElementID
 * Il ne peut y avoir d'autres éléments au même niveau que ElementID-wrapper autrer que le 
 * header et le footer de pebble.
 * 
 * @param {String} workspaceId L'ID de l'élément à center
 */
export default function(workspaceId) {
    let winHeight = window.innerHeight;
    let header = document.getElementById('app-header');
    let headerHeight = header ? header.offsetHeight : 0;

    let footer = document.getElementById('app-footer');
    let footerHeight = footer ? footer.offsetHeight : 0;

    let workspaceAvailable = winHeight - headerHeight - footerHeight;

    let workspace = document.getElementById(workspaceId);
    let workspaceHeight = workspace.offsetHeight;

    let freespace = workspaceAvailable - workspaceHeight;
    let padding = 0;

    if (freespace > 0) {
        padding = freespace / 2;
    }

    let workspaceWrapper = document.getElementById(workspaceId+'-wrapper');
    workspaceWrapper.style.paddingTop = padding+'px';
    workspaceWrapper.style.paddingBottom = padding+'px';
}