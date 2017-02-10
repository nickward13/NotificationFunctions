module.exports = function (context, req) {
    
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    if (req.query.TaskName || (req.body && req.body.TaskName)) {
        var azure = require('azure-sb');

        var notificationHubService = azure.createNotificationHubService('TaskPushNotifications', 'Endpoint=sb://tasksnotifications.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=8By6fffZWND7x4c0BUWdHXqFpvDjj9nNULPX9LKBeyA=');

        var payload = '<toast><visual><binding template="ToastText01"><text id="1">Task completed: ' + (req.query.TaskName || req.body.TaskName) + '!</text></binding></visual></toast>';

        notificationHubService.wns.send(null, payload, 'wns/toast', function (error) {
            if (!error) {
                // notification sent
                context.res = {
                    body: "Notification sent"

                };
            }
        });

        context.res = {
            // status: 200, /* Defaults to 200 */

            body: "Notification sent for task: " + (req.query.TaskName || req.body.TaskName)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a task name on the query string or in the request body"
        };
    }


    context.done();
};