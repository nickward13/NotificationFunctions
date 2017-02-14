module.exports = function (context, req) {
    
    if (req.query.TaskName || (req.body && req.body.TaskName)) {

        var request = require("request");

        var requestData = {
            "text": "test2"
        }

        url = "https://outlook.office.com/webhook/fb04a14e-4555-4a12-a0a7-e8493af4b26b@72f988bf-86f1-41af-91ab-2d7cd011db47/IncomingWebhook/1c31238a6d1045d39b73112e54809e39/75fbf278-a8ae-48b3-a5e5-c8ee58cad87f"
        
        request({
            url: url,
            method: "POST",
            json: requestData
        }, 
        function (responseError, response, responseBody) {
            if (!error && response.statusCode === 200) {
                context.res = {
                    body: "Notification sent"
                }
            }
            else {
                context.res = {
                    status: response.statusCode,
                    body: response.statusText
                }
            }
        })
        
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a task name on the query string or in the request body"
        };
    }


    context.done();
};