define([
    'base/js/namespace',
    'jquery'
], function(
    Jupyter, $
) {
    function load_ipython_extension() {

        let handler = function () {
            let baseUrl = window.document.body.dataset.baseUrl;
            let notebookPath = window.document.body.dataset.notebookPath;
            let urlApiContent = `http://${location.host}${baseUrl}api/contents/${notebookPath}`; 
            let username = baseUrl.slice(6, baseUrl.length-1); // pattern "/user/<USERNAME>/"

            $.ajax({
                type: 'GET',
                url: urlApiContent,
                success: (result) => {
                    let dataset = {'username': username, 'content': result};
                    $.ajax({
                        type: 'POST',
                        data: {notebook: JSON.stringify(dataset)},
                        url: 'http://' + location.hostname + ':5000', 
                            success: (result) => console.log(200)
                    });
                }
            });           
        };

        let action = {
            icon: 'fa-save', 
            help: 'post notebook',
            help_index: 'zz',
            handler: handler
        };
        let prefix = 'my_extension';
        let action_name = 'show-alert';

        let full_action_name = Jupyter.actions.register(action, action_name, prefix); 
        Jupyter.toolbar.add_buttons_group([full_action_name]);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
