const config = require("./config");
const mapExecutionService = require("../../../api/services/map-execution.service");
const Trigger = require("../../../api/models/map-trigger.model");

function alertWebhook(req,res) {
    let body = req.body
    Trigger.find({ plugin: config.name }).then((triggers) => {
        console.log(`Found ${triggers.length} triggers`);
        res.send('OK');
        triggers.forEach(trigger=>execTrigger(trigger,body,req.io))
    }).catch((error) => res.send(error))
}

function execTrigger (trigger, body,io) {
    new Promise ((resolve,reject) => {
        const state = body.State
        const triggerState = trigger.params.find(o => o.name === 'STATE');
        if (state != triggerState.value) {
            console.log(alertID, triggerState.value)
            return reject("Not matching alert ID")
        } else {
            return resolve()
        }
    }).then(() => {
        console.log(trigger.map);
        let message = trigger.name + ' started by Dynatrace trigger'
        console.log(`********** Dynatrace: executing map ${trigger.map} **********`);
        mapExecutionService.execute(trigger.map,null,io,{config: trigger.configuration},message,body);
    }).catch(err=>{
        console.error(err);
    })
}
module.exports = {
    ALERT_WEBHOOK: alertWebhook
}