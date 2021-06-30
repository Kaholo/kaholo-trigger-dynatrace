# kaholo-trigger-dynatrace
Kaholo Trigger for Dynatrace

## How To Use
After installing the trigger on your Kaholo Server, Make sure you configure the webhook on Dynatrace, according to this [documentation](https://www.dynatrace.com/support/help/setup-and-configuration/integrations/third-party-integrations/problem-notification-systems/webhook-integration/).

**Route: /webhook/dynatrace/alert**

## Method: Dynatrace alert webhook

### Parameters:
1. Problem State (Options) **Optional** - If specified, only accept incoming requests of problems of the specified state. Possible Values Are Open/Resolved/Both.
