Simple Alma API Cors Proxy Azure Function
==========================================

This is s very basic CORS proxy for the ExLibris Alma API, written in node.js, ready to deploy as Azure function.

## How to use
After deployment, the proxy can be used as follows:

```
https://your-azure-function-url/api/alma-cors-proxy?code=<your-function-auth-code>&path=<Alma-Api-Path-URL-Encoded>
````
For example:
```
https://alma-cors-proxy.azurewebsites.net/api/alma-cors-proxy?code=xxxxxxYL5kukCWBxxxxxgSzRGxFX-r9qnLxxxxxAzFuDANiXg&path=items%3Fitem_barcode=HM00673466
````
To get your function auth-code, select the deployed funtion in the [Azure Portal](https://portal.azure.com), then select the 'Function Keys' tab.

## How to deploy
1. Create an Azure Function in in the [Azure Portal](https://portal.azure.com)
2. Deploy via Github Action (push to main or trigger manually) or use the Azure extension in Visual Studio Code (or use the command line)

## How to configure
The Alma API key needs to be set as environment variable. In [Azure Portal](https://portal.azure.com), after selecting your Function App, go to 'Settings / Environment variables' and add a variable named 'ALMA_API_KEY' with a valid API key as value.

## How to develop (with Visual Studio Code)
1. Install the 'Azure Resources' and 'Azure Functions' extensions
2. Add a `local.settings.json` file to the project root, with the following content:

```
{
	"IsEncrypted": false,
	"Values": {
		"FUNCTIONS_WORKER_RUNTIME": "node",
		"ALMA_API_KEY": "<your-api-key>"
	}
}

```
3. Run `npm run start`, or run in Visual Studio Code, to test locally