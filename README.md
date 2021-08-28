# mt.ax

Serverless Short URL service. 

## Requirements

Requirements

* AWS-CLI
* Serverless

## Deploy

Easy deploy to AWS with serverless cli.

```
npm install
serverless create_domain --region <region>
serverless deploy --region <region> --stage <stage>
```

## Develop

Install NodeJS packages

```
npm install
```

Start locally api gateway

```
serverless offline
```

Install dynamodb locally and migrate schema

```
serverless dynamodb install
serverless dynamodb start
```