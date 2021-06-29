function alertWebhook(req, res, settings, triggerControllers) {
    try {
        const body = req.body
        const reqState = body.State
        triggerControllers.forEach(trigger => {
            const state = trigger.params.STATE || "Both";
            if (state !== "Both" && state !== reqState) return;
            trigger.execute(`Dynatrace Alert - ${trigger.name}`, body);
        });
        res.status(200).send("OK");
      }
    catch (err){
        res.status(422).send(err.message);
    }
}

module.exports = {
    ALERT_WEBHOOK: alertWebhook
}
